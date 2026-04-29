import Link from "next/link";
import { Shield, Lock, Eye, Globe, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-foreground/50 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ai-gradient">Privacy Policy</h1>
          <p className="text-foreground/50 text-lg">Last updated: April 29, 2026</p>
        </header>

        <div className="space-y-12">
          <section className="bg-surface border border-border p-8 rounded-3xl">
            <div className="flex items-center space-x-3 mb-6 text-primary">
              <Shield className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-foreground">Our Commitment</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              At Inboox AI, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our AI-powered email assistant. We are committed to maintaining the trust and confidence of our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Lock className="w-5 h-5 text-primary" />
              <span>1. Information We Collect</span>
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>We collect information that you provide directly to us:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, and password when you register.</li>
                <li><strong>Email Content:</strong> The text of emails you paste into our tool for processing. Note: We do not store your email content permanently; it is processed in-memory to generate replies.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our service (e.g., features used, time spent).</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Eye className="w-5 h-5 text-primary" />
              <span>2. How We Use Your Information</span>
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our AI email assistance service.</li>
                <li>To generate high-quality email replies using our AI models.</li>
                <li>To manage your account and subscription.</li>
                <li>To improve and personalize your experience with Inboox AI.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Globe className="w-5 h-5 text-primary" />
              <span>3. Data Sharing and Third Parties</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              We do not sell your personal data. We share information only with trusted third-party service providers (like AI model providers) solely for the purpose of delivering our service. These providers are bound by strict confidentiality agreements.
            </p>
          </section>

          <section className="p-8 bg-primary/5 border border-primary/10 rounded-3xl">
            <h2 className="text-xl font-bold mb-4 text-foreground">Contact Us</h2>
            <p className="text-foreground/70">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@inbooxai.com" className="text-primary font-bold hover:underline">privacy@inbooxai.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
