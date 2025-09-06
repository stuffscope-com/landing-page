# Google Analytics GA4 Setup Guide

## Overview

I've implemented comprehensive Google Analytics GA4 tracking for StuffScope with advanced A/B testing capabilities, conversion tracking, and detailed user behavior analytics.

## 🚀 Quick Setup

### 1. Get Your GA4 Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property for StuffScope
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Deploy and Test
- Deploy your application
- Visit both `/` and `/v1/` to test tracking
- Check Google Analytics Real-time reports to verify data flow

## 📊 What's Being Tracked

### Page Views
- **Standard Page Views**: Automatic tracking for all pages
- **Variant Tracking**: Custom events for A/B test exposure
- **Page Titles**: Dynamic titles based on content variant
- **Custom Parameters**: Content variant information

### User Actions & Events

#### CTA Clicks
- **Primary CTAs**: "Join Waitlist", "Get Early Access"
- **Secondary CTAs**: "Take Survey", "See How It Works"
- **Location Tracking**: Hero, closing section, navigation
- **Variant Context**: Which version the user interacted with

#### Form Interactions
- **Form Focus**: When users click into form fields
- **Form Input**: When users type in fields
- **Form Submission**: Successful and failed submissions
- **Field-Level Tracking**: Name, email, survey questions

#### Scroll & Engagement
- **Scroll Depth**: 25%, 50%, 75%, 90%, 100% thresholds
- **Time on Page**: 30s, 1m, 2m, 5m milestones
- **Feature Clicks**: Interaction with feature sections
- **Navigation Tracking**: Between pages and sections

### Conversion Events

#### Waitlist Signups
- **Event**: `waitlist_signup`
- **Conversion Tracking**: Marked as conversion goal
- **Variant Data**: Which version drove the signup
- **User Context**: Hashed email for privacy

#### Survey Completions
- **Survey Start**: When user first interacts with survey
- **Survey Complete**: Successful submission
- **Question Count**: Number of questions answered
- **Completion Rate**: Track drop-off points

### A/B Testing Analytics

#### Variant Exposure
- **Test Name**: `landing_page_content`
- **Variants**: `default` vs `v1`
- **Automatic Detection**: Based on URL path
- **Custom Dimensions**: Content variant parameter

#### Performance Metrics
- **Conversion Rate by Variant**: Waitlist signups per variant
- **Engagement by Variant**: Time on page, scroll depth
- **User Flow**: How users navigate between variants
- **Survey Completion**: Rates by content version

## 🔧 Implementation Details

### Analytics Architecture

```
src/
├── lib/
│   └── analytics.ts          # Core tracking functions
├── components/
│   └── analytics.tsx         # GA4 component & hooks
└── app/
    └── layout.tsx           # Global analytics setup
```

### Key Functions

#### Core Tracking
```typescript
trackPageViewWithVariant()     // Page views with A/B context
trackEvent()                   // Custom event tracking
trackCTAClick()               // Call-to-action interactions
trackFormInteraction()        // Form field interactions
```

#### Conversion Tracking
```typescript
trackWaitlistSignup()         // Waitlist conversions
trackSurveyComplete()         // Survey completions
trackSurveyStart()           // Survey engagement
```

#### Behavioral Analytics
```typescript
setupScrollTracking()         // Scroll depth monitoring
setupTimeTracking()          // Time on page tracking
trackNavigation()            // User flow tracking
```

### Custom Dimensions & Parameters

#### Content Variant Tracking
- **Parameter**: `content_variant`
- **Values**: `default`, `v1`
- **Usage**: Attached to all events for segmentation

#### Event Categories
- **Engagement**: User interactions, clicks, scrolls
- **Conversion**: Signups, completions, goals
- **Experiment**: A/B test exposure and results

## 📈 Analytics Dashboard Setup

### Recommended GA4 Reports

#### 1. A/B Test Performance
- **Metric**: Conversion rate by content variant
- **Dimension**: Custom parameter (content_variant)
- **Goal**: Compare default vs v1 performance

#### 2. User Journey Analysis
- **Flow**: Page views → CTA clicks → Form interactions → Conversions
- **Segmentation**: By variant and traffic source
- **Funnel**: Track drop-off points

