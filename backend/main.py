import csv
import os
import re
import logging
import smtplib
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Optional

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("ziza-leads")

# ──────────────────────────────────────────────
# FastAPI App
# ──────────────────────────────────────────────

app = FastAPI(
    title="ZIZA Travel & Tours — Lead API",
    description="Receives inquiry form submissions from the ZIZA Travel static frontend.",
    version="1.0.0",
)

# CORS — allow the static frontend hosted on any domain to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your GitHub Pages URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# SMTP Configuration (set via environment vars)
# ──────────────────────────────────────────────

SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = ""       # Set to your Gmail address, e.g. "zizatravel26@gmail.com"
SMTP_PASSWORD = ""   # Set to your Gmail App Password (not regular password)
RECIPIENT_EMAIL = "zizatravel26@gmail.com"

# ──────────────────────────────────────────────
# Email regex pattern (RFC 5322 simplified)
# ──────────────────────────────────────────────

EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]"
    r"(?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?"
    r"(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
)

# ──────────────────────────────────────────────
# Data Models
# ──────────────────────────────────────────────


class InquiryForm(BaseModel):
    """Schema for the contact/inquiry form submission."""

    name: str
    email: str
    phone: str
    service: str
    message: Optional[str] = ""

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters long.")
        if len(v) > 100:
            raise ValueError("Name must be under 100 characters.")
        return v

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not EMAIL_REGEX.match(v):
            raise ValueError("Please provide a valid email address.")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = v.strip()
        cleaned = re.sub(r"[\s\-\(\)\+]", "", v)
        if not cleaned.isdigit() or len(cleaned) < 7:
            raise ValueError("Please provide a valid phone number (minimum 7 digits).")
        return v

    @field_validator("service")
    @classmethod
    def validate_service(cls, v: str) -> str:
        valid_services = {
            "visa-filing",
            "visit-visa",
            "student-visa",
            "work-visa",
            "airline-tickets",
            "accommodation",
            "embassy-appointment",
            "custom-tour",
            "travel-insurance",
            "visa-consultancy",
        }
        v = v.strip().lower()
        if v not in valid_services:
            raise ValueError(
                f"Invalid service. Choose from: {', '.join(sorted(valid_services))}"
            )
        return v


class InquiryResponse(BaseModel):
    """Response returned after successfully submitting an inquiry."""

    status: str
    message: str
    reference_id: str
    timestamp: str


# ──────────────────────────────────────────────
# Helper — Send Email Notification
# ──────────────────────────────────────────────


def send_email_notification(inquiry: InquiryForm, reference_id: str) -> bool:
    """
    Sends an email notification to ZIZA Travel with the inquiry details.

    Returns True if sent successfully, False otherwise.
    If SMTP credentials are not configured, logs the inquiry instead.
    """

    if not SMTP_USER or not SMTP_PASSWORD:
        logger.warning(
            "SMTP not configured — email notification skipped. "
            "Set SMTP_USER and SMTP_PASSWORD environment variables."
        )
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Travel Inquiry — {inquiry.service.replace('-', ' ').title()} | Ref: {reference_id}"
        msg["From"] = SMTP_USER
        msg["To"] = RECIPIENT_EMAIL

        # Plain text body
        text_body = f"""
NEW INQUIRY RECEIVED
====================

Reference: {reference_id}
Timestamp: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}

Client Details:
  Name:    {inquiry.name}
  Email:   {inquiry.email}
  Phone:   {inquiry.phone}
  Service: {inquiry.service.replace('-', ' ').title()}

Message:
{inquiry.message or '(No message provided)'}

---
This email was sent automatically by the ZIZA Travel website lead processing system.
"""

        # HTML body
        html_body = f"""
<html>
<body style="font-family: 'Segoe UI', Tahoma, sans-serif; background: #f5f5f5; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
    <div style="background: #0A1628; padding: 24px 32px; text-align: center;">
      <h1 style="color: #C8A951; margin: 0; font-size: 22px;">🌍 New Travel Inquiry</h1>
      <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 13px;">Reference: {reference_id}</p>
    </div>
    <div style="padding: 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px; width: 100px;">Name</td>
          <td style="padding: 10px 0; font-weight: 600; color: #0A1628;">{inquiry.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td>
          <td style="padding: 10px 0;"><a href="mailto:{inquiry.email}" style="color: #C8A951;">{inquiry.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Phone</td>
          <td style="padding: 10px 0;"><a href="tel:{inquiry.phone}" style="color: #C8A951;">{inquiry.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #888; font-size: 13px;">Service</td>
          <td style="padding: 10px 0; font-weight: 600; color: #0A1628;">{inquiry.service.replace('-', ' ').title()}</td>
        </tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background: #f8f8f8; border-radius: 8px;">
        <p style="color: #888; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
        <p style="color: #333; margin: 0; white-space: pre-wrap;">{inquiry.message or '(No message provided)'}</p>
      </div>
    </div>
    <div style="background: #f5f5f5; padding: 16px 32px; text-align: center;">
      <p style="color: #aaa; font-size: 11px; margin: 0;">ZIZA Travel &amp; Tours | Lead Processing System</p>
    </div>
  </div>
</body>
</html>
"""

        msg.attach(MIMEText(text_body, "plain"))
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)

        logger.info(f"Email notification sent to {RECIPIENT_EMAIL} for ref {reference_id}")
        return True

    except Exception as e:
        logger.error(f"Failed to send email notification: {e}")
        return False


