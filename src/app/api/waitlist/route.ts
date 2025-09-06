import { NextRequest, NextResponse } from 'next/server';

// This is a placeholder implementation for Google Sheets integration
// In production, you would integrate with Google Sheets API or your preferred database

interface WaitlistEntry {
  name: string;
  email: string;
  variant?: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, variant } = body;

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

    // Create waitlist entry
    const waitlistEntry: WaitlistEntry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      variant: variant || 'default',
      timestamp: new Date().toISOString()
    };

    // TODO: Replace with actual Google Sheets API integration
    // Example Google Sheets integration would look like:
    /*
    const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // or doc.sheetsByTitle['Waitlist']
    await sheet.addRow({
      Name: waitlistEntry.name,
      Email: waitlistEntry.email,
      Timestamp: waitlistEntry.timestamp
    });
    */

    // For now, log to console (replace with actual storage)
    console.log('Waitlist entry:', waitlistEntry);

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined waitlist',
        data: { email: waitlistEntry.email }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Waitlist API error:', error);
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
