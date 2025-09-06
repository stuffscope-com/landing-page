# StuffScope Landing Page - Integration Guide

## Google Sheets Integration

The current implementation includes placeholder API endpoints that log data to the console. To integrate with Google Sheets for production use, follow these steps:

### 1. Set up Google Sheets API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API
4. Create a service account and download the JSON key file
5. Share your Google Sheets with the service account email (with edit permissions)

### 2. Install Dependencies

```bash
npm install google-spreadsheet
```

### 3. Environment Variables

Add these to your `.env.local` file:

```env
GOOGLE_SHEET_ID=your_waitlist_sheet_id
GOOGLE_SURVEY_SHEET_ID=your_survey_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. Update API Routes

Replace the placeholder code in the API routes with the commented Google Sheets integration code.

#### Waitlist Sheet Structure
Create a sheet with these columns:
- Name
- Email  
- Timestamp

#### Survey Sheet Structure
Create a sheet with these columns:
- SessionId
- Timestamp
- q1 (Have you ever created a list...)
- q2 (How did you document...)
- q3 (How often do you update...)
- q4 (What situations would motivate...)
- q5 (How valuable would automatic values be...)
- q6 (Would you pay subscription...)
- q7 (Which features most useful...)
- q8 (How easy does it need to be...)
- q9 (What concerns would you have...)
- q10 (One feature you'd like to see...)

## Content Management

The application uses a JSON-driven content system for easy A/B testing and internationalization:

### Content Configuration

Edit `/src/lib/content.ts` to modify:
- SEO metadata
- Page copy and messaging
- Survey questions
- Form labels and messages

### A/B Testing

To implement A/B testing:

1. Create variant content objects in `content.ts`
2. Modify the `getContent()` function to return different variants based on user segments
3. Use query parameters or cookies to determine which variant to show

Example:
```typescript
export function getContent(variant: string = 'default'): ContentConfig {
  switch (variant) {
    case 'variant-a':
      return variantAContent;
    case 'variant-b':
      return variantBContent;
    default:
      return defaultContent;
  }
}
```

### Internationalization (i18n)

To add multiple languages:

1. Create separate content objects for each language
2. Modify the `getContent()` function to accept a locale parameter
3. Use Next.js i18n routing or a library like `next-i18next`

## Performance Optimization

The application is built with performance in mind:

- **Framer Motion**: Animations are optimized and use hardware acceleration
- **Image Optimization**: Use Next.js Image component for any images you add
- **Code Splitting**: Components are automatically code-split by Next.js
- **Font Loading**: Inter font is loaded with `display: swap` for better performance

## SEO Features

The application includes comprehensive SEO optimization:

- **Meta Tags**: Dynamic meta tags based on content configuration
- **Open Graph**: Social media sharing optimization
- **JSON-LD**: Structured data for search engines
- **Sitemap**: Consider adding a sitemap for better indexing

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## Analytics Integration

Consider adding analytics to track user behavior:

### Google Analytics 4

```bash
npm install nextjs-google-analytics
```

Add to your layout:
```tsx
import { GoogleAnalytics } from 'nextjs-google-analytics';

// In your layout component
<GoogleAnalytics trackPageViews />
```

### PostHog (Already included)

The package is already installed. Add your PostHog configuration:

```typescript
// In your layout or a separate analytics component
import posthog from 'posthog-js';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
  });
}
```

## Security Considerations

- **Rate Limiting**: Consider adding rate limiting to API endpoints
- **Input Validation**: The current implementation includes basic validation
- **CORS**: Configure CORS headers if needed for cross-origin requests
- **Environment Variables**: Never commit sensitive keys to version control

## Monitoring

Set up monitoring for production:

- **Error Tracking**: Consider Sentry or similar
- **Performance Monitoring**: Use Vercel Analytics or similar
- **Uptime Monitoring**: Set up alerts for API endpoint availability
