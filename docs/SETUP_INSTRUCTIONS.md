# 🚀 StuffScope Database Setup - Fix Instructions

## 🔍 **Problem Explanation**

The error you encountered:
```
Could not find the table 'public.waitlist' in the schema cache
```

**Root Cause**: The database tables haven't been created in your Supabase project yet. The API code is trying to query tables that don't exist.

## ✅ **Solution Steps**

### Step 1: Create Supabase Project (if not done)
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login
3. Click "New Project"
4. Choose organization and enter project details
5. Wait for project to be ready (2-3 minutes)

### Step 2: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Service Role Key** (secret key, NOT the anon key)

### Step 3: Set Environment Variables
Create/update `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Google Analytics (if you have it)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**⚠️ Important**: 
- Use the **Service Role Key** (not anon key)
- Never commit `.env.local` to git
- Restart your dev server after adding environment variables

### Step 4: Create Database Tables
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `database/setup-simple.sql`
4. Paste into the SQL editor
5. Click **Run** to execute

**What this creates**:
- `waitlist` table for email signups
- `survey_responses` table for survey data
- Indexes for performance
- Security policies for access control
- A test record to verify setup

### Step 5: Verify Setup
1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Test the connection by visiting:
   ```
   http://localhost:3000/api/test
   ```

3. You should see:
   ```json
   {
     "success": true,
     "message": "Environment and connection test results",
     "data": {
       "environment": {
         "supabaseUrl": true,
         "serviceKey": true
       },
       "supabase": {
         "success": true,
         "message": "Supabase connection successful"
       }
     }
   }
   ```

### Step 6: Test Functionality
1. **Test Waitlist**: Try signing up on your landing page
2. **Test Survey**: Complete the survey form
3. **Check Analytics**: Visit `/api/analytics?type=summary`

## 🔧 **Troubleshooting**

### Error: "Permission denied"
**Solution**: Check your service role key in `.env.local`

### Error: "Invalid API key"
**Solution**: Make sure you're using the service role key, not the anon key

### Error: "Connection refused"
**Solution**: Verify your Supabase project URL is correct

### Tables still not found
**Solution**: 
1. Go to Supabase **Table Editor**
2. Verify `waitlist` and `survey_responses` tables exist
3. If not, re-run the SQL setup script

## 📊 **Verify Database Setup**

After setup, you can verify in Supabase dashboard:

1. **Table Editor**: Should show `waitlist` and `survey_responses` tables
2. **SQL Editor**: Run this query to check:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('waitlist', 'survey_responses');
   ```

## 🎯 **What Each File Does**

- `src/lib/supabase.ts` - Database client and operations
- `src/app/api/waitlist/route.ts` - Handles email signups
- `src/app/api/survey/route.ts` - Handles survey submissions
- `src/app/api/analytics/route.ts` - Provides data insights
- `src/app/api/test/route.ts` - Tests connection and setup
- `database/setup-simple.sql` - Creates all database tables

## 🚨 **Common Mistakes to Avoid**

1. **Using anon key instead of service role key**
2. **Not restarting dev server after env changes**
3. **Forgetting to run the SQL setup script**
4. **Using wrong Supabase project URL**
5. **Committing `.env.local` to git**

## ✅ **Success Indicators**

When everything is working correctly:
- ✅ `/api/test` returns success
- ✅ Waitlist signup works without errors
- ✅ Survey submission works
- ✅ `/api/analytics` shows data
- ✅ Supabase Table Editor shows your tables with data

Follow these steps in order, and your database integration will be working perfectly! 🎉