#### 3. Engagement Metrics
- **Scroll Depth**: Average scroll by variant
- **Time on Page**: Engagement duration comparison
- **Form Interactions**: Field-level engagement

#### 4. Conversion Funnel
```
Page View → CTA Click → Form Focus → Form Submit → Success
```

### Custom Events to Monitor

#### High-Priority Events
1. `waitlist_signup` - Primary conversion goal
2. `survey_complete` - Secondary conversion goal
3. `cta_click` - Engagement indicator
4. `ab_test_exposure` - Test participation

#### Engagement Events
1. `scroll_depth` - Content engagement
2. `time_on_page` - Session quality
3. `form_focus` - Intent signals
4. `navigation` - User flow

## 🎯 Key Metrics to Track

### Conversion Metrics
- **Waitlist Conversion Rate**: Signups / Page views
- **Survey Completion Rate**: Completions / Survey starts
- **Variant Performance**: Conversion rate by A/B variant
- **Form Abandonment**: Started vs completed forms

### Engagement Metrics
- **Average Session Duration**: Time spent on site
- **Scroll Depth**: Content consumption depth
- **CTA Click Rate**: Engagement with calls-to-action
- **Page Views per Session**: Site exploration

### A/B Testing Metrics
- **Statistical Significance**: Confidence in results
- **Conversion Lift**: Performance difference between variants
- **Engagement Difference**: Behavioral changes by variant
- **User Preference**: Qualitative feedback correlation

## 🔍 Testing & Verification

### Real-Time Testing
1. Open Google Analytics Real-time reports
2. Visit your site in incognito mode
3. Interact with forms and CTAs
4. Verify events appear in real-time dashboard

### Event Testing Checklist
- [ ] Page views tracked for both variants
- [ ] CTA clicks recorded with variant context
- [ ] Form interactions captured
- [ ] Waitlist signups marked as conversions
- [ ] Survey completions tracked
- [ ] Scroll depth events firing
- [ ] A/B test exposure recorded

### Debug Mode
Add `?debug=1` to your URL to see detailed event logging in browser console.

## 📊 Expected Data Flow

### User Journey Example
```
1. User visits /v1/ → page_view_variant event
2. User scrolls 50% → scroll_depth event  
3. User clicks "Get Early Access" → cta_click event
4. User focuses email field → form_focus event
5. User submits form → waitlist_signup conversion
```

### Event Data Structure
```javascript
{
  event_category: 'conversion',
  event_label: 'v1',
  content_variant: 'v1',
  page_location: '/v1/',
  user_email_hash: 'hashed_email'
}
```

## 🚨 Privacy & Compliance

### Data Protection
- **Email Hashing**: User emails are hashed before tracking
- **No PII**: Personal information is not stored in GA4
- **Consent Ready**: Easy to integrate with consent management
- **GDPR Compliant**: Respects user privacy preferences

### Security Features
- **Client-Side Only**: No server-side tracking
- **Secure Transmission**: HTTPS-only data transfer
- **Minimal Data**: Only necessary metrics collected
- **User Control**: Easy to disable tracking

## 🔧 Troubleshooting

### Common Issues

#### Events Not Appearing
1. Check GA4 Measurement ID is correct
2. Verify environment variable is set
3. Ensure events are firing in browser console
4. Check GA4 real-time reports (can take 5-10 minutes)

#### Variant Tracking Issues
1. Verify URL path detection logic
2. Check variant parameter in events
3. Test both `/` and `/v1/` paths
4. Confirm custom dimensions are configured

#### Conversion Tracking Problems
1. Ensure conversion events are marked in GA4
2. Check event names match exactly
3. Verify conversion goals are set up
4. Test form submissions end-to-end

### Debug Commands
```javascript
// Check if GA4 is loaded
console.log(window.gtag);

// Manual event testing
window.gtag('event', 'test_event', {
  event_category: 'debug',
  event_label: 'manual_test'
});
```

## 📈 Success Metrics

After implementation, you should see:
- **Real-time events** in GA4 dashboard
- **Conversion tracking** for waitlist signups
- **A/B test data** with variant segmentation
- **User behavior insights** from engagement events
- **Funnel analysis** showing user journey optimization opportunities

This comprehensive analytics setup provides deep insights into user behavior, A/B test performance, and conversion optimization opportunities for StuffScope.
