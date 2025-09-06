"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tag, 
  DollarSign, 
  Download, 
  Cloud,
  CheckCircle,
  Shield,
  Clock,
  Zap
} from "lucide-react";
import { getContent } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { trackCTAClick, getCurrentVariant } from "@/lib/analytics";

const content = getContent('v1');

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

interface HeroSectionV1Props {
  onScrollToWaitlist: () => void;
}

export function HeroSectionV1({ onScrollToWaitlist }: HeroSectionV1Props) {
  const variant = getCurrentVariant();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-destructive/5 via-background to-primary/5 min-h-[90vh] flex items-center">
      {/* Urgent Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pulsing alert rings */}
        <motion.div 
          className="absolute top-1/4 -right-32 w-96 h-96 border-2 border-destructive/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 border-2 border-primary/20 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[700px] h-[600px] border border-accent/15 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            {/* Urgency Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-medium mb-6"
              variants={fadeInUp}
            >
              <Shield className="w-4 h-4" />
              <span>Don&apos;t wait until it&apos;s too late</span>
            </motion.div>

            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight font-heading"
              variants={fadeInUp}
            >
              {content.hero.headline}
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
              variants={fadeInUp}
            >
              {content.hero.subheadline}
            </motion.p>
            
            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
              variants={fadeInUp}
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-success" />
                <span>60-second setup</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-primary" />
                <span>AI-powered accuracy</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>Insurance approved</span>
              </div>
            </motion.div>
            
            {/* Email Capture with Social Proof */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-6 max-w-md mx-auto lg:mx-0"
              variants={fadeInUp}
            >
              <Input 
                type="email" 
                placeholder="Enter your email for instant access" 
                className="flex-1 h-12 text-base"
              />
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-12 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                onClick={onScrollToWaitlist}
              >
                {content.hero.ctaPrimary}
              </Button>
            </motion.div>
            
            {/* Social Proof */}
            <motion.div 
              className="text-center lg:text-left mb-6"
              variants={fadeInUp}
            >
              <p className="text-sm text-muted-foreground mb-2">Join 2,847+ homeowners already protected</p>
              <div className="flex justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full border-2 border-background flex items-center justify-center text-xs text-white font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              variants={fadeInUp}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-border text-foreground hover:bg-secondary px-6 py-3 transition-all duration-300"
                onClick={() => trackCTAClick('secondary', 'See How It Works', 'hero', variant)}
                asChild
              >
                <Link href="/v1/survey">{content.hero.ctaSecondary}</Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No credit card required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Mobile Mockup - More Urgent/Protective Feel */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Mobile Mockup Container */}
            <div className="relative w-full max-w-lg">
              {/* Floating Security Icons around mobile area */}
              <motion.div 
                className="absolute -top-8 -left-8 w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Shield className="w-6 h-6 text-destructive" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -right-12 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Clock className="w-5 h-5 text-primary" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-1/4 -left-12 w-11 h-11 bg-success/10 rounded-xl flex items-center justify-center"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 8, 0]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Cloud className="w-5 h-5 text-success" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-8 -right-8 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                animate={{ 
                  y: [0, 18, 0],
                  rotate: [0, -3, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <Download className="w-5 h-5 text-primary" />
              </motion.div>
              
              <motion.div 
                className="absolute top-1/3 -right-16 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center"
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 6, 0]
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <DollarSign className="w-6 h-6 text-accent" />
              </motion.div>

              {/* Three Phone Mockups */}
              <div className="relative flex justify-center items-center">
                {/* 1st Phone - Left (Alert/Warning State) */}
                <motion.div 
                  className="absolute -left-16 top-8 w-48 h-96 bg-gradient-to-b from-card/90 to-card/70 rounded-[2rem] border-6 border-gray-700 shadow-xl overflow-hidden z-10"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [-5, -2, -5]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-destructive/10 to-background rounded-[1.2rem] p-3 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span>9:41</span>
                      <span>100%</span>
                    </div>
                    
                    {/* Alert State */}
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mb-3">
                        <Shield className="w-8 h-8 text-destructive" />
                      </div>
                      <h4 className="font-medium text-foreground text-sm mb-1">Unprotected Items</h4>
                      <p className="text-xs text-muted-foreground text-center mb-4">127 items at risk</p>
                      
                      <div className="w-full bg-destructive/10 rounded-lg p-2 text-center">
                        <span className="text-xs font-medium text-destructive">Start Protection</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 2nd Phone - Right (Protected State) */}
                <motion.div 
                  className="absolute -right-16 top-8 w-48 h-96 bg-gradient-to-b from-card/90 to-card/70 rounded-[2rem] border-6 border-gray-700 shadow-xl overflow-hidden z-10"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [5, 8, 5]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-success/10 to-background rounded-[1.2rem] p-3 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span>9:41</span>
                      <span>100%</span>
                    </div>
                    
                    {/* Protected State */}
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                      <h4 className="font-medium text-foreground text-sm mb-1">Fully Protected</h4>
                      <p className="text-xs text-muted-foreground text-center mb-4">$47,892 covered</p>
                      
                      <div className="w-full space-y-2">
                        <div className="bg-success/10 rounded-lg p-2 flex items-center justify-center gap-2">
                          <Download className="w-4 h-4 text-success" />
                          <span className="text-xs font-medium text-success">Insurance Ready</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="bg-secondary/50 rounded p-1 text-center">
                            <Tag className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                            <span className="text-xs text-muted-foreground">Items</span>
                          </div>
                          <div className="bg-secondary/50 rounded p-1 text-center">
                            <Cloud className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                            <span className="text-xs text-muted-foreground">Backup</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 3rd Phone - Center (Active Scanning with Urgency) */}
                <div className="relative w-72 h-[580px] bg-gradient-to-b from-card to-card/95 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden z-20">
                  <div className="w-full h-full bg-gradient-to-b from-background to-background/95 rounded-[1.5rem] p-4 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-6 text-xs text-muted-foreground">
                      <span className="font-medium">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-muted-foreground/40 rounded-sm"></div>
                        <div className="w-4 h-2 bg-muted-foreground/40 rounded-sm"></div>
                        <div className="w-4 h-2 bg-muted-foreground/40 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Header with Urgency */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-base">S</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground text-lg">StuffScope</span>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                          <span className="text-xs text-success">Protecting</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Scanner View with Hall Image */}
                    <div className="flex-1 bg-gray-900 rounded-2xl overflow-hidden relative mb-6">
                      {/* Camera viewfinder overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10"></div>
                      
                      {/* Hall/Room actual image */}
                      <div className="w-full h-full relative overflow-hidden">
                        <Image
                          src="/assets/hall.webp"
                          alt="Room protection scanning"
                          fill
                          className="object-cover"
                          priority
                        />
                        
                        {/* Urgent scanning overlay */}
                        <motion.div 
                          className="absolute inset-0 border-2 border-primary/70 rounded-2xl z-20"
                          animate={{ 
                            opacity: [0.5, 1, 0.5],
                            scale: [0.99, 1, 0.99]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        
                        {/* Detection points with values */}
                        <motion.div 
                          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg mb-2"></div>
                          <div className="bg-primary text-white text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap font-medium">
                            Frame - $89
                          </div>
                        </motion.div>

                        <motion.div 
                          className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 z-30"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.8 }}
                        >
                          <div className="w-3 h-3 bg-accent rounded-full border-2 border-white shadow-lg mb-2"></div>
                          <div className="bg-accent text-white text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap font-medium">
                            Table - $245
                          </div>
                        </motion.div>

                        <motion.div 
                          className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 z-30"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 2.4 }}
                        >
                          <div className="w-3 h-3 bg-success rounded-full border-2 border-white shadow-lg mb-2"></div>
                          <div className="bg-success text-white text-xs px-3 py-1 rounded-full shadow-lg whitespace-nowrap font-medium">
                            Chair - $156
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Scanning progress with value */}
                      <div className="absolute bottom-4 left-4 right-4 z-40">
                        <div className="bg-black/60 backdrop-blur-md rounded-xl p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <motion.div
                                className="w-3 h-3 bg-primary rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                              <span className="text-white text-sm font-medium">Protecting...</span>
                            </div>
                            <span className="text-white text-sm font-bold">$490 found</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-2">
                            <motion.div 
                              className="bg-primary h-2 rounded-full"
                              animate={{ width: ["20%", "85%", "20%"] }}
                              transition={{ duration: 4, repeat: Infinity }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom capture button with urgency */}
                    <div className="flex justify-center">
                      <motion.div 
                        className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg"
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          boxShadow: [
                            "0 10px 25px rgba(59, 130, 246, 0.3)",
                            "0 10px 35px rgba(59, 130, 246, 0.5)",
                            "0 10px 25px rgba(59, 130, 246, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
