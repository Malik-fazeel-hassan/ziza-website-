'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Globe,
  FileText,
  Building2,
  CalendarCheck,
  Ticket,
  MessageSquare,
  Map,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Star,
  ChevronRight,
  X,
  Menu,
  GraduationCap,
  Briefcase,
  Eye,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Users,
  Clock,
  Award,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Loader2,
} from 'lucide-react';

/* ================================================================
   CONSTANTS & DATA
   ================================================================ */

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Visas', href: '#visas' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  {
    icon: FileText,
    title: 'Visa Filing',
    description: 'Expert documentation and filing services for all visa categories with a proven track record of approvals.',
    color: 'from-blue-500/20 to-brand-navy-light',
  },
  {
    icon: Building2,
    title: 'Accommodation',
    description: 'Premium hotel bookings and serviced apartments at competitive rates across all major destinations worldwide.',
    color: 'from-emerald-500/20 to-brand-navy-light',
  },
  {
    icon: CalendarCheck,
    title: 'Embassy Appointments',
    description: 'Fast-tracked embassy appointment scheduling with real-time slot monitoring and confirmation guarantees.',
    color: 'from-purple-500/20 to-brand-navy-light',
  },
  {
    icon: Ticket,
    title: 'Airline Tickets',
    description: 'Best-price airline tickets on all major carriers with flexible booking options and 24/7 rebooking support.',
    color: 'from-rose-500/20 to-brand-navy-light',
  },
  {
    icon: MessageSquare,
    title: 'Visa Consultancy',
    description: 'One-on-one expert consultation on visa eligibility, document preparation, and interview coaching.',
    color: 'from-amber-500/20 to-brand-navy-light',
  },
  {
    icon: Map,
    title: 'Custom Tours',
    description: 'Bespoke travel itineraries tailored to your preferences — from luxury getaways to adventure expeditions.',
    color: 'from-cyan-500/20 to-brand-navy-light',
  },
  {
    icon: ShieldCheck,
    title: 'Travel Insurance',
    description: 'Comprehensive travel insurance covering medical emergencies, trip cancellation, and lost baggage globally.',
    color: 'from-orange-500/20 to-brand-navy-light',
  },
];

const VISA_TABS = [
  {
    id: 'visit',
    label: 'Visit Visas',
    icon: Eye,
    countries: ['United Kingdom', 'United States', 'Canada', 'Australia', 'Schengen Zone', 'UAE', 'Turkey', 'Malaysia'],
    description: 'Tourist and visitor visas for leisure travel, family visits, and short-term stays worldwide.',
    features: [
      'Complete document checklist guidance',
      'Embassy appointment scheduling',
      'Travel itinerary preparation',
      'Hotel & flight reservation letters',
      'Bank statement review & advisory',
      'Interview preparation coaching',
    ],
  },
  {
    id: 'student',
    label: 'Student Visas',
    icon: GraduationCap,
    countries: ['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand', 'Italy'],
    description: 'Full-service student visa support from university selection through to post-arrival settlement.',
    features: [
      'University admission guidance',
      'Scholarship application support',
      'Statement of Purpose review',
      'Financial documentation preparation',
      'Student accommodation booking',
      'Pre-departure orientation briefing',
    ],
  },
  {
    id: 'work',
    label: 'Work Visas',
    icon: Briefcase,
    countries: ['United Kingdom', 'Canada', 'Australia', 'Germany', 'UAE', 'Qatar', 'Saudi Arabia', 'Oman'],
    description: 'Professional work permit and skilled worker visa processing with employer liaison services.',
    features: [
      'Employer sponsorship guidance',
      'Skills assessment assistance',
      'Professional credential evaluation',
      'Labour market impact assessment',
      'Family dependent visa processing',
      'Post-landing settlement support',
    ],
  },
];

const DESTINATIONS = [
  {
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    tag: 'Most Popular',
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    tag: 'Trending',
  },
  {
    name: 'Toronto',
    country: 'Canada',
    image: 'https://images.unsplash.com/photo-1517090504332-edc2772b0e4d?w=800&q=80',
    tag: 'Study Abroad',
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',
    tag: 'Cultural',
  },
  {
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
    tag: 'Adventure',
  },
  {
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    tag: 'Romantic',
  },
];

