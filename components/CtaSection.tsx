'use client'

import { useState, useRef, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { isValidEmail, type FormState } from '@/lib/utils'

/**
 * CTA Section with Email Capture
 *
 * Features:
 * - Email input with validation
 * - Golden bordered "Get Notified" button
 * - Form states: idle, loading, success, error
 * - Keyboard accessible
 * - ARIA labeled for screen readers
 */
export default function CtaSection() {
  const [email, setEmail] = useState('')
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  })
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Handle form submission
   * Validates email and sends to /api/subscribe
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Validate email
    if (!email.trim()) {
      setFormState({
        status: 'error',
        message: 'Please enter your email address.',
      })
      inputRef.current?.focus()
      return
    }

    if (!isValidEmail(email)) {
      setFormState({
        status: 'error',
        message: 'Please enter a valid email address.',
      })
      inputRef.current?.focus()
      return
    }

    // Set loading state
    setFormState({ status: 'loading', message: '' })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed')
      }

      // Success state
      setFormState({
        status: 'success',
        message: "You're on the list! We'll notify you when we launch.",
      })
      setEmail('')

    } catch (error) {
      setFormState({
        status: 'error',
        message: error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      })
    }
  }

  /**
   * Reset form state when user starts typing
   */
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (formState.status !== 'idle') {
      setFormState({ status: 'idle', message: '' })
    }
  }

  return (
    <section
      id="notify"
      className="relative py-20 md:py-32 overflow-hidden"
      aria-labelledby="cta-heading"
      style={{
        background: '#D32F2F',
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream/40 to-transparent" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section heading */}
        <motion.h2
          id="cta-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-cream mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Be the First to Know
        </motion.h2>

        <motion.p
          className="text-cream/70 text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join our exclusive waitlist and get early access when we launch.
        </motion.p>

        {/* Email capture form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          noValidate
        >
          <div className="flex-1 relative">
            <label htmlFor="email-input" className="sr-only">
              Email address
            </label>
            <input
              ref={inputRef}
              type="email"
              id="email-input"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={`
                w-full px-4 py-3 bg-cream/10 border rounded
                text-cream placeholder-cream/40
                focus:outline-none focus:ring-2 focus:ring-cream focus:border-transparent
                transition-all duration-200
                ${formState.status === 'error'
                  ? 'border-cream focus:ring-cream'
                  : 'border-cream/50'
                }
              `}
              aria-describedby={formState.message ? 'form-message' : undefined}
              aria-invalid={formState.status === 'error'}
              disabled={formState.status === 'loading' || formState.status === 'success'}
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            disabled={formState.status === 'loading' || formState.status === 'success'}
            className={`
              px-6 py-3 border-2 rounded font-semibold
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              ${formState.status === 'success'
                ? 'border-cream text-cream bg-cream/10'
                : 'border-cream text-cream hover:bg-cream hover:text-brand'
              }
            `}
            aria-label="Subscribe to get notified"
          >
            {formState.status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Sending...</span>
              </span>
            ) : formState.status === 'success' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Subscribed</span>
              </span>
            ) : (
              'Get Notified'
            )}
          </button>
        </motion.form>

        {/* Status message */}
        {formState.message && (
          <motion.p
            id="form-message"
            className={`
              mt-4 text-sm
              ${formState.status === 'error' ? 'text-cream' : 'text-cream'}
            `}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            aria-live="polite"
          >
            {formState.message}
          </motion.p>
        )}

        {/* Privacy note */}
        <motion.p
          className="mt-6 text-cream/40 text-xs"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />
    </section>
  )
}