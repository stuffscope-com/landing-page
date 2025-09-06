# 🚀 StuffScope Analytics Quick Start

## ✅ Setup Checklist

### 1. Get Google Analytics GA4 ID
- [ ] Go to [Google Analytics](https://analytics.google.com/)
- [ ] Create new GA4 property for StuffScope
- [ ] Copy Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment
- [ ] Create `.env.local` file in project root
- [ ] Add: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] Replace with your actual Measurement ID

### 3. Test Implementation
- [ ] Run `npm run dev` or `pnpm dev`
- [ ] Visit `http://localhost:3000/` (default version)
- [ ] Visit `http://localhost:3000/v1/` (A/B test version)
- [ ] Check browser console for tracking events
- [ ] Verify GA4 Real-time reports show activity

### 4. Verify Tracking Events

#### Page Views
- [ ] Default version page view tracked
- [ ] V1 version page view tracked with variant
- [ ] A/B test exposure events recorded

#### User Interactions
- [ ] CTA button clicks tracked
- [ ] Form field focus events
- [ ] Scroll depth tracking (25%, 50%, 75%, 90%, 100%)
- [ ] Time on page milestones (30s, 1m, 2m, 5m)

#### Conversions
- [ ] Waitlist signup conversions
- [ ] Survey start events
- [ ] Survey completion conversions
- [ ] Form error tracking

### 5. GA4 Dashboard Setup
- [ ] Set up conversion goals for waitlist signups
- [ ] Set up conversion goals for survey completions
- [ ] Create custom reports for A/B testing
- [ ] Configure audience segments by variant

## 🎯 What You'll See in GA4

### Real-Time Events
- `page_view` - Standard page views
- `page_view_variant` - A/B test page views
- `cta_click` - Call-to-action interactions
- `waitlist_signup` - Conversion events
- `survey_complete` - Survey conversions
- `form_focus` - Form engagement
- `scroll_depth` - Content engagement

### Custom Dimensions
- `content_variant` - A/B test variant (default/v1)
- Event categories: engagement, conversion, experiment

### Conversion Tracking
- Waitlist signups marked as conversion goals
- Survey completions tracked with question count
- Variant attribution for all conversions

## 🔍 Testing Commands

### Browser Console Testing
```javascript
// Check if GA4 is loaded
console.log(window.gtag);

// Manual event test
window.gtag('event', 'test_event', {
  event_category: 'debug',
  event_label: 'manual_test'
});
```

### URL Testing
- Default: `http://localhost:3000/`
- V1 Variant: `http://localhost:3000/v1/`
- Survey Default: `http://localhost:3000/survey/`
- Survey V1: `http://localhost:3000/v1/survey/`

## 📊 Expected Results

After setup, you should see:
- ✅ Real-time events in GA4 dashboard
- ✅ A/B test variant tracking
- ✅ Conversion funnel data
- ✅ User behavior insights
- ✅ Form interaction analytics

## 🚨 Troubleshooting

### No Events Showing
1. Check GA4 Measurement ID is correct
2. Verify `.env.local` file exists and is loaded
3. Clear browser cache and try incognito mode
4. Check browser console for errors

### Variant Not Tracking
1. Verify URL paths (`/` vs `/v1/`)
2. Check `content_variant` parameter in events
3. Test both landing page versions

### Conversions Not Recording
1. Ensure conversion goals are set up in GA4
2. Test complete user flow (page → form → submit)
3. Check event names match GA4 configuration

## 📈 Success Metrics

Monitor these key metrics:
- **Conversion Rate**: Waitlist signups per page view
- **A/B Performance**: Default vs V1 conversion rates
- **Engagement**: Scroll depth and time on page
- **Funnel Analysis**: Drop-off points in user journey

Your StuffScope analytics are now ready to provide deep insights into user behavior and A/B test performance! 🎉