# ──────────────────────────────────────────────
# API Endpoints
# ──────────────────────────────────────────────


@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "service": "ZIZA Travel Lead API",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


CSV_FILE_PATH = "inquiries.csv"


def save_to_csv(inquiry: InquiryForm, reference_id: str, timestamp: str) -> bool:
    """
    Appends the inquiry details to a local CSV file (spreadsheet).
    Creates the file and writes the headers if it doesn't exist.
    """
    file_exists = os.path.exists(CSV_FILE_PATH)
    try:
        with open(CSV_FILE_PATH, mode="a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            if not file_exists:
                # Write header row compatible with Excel / Google Sheets
                writer.writerow([
                    "Reference ID", 
                    "Timestamp", 
                    "Name", 
                    "Email", 
                    "Phone", 
                    "Service", 
                    "Message"
                ])
            writer.writerow([
                reference_id,
                timestamp,
                inquiry.name,
                inquiry.email,
                inquiry.phone,
                inquiry.service,
                inquiry.message or ""
            ])
        logger.info(f"Successfully saved lead {reference_id} to CSV: {CSV_FILE_PATH}")
        return True
    except Exception as e:
        logger.error(f"Failed to save lead {reference_id} to CSV: {e}")
        return False


@app.post(
    "/api/submit-inquiry",
    response_model=InquiryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def submit_inquiry(inquiry: InquiryForm):
    """
    Receives a travel inquiry form submission.

    Validates the payload, generates a reference ID, logs the inquiry,
    and optionally sends an email notification to the ZIZA team.
    """

    # Generate unique reference ID
    timestamp = datetime.now(timezone.utc)
    reference_id = f"ZIZA-{timestamp.strftime('%Y%m%d')}-{timestamp.strftime('%H%M%S')}"

    # Log the inquiry
    logger.info("=" * 60)
    logger.info(f"NEW INQUIRY RECEIVED — {reference_id}")
    logger.info(f"  Name:    {inquiry.name}")
    logger.info(f"  Email:   {inquiry.email}")
    logger.info(f"  Phone:   {inquiry.phone}")
    logger.info(f"  Service: {inquiry.service}")
    logger.info(f"  Message: {inquiry.message[:100]}{'...' if inquiry.message and len(inquiry.message) > 100 else ''}")
    logger.info("=" * 60)

    # Save lead details to CSV file (Excel-compatible spreadsheet)
    save_to_csv(inquiry, reference_id, timestamp.isoformat())

    # Attempt email notification
    email_sent = send_email_notification(inquiry, reference_id)

    if email_sent:
        response_message = (
            "Thank you for your inquiry! Our team will contact you within 24 hours. "
            "A confirmation has been sent to our team."
        )
    else:
        response_message = (
            "Thank you for your inquiry! Our team will contact you within 24 hours."
        )

    return InquiryResponse(
        status="success",
        message=response_message,
        reference_id=reference_id,
        timestamp=timestamp.isoformat(),
    )


# ──────────────────────────────────────────────
# Run with: python main.py
# ──────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn

    logger.info("Starting ZIZA Travel Lead API server...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
