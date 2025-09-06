-- StuffScope Database Setup - Simple Version
-- Copy and paste this entire script into your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    variant VARCHAR(50) NOT NULL DEFAULT 'default',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS public.survey_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    variant VARCHAR(50) NOT NULL DEFAULT 'default',
    answers JSONB NOT NULL,
    question_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_variant ON public.waitlist(variant);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);

CREATE INDEX IF NOT EXISTS idx_survey_session_id ON public.survey_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_survey_variant ON public.survey_responses(variant);
CREATE INDEX IF NOT EXISTS idx_survey_created_at ON public.survey_responses(created_at);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for service role (allows API access)
CREATE POLICY "Allow service role full access to waitlist" ON public.waitlist
    FOR ALL USING (true);

CREATE POLICY "Allow service role full access to survey_responses" ON public.survey_responses
    FOR ALL USING (true);

-- Insert a test record to verify setup (optional)
INSERT INTO public.waitlist (name, email, variant) 
VALUES ('Test User', 'test@stuffscope.com', 'default')
ON CONFLICT (email) DO NOTHING;

-- Verify tables were created
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('waitlist', 'survey_responses')
ORDER BY table_name, ordinal_position;
