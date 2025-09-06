export interface ContentConfig {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problemSolution: {
    title: string;
    problem: string;
    solutionTitle: string;
    solutionPoints: string[];
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      number: number;
      icon: string;
      title: string;
      description: string;
    }>;
  };
  features: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  targetAudience: {
    title: string;
    description: string;
    audiences: string[];
  };
  closingCta: {
    headline: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  waitlistForm: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
  };
  survey: {
    title: string;
    intro: string;
    thankYouMessage: string;
    submitButton: string;
    questions: Array<{
      id: string;
      type: 'radio' | 'checkbox' | 'text' | 'textarea';
      question: string;
      options?: string[];
      required?: boolean;
    }>;
  };
}

export const defaultContent: ContentConfig = {
  meta: {
    title: "StuffScope - The smarter way to catalog what matters most",
    description: "Instantly scan, document, and organize your belongings. Whether for moving, decluttering, or future insurance claims, keep everything safe, searchable, and accessible.",
    keywords: ["inventory management", "home organization", "insurance documentation", "moving checklist", "belongings catalog"],
    ogTitle: "StuffScope - Smart Inventory Management",
    ogDescription: "The easiest way to document and organize your belongings for insurance, moving, and peace of mind."
  },
  hero: {
    headline: "StuffScope — The smarter way to catalog what matters most.",
    subheadline: "Instantly scan, document, and organize your belongings. Whether for moving, decluttering, or future insurance claims, keep everything safe, searchable, and accessible.",
    ctaPrimary: "Join Waitlist",
    ctaSecondary: "Take Survey"
  },
  problemSolution: {
    title: "Why StuffScope?",
    problem: "Keeping track of your home or business items is time-consuming, messy, and often forgotten until it's too late.",
    solutionTitle: "StuffScope makes documenting your belongings effortless. Just scan a room, and we'll:",
    solutionPoints: [
      "Itemize and categorize your contents automatically",
      "Estimate MSRP or current value where possible", 
      "Export reports for moving, insurance, or personal use",
      "Keep everything backed up and accessible anytime"
    ]
  },
  howItWorks: {
    title: "How It Works",
    subtitle: "Lightweight, web-first, frictionless — no app store needed",
    steps: [
      {
        number: 1,
        icon: "link",
        title: "Get a link",
        description: "Receive StuffScope scan link on your phone or email"
      },
      {
        number: 2,
        icon: "globe",
        title: "Open in browser",
        description: "No download needed — works instantly in any browser"
      },
      {
        number: 3,
        icon: "camera",
        title: "Start scan",
        description: "Use your phone camera to capture a room"
      },
      {
        number: 4,
        icon: "cpu",
        title: "AI processes",
        description: "Items detected and auto-categorized instantly"
      },
      {
        number: 5,
        icon: "edit",
        title: "Add details",
        description: "Edit, confirm, or adjust items as needed"
      },
      {
        number: 6,
        icon: "save",
        title: "Save & export",
        description: "Generate report, CSV, or keep in cloud dashboard"
      }
    ]
  },
  features: {
    title: "Key Features",
    items: [
      {
        icon: "camera",
        title: "One-tap scanning",
        description: "No spreadsheets, no typing - just point and scan"
      },
      {
        icon: "tag",
        title: "Automatic categorization", 
        description: "Furniture, appliances, electronics, and more"
      },
      {
        icon: "dollar-sign",
        title: "Value estimates",
        description: "MSRP lookups and resale guidance"
      },
      {
        icon: "download",
        title: "Flexible exports",
        description: "CSV, PDF, or direct insurance submissions"
      },
      {
        icon: "cloud",
        title: "Cloud backup",
        description: "Secure, always accessible from anywhere"
      }
    ]
  },
  targetAudience: {
    title: "Who It's For",
    description: "StuffScope is designed for:",
    audiences: [
      "Homeowners preparing for claims or moving",
      "Renters who want a simple inventory record", 
      "Small business owners documenting stock or assets",
      "Collectors and organizers who need quick documentation"
    ]
  },
  closingCta: {
    headline: "Start organizing smarter today.",
    description: "Be among the first to try StuffScope—the smarter way to manage home and business inventory. Your feedback matters. Take our quick survey and help shape the future of StuffScope.",
    ctaPrimary: "🚀 Join the Waitlist",
    ctaSecondary: "👉 Take the 2-minute Survey"
  },
  waitlistForm: {
    title: "Join the Waitlist",
    description: "Get early access to StuffScope and be notified when we launch.",
    nameLabel: "Full Name",
    emailLabel: "Email Address", 
    submitButton: "Join the Waitlist",
    successMessage: "Thanks for joining! We'll keep you updated as we get closer to launch.",
    errorMessage: "Something went wrong. Please try again."
  },
  survey: {
    title: "StuffScope Market Research Survey",
    intro: "Thank you for taking a few minutes to help us shape StuffScope. We're building a simple tool to help people document, organize, and protect the things they care about. Your feedback will directly influence what we create.",
    thankYouMessage: "Thanks for sharing your input! Every response helps us make StuffScope smarter and more useful. We'll keep you updated as we get closer to launch.",
    submitButton: "Submit Survey",
    questions: [
      {
        id: "q1",
        type: "radio",
        question: "Have you ever created a list or record of your home or business belongings?",
        options: ["Yes", "No"],
        required: true
      },
      {
        id: "q2", 
        type: "checkbox",
        question: "If yes, how did you document your belongings? (Select all that apply)",
        options: [
          "Spreadsheet (Excel/Google Sheets)",
          "Photos on my phone", 
          "Written notes",
          "Insurance company tool",
          "Other (please specify)"
        ]
      },
      {
        id: "q3",
        type: "radio", 
        question: "How often do you update your belongings list or records?",
        options: [
          "Never",
          "Once a year",
          "After a major purchase", 
          "Only after a loss/move"
        ],
        required: true
      },
      {
        id: "q4",
        type: "checkbox",
        question: "What situations would motivate you most to use a tool like StuffScope? (Select all that apply)",
        options: [
          "Preparing for an insurance claim",
          "Moving homes or businesses",
          "Organizing clutter / decluttering",
          "Tracking valuables for resale or pawn", 
          "Documenting collections (art, antiques, electronics, etc.)",
          "Other (please specify)"
        ]
      },
      {
        id: "q5",
        type: "radio",
        question: "How valuable would it be to you if StuffScope automatically provided MSRP or estimated values for your items?",
        options: [
          "Extremely valuable",
          "Somewhat valuable", 
          "Not valuable"
        ],
        required: true
      },
      {
        id: "q6",
        type: "radio",
        question: "Would you be willing to pay a small monthly subscription ($5–$10) for unlimited scans and item reports?",
        options: [
          "Yes",
          "Maybe, depends on features",
          "No"
        ],
        required: true
      },
      {
        id: "q7",
        type: "checkbox",
        question: "Which features would you find most useful? (Select all that apply)",
        options: [
          "Automatic categorization (furniture, electronics, appliances, etc.)",
          "Estimated market value/MSRP lookups",
          "Exportable reports (PDF/Excel)",
          "Cloud backup of inventory",
          "Integration with insurance applications", 
          "Reminders to re-scan/update contents"
        ]
      },
      {
        id: "q8",
        type: "radio",
        question: "How easy does StuffScope need to be for you to use it regularly?",
        options: [
          "One-click scan (no typing)",
          "Simple guided steps (minimal input)",
          "I don't mind manual entry if it's faster than spreadsheets"
        ],
        required: true
      },
      {
        id: "q9",
        type: "checkbox", 
        question: "What concerns would you have about using a tool like StuffScope? (Select all that apply)",
        options: [
          "Privacy/security of photos",
          "Accuracy of item recognition",
          "Cost of subscription",
          "Time required to use",
          "Other (please specify)"
        ]
      },
      {
        id: "q10",
        type: "textarea",
        question: "What's one feature or capability you would most like to see in StuffScope that would make it indispensable for you?",
        required: false
      }
    ]
  }
};

