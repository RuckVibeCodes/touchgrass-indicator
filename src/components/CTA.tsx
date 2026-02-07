export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative p-12 bg-card-bg border border-card-border rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
          
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Improve Your <span className="text-gradient">Trading Results</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join 10,000+ traders who trust TouchGrass for accurate signals and
              profitable trades. Start your 14-day free trial today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#pricing"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-green"
              >
                Start Free Trial
              </a>
              <a
                href="#faq"
                className="w-full sm:w-auto px-8 py-4 border border-card-border text-foreground rounded-xl font-semibold text-lg hover:border-primary/50 transition-colors"
              >
                Learn More
              </a>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              No credit card required • 14-day money-back guarantee • Instant access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
