'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

interface GidsDisplayProps {
  text?: string
  secondLine?: string
  subtitle?: string
  charDelay?: number
}

const FLIP_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function getRandomChar(): string {
  return FLIP_CHARS[Math.floor(Math.random() * FLIP_CHARS.length)]
}

interface AnimatedCharProps {
  char: string
  delay: number
  isAnimating: boolean
  scrambleCount?: number
  size?: 'large' | 'small'
}

function ScramblingChar({ char, delay, isAnimating, scrambleCount = 8, size = 'large' }: AnimatedCharProps) {
  const [displayChar, setDisplayChar] = useState(char)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isAnimating) {
      setDisplayChar(char)
      setIsScrambling(false)
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    // Start scrambling after delay
    const startTimeout = setTimeout(() => {
      setIsScrambling(true)
      let count = 0

      intervalRef.current = setInterval(() => {
        if (count < scrambleCount) {
          setDisplayChar(getRandomChar())
          count++
        } else {
          setDisplayChar(char)
          setIsScrambling(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, 50) // 50ms between each scramble = 8 chars in ~400ms

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, delay * 1000)

    return () => {
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAnimating, char, delay, scrambleCount])

  return (
    <motion.span
      className={`inline-block font-bold ${size === 'large' ? 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
      style={{
        color: '#D32F2F',
        textShadow: size === 'large'
          ? '0 0 30px rgba(211, 47, 47, 0.4), 0 0 60px rgba(211, 47, 47, 0.2)'
          : '0 0 15px rgba(211, 47, 47, 0.3), 0 0 30px rgba(211, 47, 47, 0.15)',
      }}
    >
      {displayChar}
    </motion.span>
  )
}

export default function GidsDisplay({
  text = 'ARRIVING',
  secondLine = 'SOON',
  subtitle = 'MapleSky Travels Inc.',
  charDelay = 0.08,
}: GidsDisplayProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const characters = useMemo(() => text.split(''), [text])
  const secondLineChars = useMemo(() => secondLine.split(''), [secondLine])

  useEffect(() => {
    // Start animation on mount
    const initialTimeout = setTimeout(() => {
      setIsAnimating(true)
    }, 300)

    // Restart animation loop
    const totalChars = text.length + secondLine.length
    const animDuration = totalChars * charDelay + 0.5
    const pauseDuration = 4000

    const restartInterval = setInterval(() => {
      setIsAnimating(false)
      setTimeout(() => {
        setIsAnimating(true)
      }, 100)
    }, pauseDuration + animDuration * 1000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(restartInterval)
    }
  }, [charDelay, text.length, secondLine.length])

  return (
    <motion.div
      className="gids-container rounded-lg p-4 sm:p-6 md:p-8 mx-2 sm:mx-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      role="heading"
      aria-level={1}
      aria-label={`${text} ${secondLine}`}
    >
      {/* First line */}
      <div className="flex justify-center items-center flex-wrap">
        {characters.map((char, index) => (
          <ScramblingChar
            key={`first-${index}`}
            char={char}
            delay={index * charDelay}
            isAnimating={isAnimating}
            scrambleCount={8}
          />
        ))}
      </div>

      {/* Second line */}
      <div className="flex justify-center items-center flex-wrap mt-2">
        {secondLineChars.map((char, index) => (
          <ScramblingChar
            key={`second-${index}`}
            char={char}
            delay={(text.length + index) * charDelay}
            isAnimating={isAnimating}
            scrambleCount={8}
          />
        ))}
      </div>

      {/* Subtitle - Animated with scramble effect */}
      <div className="flex justify-center items-center flex-wrap mt-6 sm:mt-8">
        {subtitle.split('').map((char, index) => (
          <ScramblingChar
            key={`subtitle-${index}`}
            char={char}
            delay={(text.length + secondLine.length + index) * charDelay + 0.3}
            isAnimating={isAnimating}
            scrambleCount={6}
            size="small"
          />
        ))}
      </div>

      {/* Decorative bottom line */}
      <motion.div
        className="mt-8 sm:mt-10 h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8, ease: 'easeOut' }}
        style={{ background: 'linear-gradient(to right, transparent, #D32F2F, transparent)' }}
      />
    </motion.div>
  )
}