"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FooterProps {
  minimal?: boolean;
}

export function Footer({ minimal = false }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (minimal) {
    return (
      <motion.footer 
        className="border-t border-border bg-card/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="font-medium text-foreground">StuffScope</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} StuffScope. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    );
  }

  return (
    <motion.footer 
      className="border-t border-border bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg text-foreground">
                StuffScope
              </span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The smarter way to catalog what matters most. Instantly scan, document, and organize your belongings with AI-powered precision.
            </p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} StuffScope. All rights reserved.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/survey" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Survey
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                  Features (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                  Pricing (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                  About (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                  Blog (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                  Privacy (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/50 cursor-not-allowed">
                  Terms (Coming Soon)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for homeowners, renters, and small business owners.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground bg-accent/10 px-2 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
