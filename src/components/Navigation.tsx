'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  Video,
  Menu,
  X,
  Crown,
  Radar,
  Radio,
  Sparkles,
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // TODO: Replace with Clerk auth when added
  const isSignedIn = true; // Placeholder
  // Using state/props pattern to satisfy TypeScript
  const userTier = 'free' as 'free' | 'pro'; // Placeholder - will be from user metadata

  // Define navigation items with feature gates
  const navItems = [
    {
      name: 'AI Analysis',
      href: '/dashboard',
      icon: LayoutDashboard,
      locked: false,
    },
    {
      name: 'Degen Radar',
      href: '/degen-radar',
      icon: Radar,
      locked: false,
    },
    {
      name: 'Signals',
      href: '/signals',
      icon: Radio,
      locked: userTier === 'free',
    },
    {
      name: 'Daily Briefing',
      href: '/daily-briefing',
      icon: CalendarDays,
      locked: false, // Free can see preview
    },
    {
      name: 'Journal',
      href: '/journal',
      icon: BookOpen,
      locked: userTier === 'free',
    },
    {
      name: 'Video Analysis',
      href: '/video-analysis',
      icon: Video,
      locked: userTier === 'free',
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-lg">
              🌿
            </div>
            <span className="text-xl font-bold text-white">TouchGrass</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.locked ? '#' : item.href}
                  onClick={(e) => {
                    if (item.locked) {
                      e.preventDefault();
                      // TODO: Show upgrade modal
                    }
                  }}
                  className={`
                    flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive(item.href) && !item.locked
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : item.locked
                        ? 'text-gray-500 cursor-not-allowed'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  {item.locked && <Crown className="w-3 h-3 text-yellow-400" />}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Tier Badge */}
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                userTier === 'pro'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900'
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              {userTier === 'pro' ? '👑 PRO' : 'FREE'}
            </div>

            {/* Upgrade Button (shown to free users) */}
            {userTier === 'free' && (
              <Link
                href="/#pricing"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade
              </Link>
            )}

            {/* User Button Placeholder */}
            {isSignedIn ? (
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
                👤
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.locked ? '#' : item.href}
                  onClick={(e) => {
                    if (item.locked) {
                      e.preventDefault();
                    } else {
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium
                    ${
                      isActive(item.href) && !item.locked
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : item.locked
                        ? 'text-gray-500'
                        : 'text-gray-300 hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                  {item.locked && <Crown className="w-4 h-4 text-yellow-400 ml-auto" />}
                </Link>
              );
            })}

            {/* Mobile Upgrade Button */}
            {userTier === 'free' && (
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-base font-medium mt-4"
              >
                <Sparkles className="w-5 h-5" />
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
