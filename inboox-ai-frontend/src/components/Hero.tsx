"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 blur-[120px] pointer-events-none">
        <div className="absolute inset-0 bg-primary rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute inset-0 bg-secondary rounded-full -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-surface-light px-4 py-2 rounded-full border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Email Assistant</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Write Perfect Email <br className="hidden md:block" />
            <span className="text-ai-gradient">Replies in Seconds</span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-foreground/70 mb-10 leading-relaxed"
          >
            AI-powered replies for any situation. Experience effortless mastery over your inbox with our sophisticated productivity partner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-ai-gradient text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-xl shadow-primary/25 group"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#how-it-works"
              className="w-full sm:w-auto bg-surface-light border border-border px-8 py-4 rounded-xl font-semibold hover:bg-border transition-colors text-center"
            >
              How it works
            </Link>
          </motion.div>
        </div>

        {/* Mockup Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="bg-surface rounded-2xl border border-border shadow-2xl p-4 md:p-8 relative overflow-hidden group">
            <div className="flex items-center space-x-2 mb-6 border-b border-border pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-sm font-medium text-foreground/50 uppercase tracking-wider">Incoming Email</div>
                <div className="bg-surface-light p-4 rounded-xl border border-border italic text-foreground/80">
                  "Hi there, we've been reviewing the latest project proposal and we're concerned about the timeline. Can we push the deadline by two weeks?"
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-medium text-foreground/50 uppercase tracking-wider">AI Suggested Reply</div>
                <div className="bg-primary/10 p-4 rounded-xl border border-primary/20 text-foreground/90 animate-pulse">
                  Subject: Project Proposal Timeline Update<br/><br/>
                  Dear Client, thank you for sharing your concerns. Adjusting the deadline by two weeks is feasible...
                </div>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
