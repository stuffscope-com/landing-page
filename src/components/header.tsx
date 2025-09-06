"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  showBackButton?: boolean;
  backHref?: string;
  title?: string;
}

export function Header({ showBackButton = false, backHref = "/", title }: HeaderProps) {
  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Link 
                href={backHref}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">Back</span>
              </Link>
            )}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg text-foreground">
                StuffScope
              </span>
            </Link>
          </div>
          
          {title && (
            <h1 className="text-lg font-medium text-foreground hidden sm:block">
              {title}
            </h1>
          )}
        </div>
      </div>
    </motion.header>
  );
}
