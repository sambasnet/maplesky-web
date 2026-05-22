import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

/**
 * Poppins font for headings
 * Inter font for body text
 * Cormorant Garamond for logo text
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

/**
 * Full SEO metadata configuration
 * Includes OpenGraph and Twitter card tags for social sharing
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mapleskytravels.com'),
  title: {
    default: 'MapleSky Travels Inc. - Redefining Travel Industry',
    template: '%s | MapleSky Travels Inc.',
  },
  description: 'MapleSky Travels Inc. is coming soon. Redefining the travel industry with innovative solutions and exceptional experiences.',
  keywords: ['travel', 'MapleSky', 'vacation', 'adventure', 'tourism', 'coming soon'],
  authors: [{ name: 'MapleSky Travels Inc.' }],
  creator: 'MapleSky Travels Inc.',
  publisher: 'MapleSky Travels Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'MapleSky Travels Inc.',
    title: 'MapleSky Travels Inc. - Redefining Travel Industry',
    description: 'MapleSky Travels Inc. is coming soon. Redefining the travel industry with innovative solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MapleSky Travels Inc.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MapleSky Travels Inc. - Redefining Travel Industry',
    description: 'MapleSky Travels Inc. is coming soon. Redefining the travel industry with innovative solutions.',
    images: ['/og-image.png'],
    creator: '@mapleskytravels',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

/**
 * Root layout component
 * Wraps all pages with consistent structure and font loading
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="font-inter antialiased bg-navy text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}