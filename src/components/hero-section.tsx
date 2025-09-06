"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Camera, 
  Tag, 
  DollarSign, 
  Download, 
  Cloud,
  CheckCircle
} from "lucide-react";
import { getContent } from "@/lib/content";
import Link from "next/link";

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

interface HeroSectionProps {
  onScrollToWaitlist: () => void;
}

export function HeroSection({ onScrollToWaitlist }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-[90vh] flex items-center">
      {/* Orbital Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large orbital rings */}
        <motion.div 
          className="absolute top-1/4 -right-32 w-96 h-96 border border-primary/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-32 w-80 h-80 border border-accent/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
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
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight"
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
            
            {/* Email Capture */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 mb-6 max-w-md mx-auto lg:mx-0"
              variants={fadeInUp}
            >
              <Input 
                type="email" 
                placeholder="Enter your email" 
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
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              variants={fadeInUp}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="border-border text-foreground hover:bg-secondary px-6 py-3 transition-all duration-300"
                asChild
              >
                <Link href="/survey">{content.hero.ctaSecondary}</Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>No app download required</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Mobile Mockup */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Mobile Mockup Container */}
            <div className="relative w-full max-w-lg">
              {/* Floating Icons around mobile area */}
              <motion.div 
                className="absolute -top-8 -left-8 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Camera className="w-6 h-6 text-primary" />
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -right-12 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center"
                animate={{ 
                  y: [0, 12, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Tag className="w-5 h-5 text-accent" />
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
                {/* 1st Phone - Left (Start Scanning) - 10% behind */}
                <motion.div 
                  className="absolute -left-16 top-8 w-48 h-96 bg-gradient-to-b from-card/90 to-card/70 rounded-[2rem] border-6 border-gray-700 shadow-xl overflow-hidden z-10"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [-5, -2, -5]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full bg-gradient-to-b from-primary/10 to-background rounded-[1.2rem] p-3 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between text-xs text-muted-foreground mb-3">
                      <span>9:41</span>
                      <span>100%</span>
                    </div>
                    
                    {/* App Header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                      <span className="font-medium text-foreground text-sm">StuffScope</span>
                    </div>
                    
                    {/* Scan Button */}
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-medium text-foreground text-sm mb-1">Start Scanning</h4>
                      <p className="text-xs text-muted-foreground text-center">Point camera at room</p>
                    </div>
                  </div>
                </motion.div>

                {/* 2nd Phone - Right (Scan Complete) - 10% behind */}
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
                    
                    {/* Success State */}
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="w-8 h-8 text-success" />
                      </div>
                      <h4 className="font-medium text-foreground text-sm mb-1">Scan Complete</h4>
                      <p className="text-xs text-muted-foreground text-center mb-4">47 items detected</p>
                      
                      {/* Action Buttons */}
                      <div className="w-full space-y-2">
                        <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center gap-2">
                          <Download className="w-4 h-4 text-primary" />
                          <span className="text-xs font-medium text-primary">Download Report</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <div className="bg-secondary/50 rounded p-1 text-center">
                            <Tag className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                            <span className="text-xs text-muted-foreground">Items</span>
                          </div>
                          <div className="bg-secondary/50 rounded p-1 text-center">
                            <Cloud className="w-3 h-3 text-muted-foreground mx-auto mb-1" />
                            <span className="text-xs text-muted-foreground">Sync</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 3rd Phone - Center (Scanner View with Hall Image) - Main */}
                <div className="relative w-64 h-[520px] bg-gradient-to-b from-card to-card/90 rounded-[2.5rem] border-8 border-gray-800 shadow-2xl overflow-hidden z-20">
                  <div className="w-full h-full bg-gradient-to-b from-primary/5 to-background rounded-[1.5rem] p-4 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-muted-foreground/30 rounded-sm"></div>
                        <div className="w-4 h-2 bg-muted-foreground/30 rounded-sm"></div>
                        <div className="w-4 h-2 bg-muted-foreground/30 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                      </div>
                      <span className="font-semibold text-foreground">StuffScope</span>
                    </div>
                    
                    {/* Scanner View with Hall Image */}
                    <div className="flex-1 bg-gray-900 rounded-xl overflow-hidden relative">
                      {/* Camera viewfinder overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
                      
                      {/* Hall/Room placeholder image */}
                      <div className="w-full h-full bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 relative">
                        {/* Room elements placeholder */}
                        <div className="absolute top-4 left-4 w-8 h-6 bg-amber-800/20 rounded-sm"></div> {/* Door */}
                        <div className="absolute top-1/3 right-6 w-12 h-8 bg-amber-700/30 rounded"></div> {/* Furniture */}
                        <div className="absolute bottom-1/4 left-1/3 w-6 h-4 bg-amber-600/25 rounded-sm"></div> {/* Object */}
                        <div className="absolute bottom-6 right-8 w-10 h-6 bg-amber-800/20 rounded"></div> {/* Furniture */}
                        
                        {/* Scanning overlay */}
                        <motion.div 
                          className="absolute inset-0 border-2 border-primary/50 rounded-lg"
                          animate={{ 
                            opacity: [0.3, 0.8, 0.3],
                            scale: [0.95, 1, 0.95]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        
                        {/* Detection points */}
                        <motion.div 
                          className="absolute top-1/3 right-6 w-3 h-3 bg-primary rounded-full"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-accent rounded-full"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                        />
                        <motion.div 
                          className="absolute bottom-6 right-8 w-3 h-3 bg-success rounded-full"
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 1.4 }}
                        />
                      </div>
                      
                      {/* Scanning progress */}
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-medium">Scanning...</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <motion.div 
                              className="bg-primary h-1 rounded-full"
                              animate={{ width: ["0%", "75%", "0%"] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom capture button */}
                    <div className="mt-4 flex justify-center">
                      <motion.div 
                        className="w-16 h-16 bg-primary rounded-full flex items-center justify-center"
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-primary rounded-full"></div>
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
