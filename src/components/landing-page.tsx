"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Camera, 
  Tag, 
  DollarSign, 
  Download, 
  Cloud,
  CheckCircle,
  AlertCircle,
  Link2,
  Globe,
  Cpu,
  Edit,
  Save
} from "lucide-react";
import { getContent } from "@/lib/content";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import Link from "next/link";
import {
  trackPageViewWithVariant,
  trackWaitlistSignup,
  trackCTAClick,
  trackFormInteraction,
  setupScrollTracking,
  setupTimeTracking,
  getCurrentVariant
} from "@/lib/analytics";

const content = getContent();

const iconMap = {
  camera: Camera,
  tag: Tag,
  "dollar-sign": DollarSign,
  download: Download,
  cloud: Cloud,
  link: Link2,
  globe: Globe,
  cpu: Cpu,
  edit: Edit,
  save: Save,
};

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

export function LandingPage() {
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    isSubmitting: false,
    isSubmitted: false,
    error: null as string | null
  });

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

  const scrollToWaitlist = () => {
    trackCTAClick('primary', 'Join Waitlist', 'hero', variant);
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistForm(prev => ({ ...prev, isSubmitting: true, error: null }));

    // Track form submission attempt
    trackFormInteraction('waitlist', 'submit', 'form', variant);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: waitlistForm.name,
          email: waitlistForm.email,
          variant: variant
        })
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      // Track successful signup
      trackWaitlistSignup(variant, waitlistForm.email);

      setWaitlistForm(prev => ({ 
        ...prev, 
        isSubmitted: true, 
        isSubmitting: false,
        name: "",
        email: ""
      }));
    } catch {
      // Track form error
      trackFormInteraction('waitlist', 'error', 'form', variant);
      
      setWaitlistForm(prev => ({ 
        ...prev, 
        error: content.waitlistForm.errorMessage,
        isSubmitting: false 
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onScrollToWaitlist={scrollToWaitlist} />

      {/* Problem & Solution Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div className="text-center mb-12 sm:mb-16" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-heading">
                {content.problemSolution.title}
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid gap-6 md:grid-cols-2 lg:gap-8"
              variants={staggerChildren}
            >
              <motion.div variants={fadeInUp}>
                <Card className="p-6 sm:p-8 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mb-6">
                      <AlertCircle className="w-6 h-6 text-destructive" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-destructive mb-4 font-heading">The Problem</h3>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {content.problemSolution.problem}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Card className="p-6 sm:p-8 bg-gradient-to-br from-success/5 to-success/10 border-success/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 h-full">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-6">
                      <CheckCircle className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-success mb-4 font-heading">Our Solution</h3>
                    <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed">
                      {content.problemSolution.solutionTitle}
                    </p>
                    <ul className="space-y-3">
                      {content.problemSolution.solutionPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                          <span className="text-base leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div className="text-center mb-12 sm:mb-16" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-heading">
                {content.howItWorks.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {content.howItWorks.subtitle}
              </p>
            </motion.div>
            
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={staggerChildren}
            >
              {content.howItWorks.steps.map((step, index) => {
                const IconComponent = iconMap[step.icon as keyof typeof iconMap];
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border hover:border-primary/20 bg-background">
                      <CardContent className="p-0 text-center">
                        <div className="relative mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <IconComponent className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-sm shadow-md">
                            {step.number}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Flow Arrow for Desktop */}
            <motion.div 
              className="hidden lg:block mt-8"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-center space-x-4 text-gray-400">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm font-medium">Simple • Fast • No Downloads</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12"
              variants={fadeInUp}
            >
              {content.features.title}
            </motion.h2>
            
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={staggerChildren}
            >
              {content.features.items.map((feature, index) => {
                const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-0 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div className="mb-12 sm:mb-16" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6 font-heading">
                {content.targetAudience.title}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {content.targetAudience.description}
              </p>
            </motion.div>
            
            <motion.div 
              className="grid gap-4 sm:grid-cols-2 lg:gap-6 max-w-4xl mx-auto"
              variants={staggerChildren}
            >
              {content.targetAudience.audiences.map((audience, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-left"
                  variants={fadeInUp}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-foreground font-medium text-base sm:text-lg">{audience}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-12 sm:py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-lg mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-card to-card/90 border-border shadow-2xl">
              <CardContent className="p-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-3 sm:mb-4 font-heading">
                  {content.waitlistForm.title}
                </h2>
                <p className="text-muted-foreground text-center mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  {content.waitlistForm.description}
                </p>

                {waitlistForm.isSubmitted ? (
                  <div className="text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <p className="text-green-700 font-medium">
                      {content.waitlistForm.successMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                        {content.waitlistForm.nameLabel}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={waitlistForm.name}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                          onFocus={() => trackFormInteraction('waitlist', 'focus', 'name', variant)}
                        required
                          className="h-12 text-base"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2 block">
                        {content.waitlistForm.emailLabel}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                          onFocus={() => trackFormInteraction('waitlist', 'focus', 'email', variant)}
                        required
                          className="h-12 text-base"
                        placeholder="Enter your email address"
                      />
                    </div>

                    {waitlistForm.error && (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{waitlistForm.error}</span>
                      </div>
                    )}

                    <Button 
                      type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={waitlistForm.isSubmitting}
                    >
                      {waitlistForm.isSubmitting ? "Joining..." : content.waitlistForm.submitButton}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 sm:mb-6 font-heading"
              variants={fadeInUp}
            >
              {content.closingCta.headline}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              {content.closingCta.description}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Button 
                size="lg"
                className="hidden bg-card text-primary hover:bg-card/90 px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                onClick={scrollToWaitlist}
              >
                {content.closingCta.ctaPrimary}
              </Button>
              <Button
                variant="destructive"
                size="lg"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-6 sm:px-8 py-3 text-base sm:text-lg transition-all duration-300 w-full sm:w-auto"
                onClick={() => trackCTAClick('secondary', 'Take Survey', 'closing_cta', variant)}
                asChild
              >
                <Link href="/survey">{content.closingCta.ctaSecondary}</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
