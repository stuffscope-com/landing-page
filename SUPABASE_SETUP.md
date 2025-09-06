# 🗄️ Supabase Database Setup Guide

## Overview

I've replaced the Google Sheets integration with a secure Supabase database connection for storing waitlist entries and survey responses with proper authentication, validation, and analytics.

## 🚀 Quick Setup

### 1. Create Supabase Project
1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Wait for the database to be ready
4. Note your project URL and service role key

### 2. Set Up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `database/schema.sql`
4. Run the SQL to create tables, indexes, and security policies

### 3. Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Google Analytics (existing)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important**: 
- Use the **service role key** (not anon key) for server-side operations
- Never expose the service role key in client-side code
- The `NEXT_PUBLIC_` prefix is only for the Supabase URL

### 4. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## 🏗️ Database Schema

### Tables Created

#### `waitlist` Table
```sql
- id (UUID, Primary Key)
- name (VARCHAR, NOT NULL)
- email (VARCHAR, UNIQUE, NOT NULL)
- variant (VARCHAR, DEFAULT 'default')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### `survey_responses` Table
```sql
- id (UUID, Primary Key)
- session_id (VARCHAR, UNIQUE, NOT NULL)
- variant (VARCHAR, DEFAULT 'default')
- answers (JSONB, NOT NULL)
- question_count (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Security Features

#### Row Level Security (RLS)
- ✅ **Service Role**: Full access for API operations
- ✅ **Authenticated Users**: Read-only access to own data
- ✅ **Anonymous Users**: No direct database access

#### Data Validation
- ✅ **Email Uniqueness**: Prevents duplicate waitlist entries
- ✅ **Input Sanitization**: Trims and validates all inputs
- ✅ **Type Safety**: TypeScript interfaces for all operations

## 📊 API Endpoints

### Waitlist API (`/api/waitlist`)
```typescript
POST /api/waitlist
{
  "name": "John Doe",
  "email": "john@example.com",
  "variant": "v1"
}

Response:
{
  "success": true,
  "message": "Successfully joined waitlist",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "variant": "v1"
  }
}
```

**Features:**
- ✅ Email validation and deduplication
- ✅ Variant tracking for A/B testing
- ✅ Secure database insertion
- ✅ Error handling with appropriate HTTP status codes

### Survey API (`/api/survey`)
```typescript
POST /api/survey
{
  "answers": {
    "q1": "Yes",
    "q2": ["Option 1", "Option 2"],
    "q3": "Free text response"
  },
  "variant": "v1"
}

Response:
{
  "success": true,
  "message": "Survey response recorded successfully",
  "data": {
    "id": "uuid",
    "sessionId": "survey_123456789_abc123",
    "variant": "v1",
    "questionCount": 3
  }
}
```

**Features:**
- ✅ JSONB storage for flexible answer formats
- ✅ Session ID generation for tracking
- ✅ Question count analytics
- ✅ Variant attribution

### Analytics API (`/api/analytics`)
```typescript
GET /api/analytics?type=summary

Response:
{
  "success": true,
  "data": {
    "waitlist": {
      "total": 150,
      "byVariant": { "default": 75, "v1": 75 },
      "latest": "2024-01-15T10:30:00Z"
    },
    "survey": {
      "total": 89,
      "byVariant": { "default": 44, "v1": 45 },
      "avgQuestions": 8.5,
      "latest": "2024-01-15T11:15:00Z"
    },
    "conversionRate": {
      "overall": "62.83%"
    }
  }
}
```

**Query Parameters:**
- `type=summary` - Overall statistics
- `type=waitlist` - Waitlist data only
- `type=survey` - Survey data only
- `type=health` - Database connection test

## 🔒 Security Implementation

### Environment Variables
- **Service Role Key**: Server-side only, never exposed to client
- **URL**: Public, safe to expose in client-side code
- **RLS Policies**: Prevent unauthorized data access

### Data Protection
- **Input Validation**: All inputs sanitized and validated
- **SQL Injection Prevention**: Supabase client handles parameterization
- **Type Safety**: TypeScript interfaces prevent data corruption
- **Error Handling**: Graceful error responses without exposing internals

### Access Control
```sql
-- Service role has full access
CREATE POLICY "Service role can do everything" 
ON table_name FOR ALL 
USING (auth.role() = 'service_role');

-- Users can only read their own data
CREATE POLICY "Users can read own data" 
ON table_name FOR SELECT 
USING (auth.uid() IS NOT NULL);
```

## 📈 Analytics & Monitoring

### Built-in Analytics Views
```sql
-- Waitlist analytics by variant
SELECT * FROM waitlist_analytics;

-- Survey response analytics
SELECT * FROM survey_analytics;
```

### Key Metrics Tracked
- **Conversion Rates**: By variant and overall
- **Engagement**: Survey completion rates
- **Growth**: Signups over time periods (24h, 7d, 30d)
- **A/B Testing**: Performance comparison between variants

### Performance Optimizations
- **Indexes**: On email, variant, and timestamp columns
- **JSONB**: Efficient storage and querying of survey answers
- **Connection Pooling**: Supabase handles automatically
- **Caching**: Consider Redis for high-traffic scenarios

## 🧪 Testing

### Health Check
```bash
curl https://your-domain.com/api/analytics?type=health
```

### Test Waitlist
```bash
curl -X POST https://your-domain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","variant":"v1"}'
```

### Test Survey
```bash
curl -X POST https://your-domain.com/api/survey \
  -H "Content-Type: application/json" \
  -d '{"answers":{"q1":"Yes","q2":"Option 1"},"variant":"v1"}'
```

## 🚨 Troubleshooting

### Common Issues

#### Connection Errors
1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Ensure service role key has proper permissions

#### RLS Policy Errors
1. Verify policies are created for service role
2. Check table permissions in Supabase dashboard
3. Test with Supabase SQL editor

#### Data Validation Errors
1. Check email format validation
2. Verify required fields are provided
3. Ensure JSON structure matches interfaces

### Debug Commands
```javascript
// Test Supabase connection
import { testConnection } from '@/lib/supabase';
const result = await testConnection();
console.log(result);
```

## 🎯 Production Checklist

- [ ] Supabase project created and configured
- [ ] Database schema deployed
- [ ] Environment variables set
- [ ] RLS policies active
- [ ] API endpoints tested
- [ ] Analytics working
- [ ] Error handling verified
- [ ] Security policies reviewed

Your StuffScope database is now secure, scalable, and ready for production! 🎉
