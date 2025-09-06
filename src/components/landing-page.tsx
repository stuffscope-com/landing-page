"use client";

import { useState } from "react";
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

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWaitlistForm(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: waitlistForm.name,
          email: waitlistForm.email
        })
      });

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setWaitlistForm(prev => ({ 
        ...prev, 
        isSubmitted: true, 
        isSubmitting: false,
        name: "",
        email: ""
      }));
    } catch (error) {
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
      <section className="py-16 sm:py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.div className="text-center mb-16" variants={fadeInUp}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 font-heading">
                {content.howItWorks.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
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
      <section className="py-16 sm:py-24 bg-gray-50">
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
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              {content.targetAudience.title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={fadeInUp}
            >
              {content.targetAudience.description}
            </motion.p>
            
            <motion.div 
              className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
              variants={staggerChildren}
            >
              {content.targetAudience.audiences.map((audience, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl"
                  variants={fadeInUp}
                >
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{audience}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-md mx-auto"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="p-6 lg:p-8">
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                  {content.waitlistForm.title}
                </h2>
                <p className="text-gray-600 text-center mb-6">
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
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        {content.waitlistForm.nameLabel}
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={waitlistForm.name}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="mt-1"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        {content.waitlistForm.emailLabel}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={waitlistForm.email}
                        onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                        className="mt-1"
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
      <section className="py-16 sm:py-24 bg-blue-600">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              {content.closingCta.headline}
            </motion.h2>
            <motion.p 
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              {content.closingCta.description}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeInUp}
            >
              <Button 
                variant="default" 
                size="lg"
                type="button"
                className="bg-white text-blue-600 hover:text-gray-50 px-8 py-3 text-lg rounded-xl"
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