const TESTIMONIALS = [
  {
    name: 'Ahmed Khan',
    role: 'Student Visa — UK',
    text: 'ZIZA made my dream of studying in London a reality. From university selection to visa approval, they handled everything flawlessly. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Fatima Noor',
    role: 'Visit Visa — Canada',
    text: 'I was nervous about the Canadian visa process, but the ZIZA team guided me step by step. Got my visa approved on the first attempt. Outstanding service!',
    rating: 5,
  },
  {
    name: 'Usman Ali',
    role: 'Work Visa — UAE',
    text: 'Professional, reliable, and incredibly knowledgeable. ZIZA helped me secure my work permit in record time. Their consultancy service is world-class.',
    rating: 5,
  },
];

const STATS = [
  { icon: Users, value: '5,000+', label: 'Happy Clients' },
  { icon: Globe, value: '50+', label: 'Countries Served' },
  { icon: Award, value: '98%', label: 'Approval Rate' },
  { icon: Clock, value: '10+', label: 'Years Experience' },
];

/* ================================================================
   SVG COMPONENTS
   ================================================================ */

function WorldMapSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04]"
      viewBox="0 0 1200 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Simplified world map dots */}
      {Array.from({ length: 80 }).map((_, i) => {
        const x = 50 + (i % 16) * 70 + Math.sin(i * 0.7) * 20;
        const y = 50 + Math.floor(i / 16) * 100 + Math.cos(i * 0.5) * 30;
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r={Math.random() * 2 + 1}
            fill="#C8A951"
          />
        );
      })}
      {/* Connection arcs */}
      <path d="M200 300 Q600 50 1000 280" stroke="#C8A951" strokeWidth="0.5" fill="none" opacity="0.3" />
      <path d="M100 250 Q400 100 700 350" stroke="#C8A951" strokeWidth="0.5" fill="none" opacity="0.2" />
      <path d="M400 200 Q700 80 1100 250" stroke="#C8A951" strokeWidth="0.5" fill="none" opacity="0.25" />
    </svg>
  );
}

function SkylineSVG() {
  return (
    <svg
      className="skyline-silhouette"
      viewBox="0 0 1440 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 200 L0 160 L30 160 L30 120 L50 120 L50 90 L60 90 L60 70 L70 70 L70 90 L80 90 L80 120 L100 120 L100 140 L120 140 L120 100 L130 100 L130 60 L135 50 L140 60 L140 100 L150 100 L150 130 L180 130 L180 110 L190 110 L190 80 L200 80 L200 50 L205 40 L210 50 L210 80 L220 80 L220 110 L240 110 L240 130 L270 130 L270 100 L280 100 L280 70 L285 60 L290 70 L290 100 L310 100 L310 130 L340 130 L340 150 L380 150 L380 120 L390 120 L390 90 L400 90 L400 65 L405 55 L410 65 L410 90 L420 90 L420 120 L440 120 L440 140 L480 140 L480 110 L500 110 L500 80 L505 70 L510 80 L510 110 L530 110 L530 140 L560 140 L560 100 L570 100 L570 60 L575 45 L580 60 L580 100 L600 100 L600 130 L640 130 L640 150 L680 150 L680 120 L700 120 L700 90 L710 90 L710 55 L715 40 L720 55 L720 90 L730 90 L730 120 L760 120 L760 140 L800 140 L800 110 L820 110 L820 75 L825 65 L830 75 L830 110 L850 110 L850 130 L890 130 L890 150 L920 150 L920 120 L940 120 L940 85 L945 75 L950 85 L950 120 L970 120 L970 140 L1010 140 L1010 110 L1030 110 L1030 80 L1035 70 L1040 80 L1040 110 L1060 110 L1060 130 L1100 130 L1100 150 L1140 150 L1140 120 L1160 120 L1160 90 L1165 80 L1170 90 L1170 120 L1200 120 L1200 140 L1240 140 L1240 155 L1280 155 L1280 130 L1300 130 L1300 100 L1305 90 L1310 100 L1310 130 L1340 130 L1340 150 L1380 150 L1380 160 L1440 160 L1440 200 Z"
        fill="url(#skylineGrad)"
      />
      <defs>
        <linearGradient id="skylineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A1628" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0A1628" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PlaneTrailSVG() {
  return (
    <div className="plane-container">
      <div className="plane-trail">
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M55 15 L45 8 L30 12 L15 5 L10 12 L25 14 L5 20 L10 22 L30 17 L45 22 L55 15Z"
            fill="#C8A951"
            fillOpacity="0.8"
          />
        </svg>
        <div className="vapor-trail" />
      </div>
    </div>
  );
}

/* ================================================================
   ANIMATION VARIANTS
   ================================================================ */

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
};

