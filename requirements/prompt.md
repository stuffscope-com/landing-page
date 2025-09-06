You are an expert Next.js, shadcn/ui, and TailwindCSS developer.  
I have an existing Next.js project with shadcn and Tailwind already set up.  

👉 Task: Build a minimal, mobile-first landing page for **StuffScope** using the copy below, with soft motion animations and professional typography (use `Inter` as primary font). Add a clean waitlist join form with proper validation, success/error states, and responsive design. Also, create a separate Survey page that posts data to a Google Sheet API endpoint.

---

### Landing Page Requirements
1. **Hero Section**  
   - Headline: "StuffScope — The smarter way to catalog what matters most."  
   - Subheadline: "Instantly scan, document, and organize your belongings. Whether for moving, decluttering, or future insurance claims, keep everything safe, searchable, and accessible."  
   - CTA buttons: "Join Waitlist" (scrolls to form), "Take Survey" (navigates to /survey).  

2. **Problem & Solution Section**  
   - Problem: “Keeping track of your home or business items is time-consuming, messy, and often forgotten until it’s too late.”  
   - Solution: bullet list: itemize & categorize, estimate values, export reports, cloud backup.  

3. **Key Features Section**  
   Use icons + text grid:
   - One-tap scanning  
   - Automatic categorization  
   - Value estimates  
   - Flexible exports  
   - Cloud backup  

4. **Who It’s For Section**  
   Bullets: homeowners, renters, small business owners, collectors.  

5. **Closing CTA Section**  
   Headline: "Start organizing smarter today."  
   CTA buttons: "Join Waitlist" + "Take Survey".  

6. **Waitlist Join Form**  
   - Inputs: Name, Email.  
   - Button: "Join Waitlist".  
   - Show success message on submission ("Thanks for joining!") or error message if failure.  
   - Form should POST to `/api/waitlist` (to be implemented).  

---

### Survey Page (`/survey`)
- Title: "StuffScope Market Research Survey"  
- Intro: "Thank you for taking a few minutes to help us shape StuffScope. Your feedback will directly influence what we create."  
- Add all 10 questions (mix of radio, checkbox, text input, open-ended).  
- Submit button: "Submit Survey".  
- On submit: POST data to `/api/survey` → backend API should forward to Google Sheets using a Sheets API endpoint.  
- Show thank-you message on success: "Thanks for sharing your input! Every response helps us make StuffScope smarter and more useful."  

---

### API Endpoints
- `/api/waitlist`: Accepts { name, email } → saves to Google Sheet or placeholder mock. Return { success: true } or { error }.  
- `/api/survey`: Accepts survey answers JSON → saves to Google Sheet or placeholder mock. Return { success: true } or { error }.  

---

### Tech Notes
- Use shadcn/ui components for cards, forms, buttons, inputs.  
- Use Tailwind for layout + responsiveness.  
- Add subtle framer-motion animations (fade-in, slide-up) for sections.  
- Keep everything optimized for mobile-first, but responsive for desktop.  
- Minimal, clean look with soft colors (white, gray-100, blue-500 for accents).  
- make sure to respect and maintain browser performance, accessibility, 
- social media and seo related meta tags 
- make sure to include json ld and llm optimization 

---

👉 Deliverables:
1. `app/page.tsx` → landing page with sections + waitlist form.  
2. `app/survey/page.tsx` → survey page with questions + submit form.  
3. `app/api/waitlist/route.ts` → handle POST request, save to Google Sheets API (placeholder code OK).  
4. `app/api/survey/route.ts` → handle POST request, save to Google Sheets API (placeholder code OK).  

Make sure forms have proper validation, success/error handling, and use shadcn components.
