import Link from "next/link";
import { Globe, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-border bg-surface-light/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-ai-gradient mb-6 block">
              Inboox AI
            </Link>
            <p className="text-foreground/60 max-w-sm mb-8 leading-relaxed">
              Effortless mastery for professionals. Turn hours of email drafting into seconds of pure productivity.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 rounded-full bg-surface hover:bg-surface-light transition-colors">
                <Globe className="w-5 h-5 text-foreground/70" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-surface hover:bg-surface-light transition-colors">
                <Mail className="w-5 h-5 text-foreground/70" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-foreground/60">
              <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it works</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-foreground/60">
              <li><Link href="/privacy" className="flex items-center space-x-2 hover:text-primary transition-colors"><Shield className="w-4 h-4" /> <span>Privacy Policy</span></Link></li>
              <li><Link href="/terms" className="flex items-center space-x-2 hover:text-primary transition-colors"><FileText className="w-4 h-4" /> <span>Terms of Service</span></Link></li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border text-foreground/40 text-sm">
          © {new Date().getFullYear()} Inboox AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
