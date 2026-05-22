'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GidsDisplayProps {
  /**
   * Main text to display with flip animation (first line)
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
   * Duration of each character flip in seconds
   */
  flipDuration?: number
  /**
   * Pause duration between animation cycles in seconds
   */
  pauseDuration?: number
}

/**
 * Characters available for flip animation
 * Simulates airport departure board character set
 */
const FLIP_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

/**
 * Get random character for flip animation
 */
function getRandomChar(): string {
  return FLIP_CHARACTERS[Math.floor(Math.random() * FLIP_CHARACTERS.length)]
}

/**
 * Single flipping character component
 */
function FlippingCharacter({
  char,
  isAnimating,
  delay,
  duration,
}: {
  char: string
  isAnimating: boolean
  delay: number
  duration: number
}) {
  const [displayChar, setDisplayChar] = useState(char)
  const [prevChar, setPrevChar] = useState(char)

  useEffect(() => {
    if (!isAnimating) {
      setDisplayChar(char)
      setPrevChar(char)
      return
    }

    // Stagger the character changes with delay
    const animationTimeout = setTimeout(() => {
      setPrevChar(char)

      // Create a sequence of random characters for flip effect
      let count = 0
      const maxCount = 4

      const flipInterval = setInterval(() => {
        if (count < maxCount) {
          setDisplayChar(getRandomChar())
          count++
        } else {
          setDisplayChar(char)
          clearInterval(flipInterval)
        }
      }, duration * 1000 / maxCount)

      return () => clearInterval(flipInterval)
    }, delay * 1000)

    return () => clearTimeout(animationTimeout)
  }, [isAnimating, char, delay, duration])

  return (
    <div className="relative h-16 sm:h-20 md:h-24 w-8 sm:w-10 md:w-12 overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayChar + prevChar}
          className="absolute inset-0 flex items-center justify-center gids-character text-3xl sm:text-4xl md:text-5xl font-bold text-gold-light"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{
            duration: duration,
            ease: 'easeInOut',
          }}
          style={{
            textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)',
          }}
        >
          {displayChar}
        </motion.span>
      </AnimatePresence>

      {/* Top half reflection line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      {/* Bottom half reflection line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </div>
  )
}

/**
 * GIDS Display Component
 * Airport departure board style animated text display
 *
 * Features:
 * - Character-by-character flip animation
 * - Staggered timing for each character
 * - Golden gradient text
 * - Dark background with subtle glow
 * - Infinite loop animation
 */
export default function GidsDisplay({
  text = 'ARRIVING',
  secondLine = 'SOON',
  subtitle = 'MapleSky Travels Inc. - Redefining Travel Industry',
  charDelay = 0.15,
  flipDuration = 0.6,
  pauseDuration = 5,
}: GidsDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  // Create array of characters for rendering
  const characters = useMemo(() => text.split(''), [text])
  const secondLineChars = useMemo(() => secondLine.split(''), [secondLine])

  useEffect(() => {
    // Initial delay before first animation
    const initialTimeout = setTimeout(() => {
      setIsAnimating(true)
    }, 1000)

    // Restart animation loop
    const restartInterval = setInterval(() => {
      setAnimationKey((prev) => prev + 1)
      setIsAnimating(true)

      // Stop animation after flip completes
      setTimeout(() => {
        setIsAnimating(false)
      }, (characters.length * charDelay + flipDuration) * 1000)
    }, (pauseDuration + characters.length * charDelay + flipDuration) * 1000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(restartInterval)
    }
  }, [charDelay, flipDuration, pauseDuration, characters.length])

  return (
    <motion.div
      key={animationKey}
      className="gids-container rounded-lg p-4 sm:p-6 md:p-8 mx-2 sm:mx-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="heading"
      aria-level={1}
      aria-label={text}
    >
      {/* Main animated text */}
      <div
        className="flex justify-center items-center flex-wrap"
        aria-hidden={false}
      >
        {characters.map((char, index) => {
          // Calculate staggered delay for each character
          const delay = index * charDelay

          // Render space as invisible spacer
          if (char === ' ') {
            return (
              <div
                key={`space-${index}`}
                className="h-16 sm:h-20 md:h-24 w-4 sm:w-5 md:w-6"
              />
            )
          }

          return (
            <FlippingCharacter
              key={`${animationKey}-${index}`}
              char={char}
              isAnimating={isAnimating}
              delay={delay}
              duration={flipDuration}
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
          // Calculate staggered delay for each character
          const delay = (text.length + index) * charDelay

          // Render space as invisible spacer
          if (char === ' ') {
            return (
              <div
                key={`space2-${index}`}
                className="h-16 sm:h-20 md:h-24 w-4 sm:w-5 md:w-6"
              />
            )
          }

          return (
            <FlippingCharacter
              key={`${animationKey}-second-${index}`}
              char={char}
              isAnimating={isAnimating}
              delay={delay}
              duration={flipDuration}
            />
          )
        })}
      </div>

      {/* Subtitle */}
      <motion.p
        className="mt-6 sm:mt-8 text-center text-sm sm:text-base md:text-lg text-white/70 font-inter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {subtitle}
      </motion.p>

      {/* Decorative bottom line */}
      <div className="mt-6 sm:mt-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </motion.div>
  )
}