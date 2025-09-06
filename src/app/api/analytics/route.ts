import { NextRequest, NextResponse } from 'next/server';
import { getWaitlistStats, getSurveyStats, testConnection } from '@/lib/supabase';

// GET /api/analytics - Retrieve analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'waitlist':
        const waitlistStats = await getWaitlistStats();
        return NextResponse.json({
          success: true,
          data: waitlistStats
        });

      case 'survey':
        const surveyStats = await getSurveyStats();
        return NextResponse.json({
          success: true,
          data: surveyStats
        });

      case 'health':
        const healthCheck = await testConnection();
        return NextResponse.json(healthCheck);

      case 'summary':
      default:
        // Get both waitlist and survey stats
        const [waitlist, survey] = await Promise.all([
          getWaitlistStats(),
          getSurveyStats()
        ]);

        // Calculate summary statistics
        const waitlistByVariant = waitlist.reduce((acc, entry) => {
          acc[entry.variant] = (acc[entry.variant] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const surveyByVariant = survey.reduce((acc, entry) => {
          acc[entry.variant] = (acc[entry.variant] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const summary = {
          waitlist: {
            total: waitlist.length,
            byVariant: waitlistByVariant,
            latest: waitlist[0]?.created_at || null
          },
          survey: {
            total: survey.length,
            byVariant: surveyByVariant,
            avgQuestions: survey.length > 0 
              ? survey.reduce((sum, s) => sum + s.question_count, 0) / survey.length 
              : 0,
            latest: survey[0]?.created_at || null
          },
          conversionRate: {
            overall: waitlist.length > 0 && survey.length > 0 
              ? (waitlist.length / (waitlist.length + survey.length) * 100).toFixed(2) + '%'
              : 'N/A'
          }
        };

        return NextResponse.json({
          success: true,
          data: summary
        });
    }

  } catch (error) {
    console.error('Analytics API error:', error);
    
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
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
