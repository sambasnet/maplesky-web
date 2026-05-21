/**
 * Utility functions for MapleSky Travels
 */

/**
 * Validates email format using regex
 * @param email - Email address to validate
 * @returns boolean indicating if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Formats current date for copyright display
 * @returns Current year as string
 */
export function getCurrentYear(): string {
  return new Date().getFullYear().toString()
}

/**
 * Type for form state management
 */
export interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

/**
 * Default form state
 */
export const defaultFormState: FormState = {
  status: 'idle',
  message: '',
}

/**
 * Classnames utility helper (simple version without cn)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}