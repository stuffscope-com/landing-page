import { NextRequest, NextResponse } from 'next/server';
import { insertWaitlistEntry, checkEmailExists } from '@/lib/supabase';

interface WaitlistRequest {
  name: string;
  email: string;
  variant?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, variant }: WaitlistRequest = body;

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    // Check if email already exists
    const emailExists = await checkEmailExists(cleanEmail);
    if (emailExists) {
      return NextResponse.json(
        { error: 'Email already registered on waitlist' },
        { status: 409 }
      );
    }

    // Create waitlist entry in Supabase
    const waitlistEntry = await insertWaitlistEntry({
      name: cleanName,
      email: cleanEmail,
      variant: variant || 'default'
    });

    console.log('Waitlist entry saved to Supabase:', {
      id: waitlistEntry.id,
      email: waitlistEntry.email,
      variant: waitlistEntry.variant
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        data: {
          id: waitlistEntry.id,
          email: waitlistEntry.email,
          variant: waitlistEntry.variant
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);

    // Return appropriate error message
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
