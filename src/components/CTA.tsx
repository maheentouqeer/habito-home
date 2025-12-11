import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="relative bg-primary rounded-[2.5rem] p-10 md:p-16 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-coral-dark/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-coral-dark/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to find your perfect mortgage?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
              Join thousands of happy homeowners who've found their best mortgage deal with Habito. 
              It only takes a few minutes to get started.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full shadow-lg hover:shadow-xl group"
              >
                Get your free quote
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="ghost"
                size="xl"
                className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full border-2 border-primary-foreground/30"
              >
                Talk to an expert
              </Button>
            </div>

            <p className="text-primary-foreground/60 text-sm mt-8">
              No credit check required • Takes less than 10 minutes • 100% free
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
