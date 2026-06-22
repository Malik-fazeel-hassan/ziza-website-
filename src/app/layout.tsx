import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZIZA Travel & Tours — Explore. Experience. Remember.',
  description:
    'ZIZA Travel and Tours offers premium visa filing, airline tickets, accommodation, embassy appointments, visa consultancy, custom tours, and travel insurance services from Lahore, Pakistan.',
  keywords: [
    'travel agency',
    'visa filing',
    'airline tickets',
    'Pakistan travel',
    'Lahore tours',
    'visit visa',
    'student visa',
    'work visa',
    'travel insurance',
    'embassy appointments',
    'ZIZA Travel',
  ],
  authors: [{ name: 'ZIZA Travel & Tours' }],
  openGraph: {
    title: 'ZIZA Travel & Tours — Explore. Experience. Remember.',
    description:
      'Premium visa services, airline tickets, accommodation, and custom tours. Your trusted travel partner in Lahore, Pakistan.',
    type: 'website',
    locale: 'en_US',
    siteName: 'ZIZA Travel & Tours',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZIZA Travel & Tours',
    description:
      'Premium visa services, airline tickets, accommodation, and custom tours from Lahore, Pakistan.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'sf4CVcELVQ8_kVNxhl7QPyW6hAAX108J633QTili11k',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-brand-navy`}>
        {children}
      </body>
    </html>
  );
}
