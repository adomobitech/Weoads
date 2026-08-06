"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full relative z-50 bg-[#FAFBFF] anim-nav-in">
      <style>{`
        @keyframes navIn {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes ctaGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.35), 0 10px 15px -3px rgba(99,102,241,0.2); }
          50% { box-shadow: 0 0 0 7px rgba(79, 70, 229, 0), 0 10px 15px -3px rgba(99,102,241,0.2); }
        }
        .anim-nav-in { animation: navIn 0.7s ease-out; }
        .nav-logo-anim { animation: logoBob 4s ease-in-out infinite; }
        .nav-cta-anim { animation: ctaGlow 2.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .anim-nav-in, .nav-logo-anim, .nav-cta-anim { animation: none !important; }
        }
      `}</style>

      {/* Main Navbar Container */}
      <div className="flex items-center justify-between py-4 px-6 md:px-12 relative min-h-[70px] md:min-h-[80px]">
        
        {/* LOGO */}
        <div className="flex-shrink-0 z-20 flex items-center cursor-pointer group">
          <Link href="/">
            <div className="relative w-40 h-14 md:w-48 md:h-14 lg:w-56 lg:h-16 nav-logo-anim transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="WeoAds Logo"
                fill
                className="object-contain object-left mix-blend-multiply"
                priority
              />
            </div>
          </Link>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden lg:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-gray-600">
          <li className="text-indigo-600 border-b-2 border-indigo-600 pb-1 cursor-pointer"><Link href="/">Home</Link></li>
          <li className="relative pb-1 cursor-pointer transition-colors duration-300 hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full">Advertisers</li>
          <li className="relative pb-1 cursor-pointer transition-colors duration-300 hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full">Publishers</li>
          <li className="relative pb-1 cursor-pointer transition-colors duration-300 hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full">Services ▾</li>
          <li className="relative pb-1 cursor-pointer transition-colors duration-300 hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full">Resources ▾</li>
          <li className="relative pb-1 cursor-pointer transition-colors duration-300 hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full">Company ▾</li>
          <li className="relative pb-1 cursor-pointer transition-colors duration-300 hover:text-indigo-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full">
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center gap-3 lg:border-l lg:border-gray-200 lg:pl-6 z-10">
          <button className="text-sm font-semibold text-gray-800 transition-all duration-300 hover:text-indigo-600 hover:-translate-y-0.5 whitespace-nowrap">
            Log In
          </button>
          <button className="nav-cta-anim bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 hover:scale-105 active:scale-95 whitespace-nowrap">
            Get Started →
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <div className="flex lg:hidden z-20">
          <button 
            className="text-gray-800 p-2 focus:outline-none transition-transform hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div className={`lg:hidden absolute w-full bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'max-h-[600px] opacity-100 py-6 scale-y-100' : 'max-h-0 opacity-0 overflow-hidden py-0 scale-y-0'}`}>
        <ul className="flex flex-col items-center gap-5 text-sm font-semibold text-gray-600 pb-2">
          <li className="text-indigo-600 cursor-pointer text-base" onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors text-base">Advertisers</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors text-base">Publishers</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors text-base">Services</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors text-base">Resources</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors text-base">Company</li>
          <li className="hover:text-indigo-600 cursor-pointer transition-colors text-base" onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/contact">Contact Us</Link>
          </li>
          
          <li className="w-full border-t border-gray-100 pt-6 mt-4 flex flex-col items-center gap-4 px-8">
            <button className="text-gray-800 font-bold hover:text-indigo-600 transition-colors w-full py-2">
              Log In
            </button>
            <button className="bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold w-full shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              Get Started <span>→</span>
            </button>
          </li>
        </ul>
      </div>

    </nav>
  );
}