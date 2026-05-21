import { NextResponse } from 'next/server'

/**
 * Health Check API Route
 *
 * GET /api/health
 *
 * Returns service health status
 * Used for:
 * - Infrastructure monitoring
 * - Load balancer health checks
 * - Uptime monitoring
 */
export async function GET() {
  const healthcheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
  }

  try {
    return NextResponse.json(healthcheck, { status: 200 })
  } catch (error) {
    console.error('[Health] Error:', error)

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Health check failed.',
      },
      { status: 503 }
    )
  }
}