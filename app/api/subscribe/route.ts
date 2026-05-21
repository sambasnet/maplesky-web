import { NextResponse } from 'next/server'
import { isValidEmail } from '@/lib/utils'

/**
 * Email Subscription API Route
 *
 * POST /api/subscribe
 * Body: { email: string }
 *
 * Validates email and stores subscription
 * Placeholder for email service integration (Mailchimp, SendGrid, etc.)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email presence
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email.trim())) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.trim().toLowerCase()

    // TODO: Implement email service integration
    // Options:
    // - Mailchimp API
    // - SendGrid
    // - AWS SES
    // - Resend
    // - Loops
    //
    // Example:
    // await mailchimp.lists.addListMember(AUDIENCE_ID, {
    //   email_address: normalizedEmail,
    //   status: 'subscribed',
    // })

    // TODO: Store in database for backup
    // await db.subscriptions.create({ email: normalizedEmail })

    // Log for development
    console.log(`[Subscribe] New subscription: ${normalizedEmail}`)

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the waitlist!',
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('[Subscribe] Error:', error)

    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * GET method not supported for this endpoint
 */
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Use POST.' },
    { status: 405 }
  )
}