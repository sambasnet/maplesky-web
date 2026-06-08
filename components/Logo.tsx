'use client'

interface LogoProps {
  /**
   * Logo size variant
   * small: 120px width - mobile navbar
   * medium: 160px width - footer/desktop navbar
   * large: 200px width - hero/large displays
   */
  size?: 'small' | 'medium' | 'large'
  className?: string
}

/**
 * Width values for each size variant
 */
const sizeWidths = {
  small: 130,
  medium: 180,
  large: 220,
}

/**
 * MapleSky Logo Component
 *
 * Renders the MapleSky Travels logo from public/maplesky-logo.svg
 * Uses exact typography from the source SVG:
 * - MAPLESKY: Cormorant Garamond Bold, #D4AF37 (gold)
 * - TRAVELS: Cormorant Garamond Regular, #FFFFFF (white)
 * - INC.: Poppins Regular, #D4AF37 (gold)
 */
export default function Logo({ size = 'medium', className = '' }: LogoProps) {
  const width = sizeWidths[size]

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width, height: 'auto' }}
    >
      <img
        src="/MapleSky-logonew.svg"
        alt="MapleSky Travels Inc. Logo"
        width={width}
        height="auto"
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  )
}