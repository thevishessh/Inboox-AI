"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-ai-gradient">
              Inboox AI
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How it works</Link>
            <Link href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/login" className="text-foreground/70 hover:text-foreground transition-colors">Login</Link>
            <Link 
              href="/signup" 
              className="bg-ai-gradient text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground/70"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-border animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="#features" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-foreground/70 hover:text-primary">Features</Link>
            <Link href="#how-it-works" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-foreground/70 hover:text-primary">How it works</Link>
            <Link href="#pricing" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-foreground/70 hover:text-primary">Pricing</Link>
            <Link href="/login" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-foreground/70 hover:text-primary">Login</Link>
            <Link 
              href="/signup" 
              onClick={() => setIsOpen(false)}
              className="block mx-4 mt-4 bg-ai-gradient text-white px-6 py-4 rounded-xl text-center font-bold"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