/* ================================================================
   CONSULTATION MODAL COMPONENT
   ================================================================ */

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch(`${BACKEND_URL}/api/submit-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Submission failed. Please try again.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Network error. Please check your connection.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      setErrorMsg('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-brand-navy border border-brand-gold/20 p-8 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-brand-gold transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-white">
                Get <span className="gradient-text-gold">Free Consultancy</span>
              </h3>
              <p className="text-white/60 mt-1 text-sm">
                Fill in your details and our experts will reach out within 24 hours.
              </p>
            </div>

            {status === 'success' ? (
              <motion.div
                className="flex flex-col items-center py-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="text-green-400 mb-4" size={56} />
                <h4 className="text-xl font-bold text-white mb-2">Inquiry Submitted!</h4>
                <p className="text-white/60 text-sm">
                  Our team will contact you shortly at the provided email or phone number.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2 rounded-lg bg-brand-gold text-brand-navy font-semibold hover:bg-brand-gold-light transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-brand-navy-light border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-brand-navy-light border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-brand-navy-light border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all"
                  />
                </div>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-brand-navy-light border border-white/10 text-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all appearance-none"
                >
                  <option value="" disabled className="text-white/40">
                    Select a Service
                  </option>
                  <option value="visit-visa">Visit Visa</option>
                  <option value="student-visa">Student Visa</option>
                  <option value="work-visa">Work Visa</option>
                  <option value="airline-tickets">Airline Tickets</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="embassy-appointment">Embassy Appointment</option>
                  <option value="custom-tour">Custom Tour</option>
                  <option value="travel-insurance">Travel Insurance</option>
                  <option value="visa-consultancy">Visa Consultancy</option>
                </select>
                <textarea
                  name="message"
                  placeholder="Tell us about your travel plans..."
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-brand-navy-light border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/30 transition-all resize-none"
                />

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg px-3 py-2">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-lg bg-brand-gold text-brand-navy font-bold text-lg hover:bg-brand-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 gold-glow-hover"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   SECTION: ANIMATED WRAPPER
   ================================================================ */

function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      {children}
    </motion.section>
  );
}

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVisaTab, setActiveVisaTab] = useState('visit');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-brand-navy flex items-center justify-center">
        <div className="text-center">
          <Plane className="text-brand-gold mx-auto mb-4 animate-pulse" size={48} />
          <p className="text-white/60 text-lg font-serif">Loading ZIZA Travel...</p>
        </div>
      </div>
    );
  }

  const activeVisa = VISA_TABS.find((t) => t.id === activeVisaTab)!;

  return (
    <main className="min-h-screen bg-white">
      {/* ============================================================
          HEADER — Sticky, Glassmorphism
          ============================================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-brand-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="text-brand-navy" size={22} />
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white tracking-wide">
                  ZIZA
                </span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium -mt-1">
                  Travel &amp; Tours
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-brand-gold transition-colors text-sm font-medium tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-brand-gold text-brand-navy font-bold text-sm hover:bg-brand-gold-light transition-all gold-glow-hover uppercase tracking-wider"
              >
                Free Consultancy
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden glass border-t border-brand-gold/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white/70 hover:text-brand-gold transition-colors text-sm font-medium uppercase tracking-wide"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-4 px-5 py-3 rounded-lg bg-brand-gold text-brand-navy font-bold text-sm hover:bg-brand-gold-light transition-all uppercase tracking-wider"
                >
                  Free Consultancy
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-navy world-map-grid"
      >
        <WorldMapSVG />
        <PlaneTrailSVG />
        <div className="stars-bg" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/50 via-transparent to-brand-navy z-[2]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm font-medium mb-8">
              <Plane size={16} />
              Your Trusted Travel Partner Since 2014
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Explore.<br />
            <span className="gradient-text-gold">Experience.</span><br />
            Remember.
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            ZIZA Travel &amp; Tours is your gateway to seamless visa processing,
            premium airline tickets, and unforgettable travel experiences across 50+ countries.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="group px-8 py-4 rounded-xl bg-brand-gold text-brand-navy font-bold text-lg hover:bg-brand-gold-light transition-all gold-glow-hover flex items-center justify-center gap-2"
            >
              Get Free Consultancy
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#services"
              className="px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg hover:border-brand-gold/50 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              Our Services
              <ChevronRight size={20} />
            </a>
          </motion.div>
        </div>

        <SkylineSVG />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-navy to-transparent z-[3]" />
      </section>

      {/* ============================================================
          STATS BAR
          ============================================================ */}
      <section className="relative bg-brand-navy border-y border-brand-gold/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeInUp}
              >
                <stat.icon className="text-brand-gold mx-auto mb-3" size={32} />
                <div className="text-3xl md:text-4xl font-bold text-white font-serif">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SERVICES GRID
          ============================================================ */}
      <AnimatedSection
        id="services"
        className="relative py-24 bg-gradient-to-b from-brand-navy via-brand-navy-light to-brand-navy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4 border border-brand-gold/20">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Our <span className="gradient-text-gold">Premium Services</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Comprehensive travel solutions tailored for individuals, families, and businesses.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                className={`service-card rounded-2xl bg-gradient-to-br ${service.color} border border-white/5 p-6 cursor-pointer ${
                  i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
                variants={fadeInUp}
                custom={i * 0.1}
              >
                <div className="w-14 h-14 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-5 border border-brand-gold/20">
                  <service.icon className="text-brand-gold" size={26} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                <div className="mt-5 flex items-center gap-1 text-brand-gold text-sm font-medium group cursor-pointer">
                  <span className="group-hover:underline">Learn More</span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================
          VISA PORTAL TABS
          ============================================================ */}
      <AnimatedSection
        id="visas"
        className="relative py-24 bg-brand-navy"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4 border border-brand-gold/20">
              Visa Services
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Your <span className="gradient-text-gold">Visa Gateway</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Expert visa processing for every purpose — tourism, education, and employment.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex justify-center gap-2 sm:gap-4 mb-12 flex-wrap"
            variants={fadeIn}
          >
            {VISA_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveVisaTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeVisaTab === tab.id
                    ? 'bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVisaTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left — Description & Features */}
              <div className="rounded-2xl bg-brand-navy-light border border-white/5 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                    <activeVisa.icon className="text-brand-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {activeVisa.label}
                    </h3>
                    <p className="text-white/40 text-sm">{activeVisa.description}</p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {activeVisa.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <CheckCircle className="text-brand-gold flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-white/70 text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-8 px-6 py-3 rounded-lg bg-brand-gold text-brand-navy font-bold hover:bg-brand-gold-light transition-all flex items-center gap-2"
                >
                  Apply Now
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Right — Countries Grid */}
              <div className="rounded-2xl bg-brand-navy-light border border-white/5 p-8">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Globe className="text-brand-gold" size={20} />
                  Available Countries
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {activeVisa.countries.map((country, i) => (
                    <motion.div
                      key={country}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-all cursor-pointer group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <MapPin className="text-brand-gold/60 group-hover:text-brand-gold" size={16} />
                      <span className="text-white/70 group-hover:text-white text-sm font-medium transition-colors">
                        {country}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* ============================================================
          DESTINATIONS SHOWCASE
          ============================================================ */}
      <AnimatedSection
        id="destinations"
        className="relative py-24 bg-gradient-to-b from-brand-navy to-brand-navy-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4 border border-brand-gold/20">
              Explore Destinations
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Popular <span className="gradient-text-gold">Destinations</span>
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto text-lg">
              Discover our most requested travel destinations across the globe.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.name}
                className="destination-card group cursor-pointer"
                variants={scaleIn}
                custom={i * 0.1}
              >
                <div className="aspect-[4/3] relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dest.image}
                    alt={`${dest.name}, ${dest.country}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="overlay" />

                  {/* Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-navy text-xs font-bold uppercase tracking-wider">
                      {dest.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="text-2xl font-serif font-bold text-white mb-1">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <MapPin size={14} />
                      {dest.country}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-brand-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Explore</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <AnimatedSection className="relative py-24 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-medium mb-4 border border-brand-gold/20">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              What Our <span className="gradient-text-gold">Clients Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((review, i) => (
              <motion.div
                key={review.name}
                className="rounded-2xl bg-brand-navy-light border border-white/5 p-8 hover:border-brand-gold/20 transition-all duration-300"
                variants={fadeInUp}
                custom={i * 0.15}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, s) => (
                    <Star key={s} className="text-brand-gold fill-brand-gold" size={18} />
                  ))}
                </div>

                <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="text-brand-gold font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{review.name}</div>
                    <div className="text-white/40 text-xs">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ============================================================
          CTA BANNER
          ============================================================ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M30%200v60M0%2030h60%22%20stroke%3D%22rgba(10%2C22%2C40%2C0.06)%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-navy mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-brand-navy/70 text-lg mb-8 max-w-2xl mx-auto">
              Get personalized travel advice from our expert consultants.
              Your dream destination is just a conversation away.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-10 py-4 rounded-xl bg-brand-navy text-white font-bold text-lg hover:bg-brand-navy-light transition-all shadow-xl shadow-brand-navy/20 flex items-center gap-2 mx-auto group"
            >
              <Phone size={20} />
              Get Free Consultancy
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer id="contact" className="relative bg-brand-navy-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-brand-gold flex items-center justify-center">
                  <Globe className="text-brand-navy" size={22} />
                </div>
                <div>
                  <span className="text-xl font-serif font-bold text-white tracking-wide">
                    ZIZA
                  </span>
                  <span className="block text-[9px] uppercase tracking-[0.3em] text-brand-gold font-medium -mt-0.5">
                    Travel &amp; Tours
                  </span>
                </div>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                Your trusted travel partner for visa services, airline ticketing, and bespoke tour
                packages. Making travel dreams a reality since 2014.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-brand-gold hover:border-brand-gold/30 transition-all"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Home', 'Services', 'Visa Services', 'Destinations', 'About Us', 'Contact'].map(
                  (link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-white/40 hover:text-brand-gold transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight
                          size={14}
                          className="text-brand-gold/40 group-hover:translate-x-1 transition-transform"
                        />
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
                Our Services
              </h4>
              <ul className="space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.title}>
                    <a
                      href="#services"
                      className="text-white/40 hover:text-brand-gold transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ChevronRight
                        size={14}
                        className="text-brand-gold/40 group-hover:translate-x-1 transition-transform"
                      />
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-brand-gold flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-white/50 text-sm leading-relaxed">
                    1st Floor, Office #1/2, Madni Centre,<br />
                    Sheikhupura Road, Lahore,<br />
                    Punjab, Pakistan
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-brand-gold flex-shrink-0" size={18} />
                  <div>
                    <span className="text-white/70 text-sm font-medium block">Malik Imran</span>
                    <a
                      href="tel:+923703373689"
                      className="text-white/50 hover:text-brand-gold text-sm transition-colors"
                    >
                      +92 0370-3373689
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-brand-gold flex-shrink-0" size={18} />
                  <a
                    href="mailto:zizatravel26@gmail.com"
                    className="text-white/50 hover:text-brand-gold text-sm transition-colors"
                  >
                    zizatravel26@gmail.com
                  </a>
                </li>
              </ul>

              <button
                onClick={() => setModalOpen(true)}
                className="mt-6 w-full px-4 py-3 rounded-lg bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-semibold text-sm hover:bg-brand-gold hover:text-brand-navy transition-all flex items-center justify-center gap-2"
              >
                <Heart size={16} />
                Free Consultation
              </button>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} ZIZA Travel &amp; Tours. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 hover:text-brand-gold text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/30 hover:text-brand-gold text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================
          CONSULTATION MODAL
          ============================================================ */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  );
}
