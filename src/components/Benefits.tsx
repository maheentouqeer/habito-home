import { Shield, Clock, PiggyBank, HeartHandshake } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: PiggyBank,
      title: "100% free service",
      description: "We're paid by the lender, not you. Our advice is always free.",
    },
    {
      icon: Shield,
      title: "FCA regulated",
      description: "We're fully authorised and regulated by the Financial Conduct Authority.",
    },
    {
      icon: Clock,
      title: "Save precious time",
      description: "No more branch visits or paperwork. Do everything online, when it suits you.",
    },
    {
      icon: HeartHandshake,
      title: "Human support",
      description: "Real mortgage experts available 7 days a week via chat, phone or email.",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-teal-light text-teal font-medium text-sm mb-4">
              Why Habito
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              The smarter way to get a mortgage
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              We're on a mission to make mortgages simple. No jargon, no hidden fees, 
              just honest advice and the best rates from over 90 lenders.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon size={24} className="text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="relative">
            <div className="bg-card rounded-3xl shadow-lg p-10">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Trusted by thousands
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 rounded-2xl bg-coral-light">
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">90+</p>
                  <p className="text-primary/80 font-medium">Lenders compared</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-teal-light">
                  <p className="text-4xl md:text-5xl font-bold text-teal mb-2">£8bn</p>
                  <p className="text-teal/80 font-medium">Mortgages arranged</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-secondary">
                  <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">4.9★</p>
                  <p className="text-muted-foreground font-medium">Trustpilot rating</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-secondary">
                  <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">15min</p>
                  <p className="text-muted-foreground font-medium">Average decision</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face" 
                    alt="Customer" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-foreground italic">
                      "Habito made buying our first home so much easier. Highly recommend!"
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">— Sarah T., First-time buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-teal/10 rounded-full blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
