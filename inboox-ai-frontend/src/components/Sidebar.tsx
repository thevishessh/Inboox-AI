"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  History, 
  FileStack, 
  Settings, 
  LogOut,
  Sparkles,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: History, label: "History", href: "/history" },
  { icon: FileStack, label: "Templates", href: "/templates" },
  { icon: CreditCard, label: "Pricing", href: "/pricing" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border h-screen flex flex-col bg-surface fixed left-0 top-0 z-50 lg:z-40">
      <div className="p-6">
        <Link 
          href="/" 
          onClick={onClose}
          className="text-2xl font-bold text-ai-gradient flex items-center space-x-2"
        >
          <Sparkles className="w-6 h-6 text-primary" />
          <span>Inboox AI</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-foreground/60 hover:bg-surface-light hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "group-hover:text-foreground")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>


      <div className="p-4 border-t border-border">
        <div className="bg-surface-light p-4 rounded-xl mb-4">
          <div className="text-xs text-foreground/40 uppercase tracking-wider mb-2">Current Plan</div>
          <div className="font-bold flex items-center justify-between">
            <span>Pro Plan</span>
            <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full">Active</span>
          </div>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-foreground/60 hover:bg-red-500/10 hover:text-red-500 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}
