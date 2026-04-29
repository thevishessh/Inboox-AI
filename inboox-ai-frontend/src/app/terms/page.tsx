import Link from "next/link";
import { FileText, CheckCircle, AlertCircle, Scale, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ai-gradient">Terms of Service</h1>
          <p className="text-foreground/50 text-lg">Last updated: April 29, 2026</p>
        </header>

        <div className="space-y-12">
          <section className="bg-surface border border-border p-8 rounded-3xl">
            <div className="flex items-center space-x-3 mb-6 text-primary">
              <Scale className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-foreground">Agreement to Terms</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              By accessing or using Inboox AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>1. Use of Service</span>
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>You agree to use Inboox AI only for lawful purposes. You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials.</li>
                <li>Ensuring the accuracy of the information you provide.</li>
                <li>Complying with all applicable laws regarding data privacy and AI usage.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span>2. Prohibited Activities</span>
            </h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>You may not use our service to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate spam, phishing emails, or malicious content.</li>
                <li>Violate the intellectual property rights of others.</li>
                <li>Attempt to reverse engineer or disrupt the AI models.</li>
                <li>Circumvent subscription limits or payment requirements.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <FileText className="w-5 h-5 text-primary" />
              <span>3. Intellectual Property</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              The content you generate using Inboox AI belongs to you. However, the Inboox AI platform, its source code, and its branding are the exclusive property of Inboox AI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Scale className="w-5 h-5 text-primary" />
              <span>4. Limitation of Liability</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Inboox AI is provided "as is". While we strive for 100% accuracy, AI-generated content may occasionally contain errors. We are not liable for any damages resulting from the use of our generated content.
            </p>
          </section>

          <div className="p-8 bg-surface border border-border rounded-3xl text-center">
            <p className="text-foreground/50 mb-4 italic">Thank you for choosing Inboox AI for your professional productivity.</p>
            <Link href="/signup" className="text-primary font-bold hover:underline">Get Started with a Free Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
