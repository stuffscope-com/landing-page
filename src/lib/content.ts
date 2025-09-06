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
    description: "Be the first to try StuffScope. Join our waitlist and help shape the future of home and business inventory tools.",
    ctaPrimary: "Join Waitlist",
    ctaSecondary: "Take Survey"
  },
  waitlistForm: {
    title: "Join the Waitlist",
    description: "Get early access to StuffScope and be notified when we launch.",
    nameLabel: "Full Name",
    emailLabel: "Email Address", 
    submitButton: "Join Waitlist",
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

// Function to get content (can be extended for A/B testing)
export function getContent(variant: string = 'default'): ContentConfig {
  // In the future, this can load different variants for A/B testing
  // or different languages for i18n
  return defaultContent;
}
