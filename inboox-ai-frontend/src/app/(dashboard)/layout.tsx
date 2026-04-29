"use client";

import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Top Bar */}
      <header className="lg:hidden h-16 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <Link href="/" className="flex items-center space-x-2 text-ai-gradient font-bold">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>Inboox AI</span>
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-surface-light text-foreground/60"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar - Desktop & Mobile Overlay */}
      <div className={`${isSidebarOpen ? "block" : "hidden"} lg:block`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>

      <div className="lg:pl-64">
        <main className="p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

