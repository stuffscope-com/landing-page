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
  const { data, error } = await supabase
    .from('waitlist')
    .select('email')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
    console.error('Supabase email check error:', error);
    throw new Error(`Failed to check email: ${error.message}`);
  }

  return !!data;
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
    const { data, error } = await supabase
      .from('waitlist')
      .select('count')
      .limit(1);

    if (error) {
      throw error;
    }

    return { success: true, message: 'Supabase connection successful' };
  } catch (error) {
    console.error('Supabase connection test failed:', error);
    return { success: false, message: 'Supabase connection failed', error };
  }
}
