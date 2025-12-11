import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
  const benefits = [
    "100% free mortgage advice",
    "Compare 90+ lenders",
    "Expert support 7 days a week",
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-coral-light/30 rounded-bl-[100px] -z-10" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10 animate-float" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral-light text-primary font-medium text-sm mb-6 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              The UK's best online mortgage broker
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Find your{" "}
              <span className="text-gradient">perfect mortgage</span>{" "}
              in minutes
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              We search over 90 lenders to find you the best mortgage deal. 
              Expert advice, zero fees, done entirely online.
            </p>

            {/* Benefits */}
            <ul className="space-y-3 mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-accent-foreground" />
                  </div>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button variant="hero" size="lg" className="group">
                Get your free quote
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="heroOutline" size="lg">
                Learn more
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 mt-10 pt-10 border-t border-border animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-sm font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Rated excellent by 10,000+ customers</p>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:pl-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main card */}
              <div className="bg-card rounded-3xl shadow-lg p-8 relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold text-foreground">Your mortgage estimate</h3>
                  <span className="px-3 py-1 rounded-full bg-teal-light text-teal text-sm font-medium">Best rate</span>
                </div>
                
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-secondary">
                    <p className="text-sm text-muted-foreground mb-1">Property value</p>
                    <p className="text-2xl font-bold text-foreground">£350,000</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-secondary">
                    <p className="text-sm text-muted-foreground mb-1">Deposit</p>
                    <p className="text-2xl font-bold text-foreground">£35,000</p>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-coral-light">
                    <p className="text-sm text-primary mb-1">Monthly payment from</p>
                    <p className="text-3xl font-bold text-primary">£1,247</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-teal text-accent-foreground px-4 py-2 rounded-xl shadow-md font-medium text-sm animate-float">
                4.2% APR
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card shadow-lg rounded-2xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Approved!</p>
                  <p className="text-sm text-muted-foreground">In just 15 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
