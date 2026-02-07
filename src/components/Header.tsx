import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">TouchGrass</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-gray-400 hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#pricing"
              className="hidden sm:block px-4 py-2 text-primary hover:text-primary-dark transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="#pricing"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
