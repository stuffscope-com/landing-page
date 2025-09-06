import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database Types
export interface WaitlistEntry {
  id?: string;
  name: string;
  email: string;
  variant: string;
  created_at?: string;
  updated_at?: string;
}

export interface SurveyResponse {
  id?: string;
  session_id: string;
  variant: string;
  answers: Record<string, string | string[]>;
  question_count: number;
  created_at?: string;
  updated_at?: string;
}

// Waitlist operations
export async function insertWaitlistEntry(entry: Omit<WaitlistEntry, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([entry])
    .select()
    .single();

  if (error) {
    console.error('Supabase waitlist insert error:', error);
    throw new Error(`Failed to save waitlist entry: ${error.message}`);
  }

  return data;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Supabase email check error:', error);

      // Provide specific error messages for common issues
      if (error.message.includes('schema cache')) {
        throw new Error('Database tables not found. Please run the database setup script in Supabase SQL Editor.');
      }

      if (error.message.includes('permission denied')) {
        throw new Error('Database permission denied. Please check your Supabase service role key.');
      }

      throw new Error(`Failed to check email: ${error.message}`);
    }

    return !!data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error occurred while checking email');
  }
}

// Survey operations
export async function insertSurveyResponse(response: Omit<SurveyResponse, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('survey_responses')
    .insert([response])
    .select()
    .single();

  if (error) {
    console.error('Supabase survey insert error:', error);
    throw new Error(`Failed to save survey response: ${error.message}`);
  }

  return data;
}

// Analytics operations
export async function getWaitlistStats() {
  const { data, error } = await supabase
    .from('waitlist')
    .select('variant, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase waitlist stats error:', error);
    throw new Error(`Failed to get waitlist stats: ${error.message}`);
  }

  return data;
}

export async function getSurveyStats() {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('variant, question_count, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase survey stats error:', error);
    throw new Error(`Failed to get survey stats: ${error.message}`);
  }

  return data;
}

// Health check
export async function testConnection() {
  try {
    // First test basic connection
    const { data, error } = await supabase
      .from('waitlist')
      .select('count')
      .limit(1);

    if (error) {
      // Provide specific error messages
      if (error.message.includes('schema cache')) {
        return {
          success: false,
          message: 'Database tables not found. Please run database/setup-simple.sql in Supabase SQL Editor.',
          error: error.message
        };
      }

      if (error.message.includes('permission denied')) {
        return {
          success: false,
          message: 'Permission denied. Check your SUPABASE_SERVICE_ROLE_KEY environment variable.',
          error: error.message
        };
      }

      throw error;
    }

    // Test table structure
    const { data: tableInfo, error: tableError } = await supabase
      .rpc('get_table_info', {}, { count: 'exact' });

    return {
      success: true,
      message: 'Supabase connection successful',
      details: {
        tablesAccessible: true,
        connectionTime: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return {
      success: false,
      message: 'Supabase connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
