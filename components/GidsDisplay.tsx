'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'

interface GidsDisplayProps {
  /**
   * Main text to display with fade-slide-up animation (first line)
   */
  text?: string
  /**
   * Second line of text for display
   */
  secondLine?: string
  /**
   * Subtitle text displayed below
   */
  subtitle?: string
  /**
   * Animation delay between characters in seconds
   */
  charDelay?: number
  /**
   * Duration of each character animation in seconds
   */
  animDuration?: number
}

/**
 * Single animated character component - fade slide up style (x.ai style)
 */
function AnimatedCharacter({
  char,
  delay,
  duration,
  isVisible,
}: {
  char: string
  delay: number
  duration: number
  isVisible: boolean
}) {
  return (
    <motion.span
      className="inline-block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gold-light"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      style={{
        textShadow: '0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.3)',
        willChange: 'transform, opacity',
      }}
    >
      {char}
    </motion.span>
  )
}

/**
 * GIDS Display Component
 * x.ai style fade-slide-up animated text display
 *
 * Features:
 * - Character-by-character fade-slide-up animation
 * - Staggered timing for each character
 * - Golden gradient text with glow
 * - Infinite loop animation
 */
export default function GidsDisplay({
  text = 'ARRIVING',
  secondLine = 'SOON',
  subtitle = 'MapleSky Travels Inc. - Redefining Travel Industry',
  charDelay = 0.08,
  animDuration = 0.6,
}: GidsDisplayProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // Create array of characters for rendering
  const characters = useMemo(() => text.split(''), [text])
  const secondLineChars = useMemo(() => secondLine.split(''), [secondLine])

  useEffect(() => {
    // Initial delay before first animation
    const initialTimeout = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Restart animation loop
    const totalAnimDuration = (text.length + secondLine.length) * charDelay + animDuration * 1000
    const pauseDuration = 4000

    const restartInterval = setInterval(() => {
      setAnimationKey((prev) => prev + 1)
      setIsVisible(false)

      // Start animation after brief pause
      setTimeout(() => {
        setIsVisible(true)
      }, 100)
    }, pauseDuration + totalAnimDuration)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(restartInterval)
    }
  }, [charDelay, animDuration, text.length, secondLine.length])

  return (
    <motion.div
      key={animationKey}
      className="gids-container rounded-lg p-4 sm:p-6 md:p-8 mx-2 sm:mx-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="heading"
      aria-level={1}
      aria-label={`${text} ${secondLine}`}
    >
      {/* Main animated text - first line */}
      <div
        className="flex justify-center items-center flex-wrap"
        aria-hidden={false}
      >
        {characters.map((char, index) => {
          const delay = index * charDelay

          // Render space as invisible spacer
          if (char === ' ') {
            return (
              <span
                key={`space-${index}`}
                className="inline-block w-4 sm:w-5 md:w-6"
              />
            )
          }

          return (
            <AnimatedCharacter
              key={`${animationKey}-${index}`}
              char={char}
              delay={delay}
              duration={animDuration}
              isVisible={isVisible}
            />
          )
        })}
      </div>

      {/* Second line animated text */}
      <div
        className="flex justify-center items-center flex-wrap mt-2"
        aria-hidden={false}
      >
        {secondLineChars.map((char, index) => {
          const delay = (text.length + index) * charDelay

          // Render space as invisible spacer
          if (char === ' ') {
            return (
              <span
                key={`space2-${index}`}
                className="inline-block w-4 sm:w-5 md:w-6"
              />
            )
          }

          return (
            <AnimatedCharacter
              key={`${animationKey}-second-${index}`}
              char={char}
              delay={delay}
              duration={animDuration}
              isVisible={isVisible}
            />
          )
        })}
      </div>

      {/* Subtitle */}
      <motion.p
        className="mt-8 sm:mt-10 text-center text-sm sm:text-base md:text-lg text-white/70 font-inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {subtitle}
      </motion.p>

      {/* Decorative bottom line */}
      <motion.div
        className="mt-8 sm:mt-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: 'easeOut' }}
      />
    </motion.div>
  )
}