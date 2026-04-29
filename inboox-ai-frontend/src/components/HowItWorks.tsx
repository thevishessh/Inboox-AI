export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Paste Email",
      description: "Simply copy and paste the email you need to respond to into our smart input field.",
    },
    {
      number: "02",
      title: "Select Tone",
      description: "Choose from a variety of preset moods or describe your custom intent to guide the AI.",
    },
    {
      number: "03",
      title: "Generate Reply",
      description: "Review the perfectly drafted response and hit send. It's really that simple.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-foreground/60">Three steps to inbox zero.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-foreground/60 leading-relaxed max-w-[250px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
