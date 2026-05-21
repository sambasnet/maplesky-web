'use client'

import { motion } from 'framer-motion'
import GidsDisplay from './GidsDisplay'

/**
 * Scroll indicator component
 * Animated chevron showing user can scroll down
 */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.5 }}
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center gap-2"
        role="img"
        aria-label="Scroll down to see more"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <svg
          className="w-6 h-6 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  )
}

/**
 * Hero Section Component
 * Full viewport hero with GIDS Display
 *
 * Features:
 * - Full viewport height (100vh)
 * - Navy background
 * - Centered GIDS display
 * - Scroll indicator
 * - Staggered fade-in animations
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      style={{
        background: 'radial-gradient(circle at center, #212a57 0%, #212a57 20%, #1a2145 40%, #141829 60%, #0f172e 100%)',
      }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light/20 via-navy to-navy-dark pointer-events-none" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Decorative side elements */}
      <div className="absolute left-4 md:left-8 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute right-4 md:right-8 top-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Pre-heading */}
        <motion.p
          className="text-center text-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to the Future of Travel
        </motion.p>

        {/* GIDS Display */}
        <GidsDisplay />

        {/* Post-heading */}
        <motion.p
          className="text-center text-white/60 text-sm md:text-base mt-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          Experience travel reimagined. Our platform combines cutting-edge technology with personalized service to deliver unforgettable journeys.
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-dark to-transparent pointer-events-none" />
    </section>
  )
}