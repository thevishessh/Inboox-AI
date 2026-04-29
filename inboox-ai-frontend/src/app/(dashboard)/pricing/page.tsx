"use client";

import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual users.",
    features: ["5 AI generations/month", "Standard support", "Basic tones"],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "Best for busy professionals.",
    features: ["Unlimited AI generations", "Priority support", "All tones & custom tones", "History tracking"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and organizations.",
    features: ["Custom AI training", "Dedicated account manager", "API access", "SSO & Security"],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-foreground/50">Choose the plan that fits your needs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "bg-surface border p-8 rounded-3xl flex flex-col relative overflow-hidden",
              plan.popular ? "border-primary shadow-2xl shadow-primary/10 ring-2 ring-primary/20" : "border-border"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline space-x-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && <span className="text-foreground/40">/month</span>}
              </div>
              <p className="text-foreground/60 text-sm mt-4">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-3 text-sm text-foreground/80">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={cn(
              "w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2",
              plan.popular 
                ? "bg-ai-gradient text-white shadow-lg shadow-primary/20 hover:opacity-90" 
                : "bg-surface-light border border-border hover:bg-border"
            )}>
              {plan.popular && <Zap className="w-4 h-4 fill-current" />}
              <span>{plan.cta}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