// V1 Content - More engaging and attention-grabbing version
export const v1Content: ContentConfig = {
  meta: {
    title: "StuffScope - Never Lose Track of What Matters Again",
    description: "Stop worrying about lost belongings. Instantly catalog everything you own with AI-powered scanning. Perfect for insurance claims, moving, and peace of mind.",
    keywords: ["home inventory", "insurance documentation", "belongings tracker", "moving inventory", "asset protection", "AI scanning"],
    ogTitle: "StuffScope - Protect What You Own",
    ogDescription: "The smartest way to document your belongings. Scan once, protect forever."
  },
  hero: {
    headline: "Never Lose Track of What Matters Again",
    subheadline: "What if you lost everything tomorrow? StuffScope ensures you're prepared. Scan any room in seconds and get instant AI-powered inventory reports for insurance, moving, or peace of mind.",
    ctaPrimary: "Get Early Access",
    ctaSecondary: "See How It Works"
  },
  problemSolution: {
    title: "The Hidden Risk Every Homeowner Faces",
    problem: "97% of people can't remember what they own until disaster strikes. When fire, theft, or damage happens, you'll wish you had documented everything. Insurance companies reject 40% of claims due to insufficient documentation.",
    solutionTitle: "StuffScope turns your phone into a powerful inventory assistant:",
    solutionPoints: [
      "AI instantly identifies and values every item in seconds",
      "Generate insurance-ready reports that get claims approved faster",
      "Never lose track of warranties, receipts, or purchase dates",
      "Access your inventory anywhere, anytime - even offline"
    ]
  },
  howItWorks: {
    title: "From Chaos to Catalog in 60 Seconds",
    subtitle: "No apps to download. No complicated setup. Just point, scan, and protect.",
    steps: [
      {
        number: 1,
        icon: "link",
        title: "Get instant access",
        description: "Click the link we send - works on any phone browser"
      },
      {
        number: 2,
        icon: "globe",
        title: "Open & scan",
        description: "Point your camera at any room - that's it"
      },
      {
        number: 3,
        icon: "camera",
        title: "AI does the work",
        description: "Watch as every item gets identified automatically"
      },
      {
        number: 4,
        icon: "cpu",
        title: "Get instant value",
        description: "See real-time pricing and replacement costs"
      },
      {
        number: 5,
        icon: "edit",
        title: "Review & adjust",
        description: "Fine-tune details or add personal notes"
      },
      {
        number: 6,
        icon: "save",
        title: "Download & protect",
        description: "Get insurance-ready PDFs and cloud backup"
      }
    ]
  },
  features: {
    title: "Why Smart Homeowners Choose StuffScope",
    items: [
      {
        icon: "camera",
        title: "Lightning-fast scanning",
        description: "Document entire rooms in under 60 seconds - no typing required"
      },
      {
        icon: "tag",
        title: "AI-powered recognition",
        description: "Identifies brands, models, and conditions with 95% accuracy"
      },
      {
        icon: "dollar-sign",
        title: "Real-time valuations",
        description: "Instant replacement costs and depreciation calculations"
      },
      {
        icon: "download",
        title: "Insurance-ready exports",
        description: "Professional reports that insurance companies actually accept"
      },
      {
        icon: "cloud",
        title: "Bulletproof backup",
        description: "Military-grade encryption keeps your data safe forever"
      }
    ]
  },
  targetAudience: {
    title: "Join Thousands Who've Already Protected Their Assets",
    description: "StuffScope is trusted by:",
    audiences: [
      "Homeowners who want to sleep better at night knowing they're covered",
      "Renters tired of losing security deposits over 'missing' items",
      "Small business owners protecting their equipment investments",
      "Anyone who's ever said 'I wish I had documented that before it was stolen'"
    ]
  },
  closingCta: {
    headline: "Don't Wait Until It's Too Late",
    description: "Every day you wait is another day at risk. Join our exclusive early access program and be among the first to protect what matters most. Limited spots available.",
    ctaPrimary: "🔒 Secure My Spot Now",
    ctaSecondary: "📋 Help Shape StuffScope"
  },
  waitlistForm: {
    title: "Secure Your Early Access",
    description: "Join 2,847+ smart homeowners who are already protecting their belongings with StuffScope.",
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    submitButton: "Get Early Access",
    successMessage: "🎉 You're in! We'll notify you the moment StuffScope is ready. Check your email for next steps.",
    errorMessage: "Oops! Something went wrong. Please try again or contact us directly."
  },
  survey: {
    title: "Help Us Build the Perfect Inventory Tool",
    intro: "Your input shapes StuffScope's future. This 2-minute survey helps us understand what matters most to you when protecting your belongings. Every answer makes StuffScope better.",
    thankYouMessage: "Thank you! Your feedback is invaluable. We'll use these insights to make StuffScope exactly what you need. Stay tuned for updates!",
    submitButton: "Submit My Feedback",
    questions: [
      {
        id: "q1",
        type: "radio",
        question: "Have you ever wished you had better documentation of your belongings?",
        options: ["Yes, definitely", "Sometimes", "Not really"],
        required: true
      },
      {
        id: "q2",
        type: "checkbox",
        question: "What methods have you tried for tracking your belongings? (Select all that apply)",
        options: [
          "Photos scattered across my phone",
          "Spreadsheets that I never update",
          "Written lists that get lost",
          "Insurance company apps (too complicated)",
          "Nothing - I keep meaning to start"
        ]
      },
      {
        id: "q3",
        type: "radio",
        question: "What would motivate you most to document your belongings TODAY?",
        options: [
          "Recent break-in or theft in my area",
          "Planning a big move soon",
          "Just bought expensive items",
          "Insurance company recommended it",
          "Peace of mind"
        ],
        required: true
      },
      {
        id: "q4",
        type: "checkbox",
        question: "Which situations worry you most? (Select all that apply)",
        options: [
          "Fire or natural disaster destroying everything",
          "Burglary while I'm away",
          "Moving and items getting lost/damaged",
          "Insurance claim being denied for lack of proof",
          "Forgetting what I own for tax/resale purposes",
          "Roommate/tenant disputes over belongings"
        ]
      },
      {
        id: "q5",
        type: "radio",
        question: "How much would instant, accurate item valuations be worth to you?",
        options: [
          "Extremely valuable - I need this now",
          "Very helpful for insurance/resale",
          "Nice to have but not essential"
        ],
        required: true
      },
      {
        id: "q6",
        type: "radio",
        question: "Would you pay $9/month to never worry about documenting belongings again?",
        options: [
          "Absolutely - that's cheaper than one insurance deductible",
          "Maybe - depends on how easy it is to use",
          "No - I prefer free solutions"
        ],
        required: true
      },
      {
        id: "q7",
        type: "checkbox",
        question: "Which features would make you choose StuffScope over competitors? (Select all that apply)",
        options: [
          "60-second room scanning (no manual entry)",
          "AI that recognizes brands and models automatically",
          "Insurance-approved report templates",
          "Automatic cloud backup and sync",
          "Integration with major insurance companies",
          "Warranty and receipt tracking"
        ]
      },
      {
        id: "q8",
        type: "radio",
        question: "What's your biggest frustration with current inventory methods?",
        options: [
          "Takes forever and I never finish",
          "Hard to keep updated when I buy new things",
          "Insurance companies don't accept my documentation format",
          "I forget to do it until it's too late"
        ],
        required: true
      },
      {
        id: "q9",
        type: "checkbox",
        question: "What concerns would stop you from using StuffScope? (Select all that apply)",
        options: [
          "Privacy - worried about photos of my home",
          "Accuracy - what if the AI gets things wrong?",
          "Cost - another monthly subscription",
          "Complexity - will it actually be simple?",
          "Trust - is this company legitimate?"
        ]
      },
      {
        id: "q10",
        type: "textarea",
        question: "If StuffScope could solve ONE problem for you, what would it be?",
        required: false
      }
    ]
  }
};

// Function to get content (can be extended for A/B testing)
export function getContent(variant: string = 'default'): ContentConfig {
  switch (variant) {
    case 'v1':
      return v1Content;
    default:
      return defaultContent;
  }
}
