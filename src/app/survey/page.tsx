"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import {
  trackPageViewWithVariant,
  trackSurveyStart,
  trackSurveyComplete,
  trackFormInteraction,
  setupScrollTracking,
  setupTimeTracking,
  getCurrentVariant
} from "@/lib/analytics";

const content = getContent();

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface SurveyAnswers {
  [key: string]: string | string[];
}

export default function SurveyPage() {
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [surveyStarted, setSurveyStarted] = useState(false);

  const variant = getCurrentVariant();

  // Set up analytics tracking
  useEffect(() => {
    // Track page view
    trackPageViewWithVariant();

    // Set up scroll and time tracking
    const cleanupScroll = setupScrollTracking(variant);
    const cleanupTime = setupTimeTracking(variant);

    return () => {
      cleanupScroll?.();
      cleanupTime?.();
    };
  }, [variant]);

  const handleRadioChange = (questionId: string, value: string) => {
    // Track survey start on first interaction
    if (!surveyStarted) {
      trackSurveyStart(variant);
      setSurveyStarted(true);
    }

    setAnswers(prev => ({ ...prev, [questionId]: value }));
    trackFormInteraction('survey', 'input', questionId, variant);
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    // Track survey start on first interaction
    if (!surveyStarted) {
      trackSurveyStart(variant);
      setSurveyStarted(true);
    }

    setAnswers(prev => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      if (checked) {
        return { ...prev, [questionId]: [...currentAnswers, option] };
      } else {
        return { ...prev, [questionId]: currentAnswers.filter(item => item !== option) };
      }
    });
    trackFormInteraction('survey', 'input', questionId, variant);
  };

  const handleTextChange = (questionId: string, value: string) => {
    // Track survey start on first interaction
    if (!surveyStarted) {
      trackSurveyStart(variant);
      setSurveyStarted(true);
    }

    setAnswers(prev => ({ ...prev, [questionId]: value }));
    trackFormInteraction('survey', 'input', questionId, variant);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate required questions
    const requiredQuestions = content.survey.questions.filter(q => q.required);
    const missingAnswers = requiredQuestions.filter(q => !answers[q.id] || 
      (Array.isArray(answers[q.id]) && (answers[q.id] as string[]).length === 0));

    if (missingAnswers.length > 0) {
      setError("Please answer all required questions.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          variant: variant
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }

      // Track successful survey completion
      trackSurveyComplete(variant, Object.keys(answers).length);

      setIsSubmitted(true);
    } catch {
      // Track survey error
      trackFormInteraction('survey', 'error', 'form', variant);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header showBackButton backHref="/" />
        <div className="flex items-center justify-center p-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="max-w-md mx-auto text-center p-8 bg-card border-border shadow-lg">
              <CardContent className="p-0">
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-foreground mb-4">Thank You!</h1>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {content.survey.thankYouMessage}
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer minimal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header showBackButton backHref="/" title="Survey" />

      {/* Half Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {content.survey.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.survey.intro}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >

          {/* Survey Form */}
          <motion.div variants={fadeInUp}>
            <Card className="p-6 lg:p-8 bg-card border-border shadow-lg">
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {content.survey.questions.map((question, index) => (
                    <motion.div
                      key={question.id}
                      className="space-y-4"
                      variants={fadeInUp}
                    >
                      <Label className="text-base font-medium text-foreground block">
                        {index + 1}. {question.question}
                        {question.required && <span className="text-destructive ml-1">*</span>}
                      </Label>

                      {question.type === 'radio' && question.options && (
                        <RadioGroup
                          value={answers[question.id] as string || ""}
                          onValueChange={(value) => handleRadioChange(question.id, value)}
                          className="space-y-3"
                        >
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-3">
                              <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                              <Label 
                                htmlFor={`${question.id}-${optionIndex}`}
                                className="text-muted-foreground cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      {question.type === 'checkbox' && question.options && (
                        <div className="space-y-3">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-3">
                              <Checkbox
                                id={`${question.id}-${optionIndex}`}
                                checked={(answers[question.id] as string[] || []).includes(option)}
                                onCheckedChange={(checked) => 
                                  handleCheckboxChange(question.id, option, checked as boolean)
                                }
                              />
                              <Label 
                                htmlFor={`${question.id}-${optionIndex}`}
                                className="text-muted-foreground cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === 'text' && (
                        <Input
                          type="text"
                          value={answers[question.id] as string || ""}
                          onChange={(e) => handleTextChange(question.id, e.target.value)}
                          placeholder="Enter your answer..."
                          className="w-full"
                        />
                      )}

                      {question.type === 'textarea' && (
                        <Textarea
                          value={answers[question.id] as string || ""}
                          onChange={(e) => handleTextChange(question.id, e.target.value)}
                          placeholder="Enter your answer..."
                          rows={4}
                          className="w-full"
                        />
                      )}
                    </motion.div>
                  ))}

                  {error && (
                    <motion.div 
                      className="flex items-center gap-2 text-destructive bg-destructive/5 p-4 rounded-lg border border-destructive/20"
                      variants={fadeInUp}
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <motion.div className="pt-6" variants={fadeInUp}>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : content.survey.submitButton}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <Footer minimal />
    </div>
  );
}
