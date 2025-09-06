import type { Metadata } from "next";
import { SurveyPageClient } from "./survey-client";
import { getContent } from "@/lib/content";

const content = getContent();

export const metadata: Metadata = {
  title: "Survey - Help Shape StuffScope",
  description: "Share your thoughts on inventory management and help us build the perfect solution for documenting your belongings.",
  keywords: ["survey", "feedback", "inventory management", "user research", "product development"],
  openGraph: {
    title: "StuffScope Survey - Your Input Matters",
    description: "Help us build the perfect inventory management tool by sharing your experience and needs.",
    url: "https://stuffscope.com/survey",
    type: "website",
  },
  twitter: {
    title: "StuffScope Survey - Your Input Matters",
    description: "Help us build the perfect inventory management tool by sharing your experience and needs.",
  },
  alternates: {
    canonical: "https://stuffscope.com/survey",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SurveyPage() {
  return <SurveyPageClient />;
}