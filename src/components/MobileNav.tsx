"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/learn", label: "Learn" },
  { href: "#features", label: "Features" },
  { href: "#benefits", label: "Benefits" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — mobile only */}
      <button
        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-md border-b border-gray-800 py-4 px-4 z-50">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-800 mt-2 pt-3 flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="px-4 py-3 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-lg font-medium transition-colors text-center"
              >
                Launch App
              </Link>
              <Link
                href="#pricing"
                onClick={() => setOpen(false)}
                className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
