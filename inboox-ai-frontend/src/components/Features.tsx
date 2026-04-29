import { Brain, Sliders, Zap } from "lucide-react";

const features = [
  {
    title: "Smart AI Replies",
    description: "Context-aware generation that understands the nuances of your threads instantly.",
    icon: Brain,
    color: "text-blue-500",
  },
  {
    title: "Tone Customization",
    description: "Switch between professional, friendly, or urgent tones with a single click to match your brand voice.",
    icon: Sliders,
    color: "text-purple-500",
  },
  {
    title: "Fast & Accurate",
    description: "Engineered for speed and precision, ensuring you never send a message you'll regret.",
    icon: Zap,
    color: "text-amber-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-surface-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ai-gradient">Master Your Communication</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Our AI is designed to handle the heavy lifting, giving you more time to focus on what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-surface border border-border p-8 rounded-2xl hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-surface-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
