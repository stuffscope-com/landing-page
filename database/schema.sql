-- StuffScope Database Schema for Supabase
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    variant VARCHAR(50) NOT NULL DEFAULT 'default',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    variant VARCHAR(50) NOT NULL DEFAULT 'default',
    answers JSONB NOT NULL,
    question_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_variant ON waitlist(variant);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

CREATE INDEX IF NOT EXISTS idx_survey_session_id ON survey_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_survey_variant ON survey_responses(variant);
CREATE INDEX IF NOT EXISTS idx_survey_created_at ON survey_responses(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON waitlist 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_survey_responses_updated_at 
    BEFORE UPDATE ON survey_responses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Policy for service role (full access)
CREATE POLICY "Service role can do everything on waitlist" ON waitlist
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything on survey_responses" ON survey_responses
    FOR ALL USING (auth.role() = 'service_role');

-- Policy for authenticated users (read-only access to their own data)
CREATE POLICY "Users can read their own waitlist entries" ON waitlist
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can read their own survey responses" ON survey_responses
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create views for analytics (optional)
CREATE OR REPLACE VIEW waitlist_analytics AS
SELECT 
    variant,
    COUNT(*) as total_signups,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as signups_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as signups_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as signups_30d,
    MIN(created_at) as first_signup,
    MAX(created_at) as latest_signup
FROM waitlist 
GROUP BY variant;

CREATE OR REPLACE VIEW survey_analytics AS
SELECT 
    variant,
    COUNT(*) as total_responses,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as responses_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as responses_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as responses_30d,
    AVG(question_count) as avg_questions_answered,
    MIN(created_at) as first_response,
    MAX(created_at) as latest_response
FROM survey_responses 
GROUP BY variant;

-- Grant access to views
GRANT SELECT ON waitlist_analytics TO service_role;
GRANT SELECT ON survey_analytics TO service_role;

-- Insert sample data (optional - remove in production)
-- INSERT INTO waitlist (name, email, variant) VALUES 
-- ('Test User', 'test@example.com', 'default'),
-- ('Test User V1', 'testv1@example.com', 'v1');

-- Verify tables were created
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('waitlist', 'survey_responses');

-- Show table structures
\d waitlist;
\d survey_responses;
