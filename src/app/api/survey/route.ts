import { NextRequest, NextResponse } from 'next/server';
import { insertSurveyResponse } from '@/lib/supabase';

interface SurveyRequest {
  answers: { [key: string]: string | string[] };
  variant?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, variant }: SurveyRequest = body;

    // Validate input
    if (!answers || typeof answers !== 'object') {
      return NextResponse.json(
        { error: 'Survey answers are required' },
        { status: 400 }
      );
    }

    // Validate that answers is not empty
    if (Object.keys(answers).length === 0) {
      return NextResponse.json(
        { error: 'At least one answer is required' },
        { status: 400 }
      );
    }

    // Generate a unique session ID for this survey response
    const sessionId = `survey_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Count answered questions
    const questionCount = Object.keys(answers).length;

    // Create survey response entry in Supabase
    const surveyResponse = await insertSurveyResponse({
      session_id: sessionId,
      variant: variant || 'default',
      answers: answers,
      question_count: questionCount
    });

    console.log('Survey response saved to Supabase:', {
      id: surveyResponse.id,
      sessionId: surveyResponse.session_id,
      variant: surveyResponse.variant,
      questionCount: surveyResponse.question_count
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Survey response recorded successfully',
        data: {
          id: surveyResponse.id,
          sessionId: surveyResponse.session_id,
          variant: surveyResponse.variant,
          questionCount: surveyResponse.question_count
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Survey API error:', error);

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
