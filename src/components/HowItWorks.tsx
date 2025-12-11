import { FileText, Search, MessageCircle, Home } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Tell us about you",
      description: "Answer a few simple questions about your situation and what you're looking for.",
      color: "bg-coral-light text-primary",
    },
    {
      icon: Search,
      title: "We find your best deals",
      description: "We search over 90 lenders to find mortgages that match your needs.",
      color: "bg-teal-light text-teal",
    },
    {
      icon: MessageCircle,
      title: "Get expert advice",
      description: "Chat with our mortgage experts who'll guide you through your options.",
      color: "bg-secondary text-foreground",
    },
    {
      icon: Home,
      title: "Get your keys",
      description: "We handle the paperwork and keep you updated until completion.",
      color: "bg-coral-light text-primary",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-coral-light text-primary font-medium text-sm mb-4">
            How it works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Getting a mortgage shouldn't be stressful
          </h2>
          <p className="text-lg text-muted-foreground">
            We've made it simple. Four easy steps to your dream home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
              )}
              
              <div className="relative bg-card rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group-hover:-translate-y-2 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <step.icon size={24} />
                  </div>
                  <span className="text-5xl font-bold text-border group-hover:text-primary/20 transition-colors">
                    {index + 1}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
