import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/supabase';

// GET /api/test - Test Supabase connection and environment setup
export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    const envCheck = {
      supabaseUrl: !!supabaseUrl,
      serviceKey: !!serviceKey,
      gaId: !!gaId,
      details: {
        supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'Not set',
        serviceKey: serviceKey ? 'Set (hidden)' : 'Not set',
        gaId: gaId ? gaId : 'Not set'
      }
    };

    // Test Supabase connection
    const connectionTest = await testConnection();

    return NextResponse.json({
      success: true,
      message: 'Environment and connection test results',
      data: {
        environment: envCheck,
        supabase: connectionTest,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Test API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET to test connection.' },
    { status: 405 }
  );
}
