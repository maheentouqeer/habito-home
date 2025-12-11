const Footer = () => {
  const footerLinks = {
    "Mortgages": [
      "First-time buyers",
      "Remortgaging",
      "Moving home",
      "Buy-to-let",
    ],
    "Company": [
      "About us",
      "Careers",
      "Press",
      "Blog",
    ],
    "Support": [
      "Help centre",
      "Contact us",
      "Complaints",
      "Accessibility",
    ],
    "Legal": [
      "Privacy policy",
      "Terms of use",
      "Cookie policy",
      "FSCS protection",
    ],
  };

  return (
    <footer className="bg-foreground text-background py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold">habito</span>
            </div>
            <p className="text-background/60 mb-6 max-w-sm">
              The UK's best online mortgage broker. We're on a mission to make mortgages simple.
            </p>
            <div className="flex gap-4">
              {["twitter", "linkedin", "facebook", "instagram"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-background/60 rounded" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-background/60 hover:text-background transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between gap-6 text-sm text-background/40">
            <p>© 2024 Habito. All rights reserved.</p>
            <p className="max-w-2xl">
              Habito is a trading name of Habito Ltd, registered in England and Wales (No. 09365568). 
              Authorised and regulated by the Financial Conduct Authority (FCA No. 764697).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
