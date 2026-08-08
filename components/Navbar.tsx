"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  // Helper to generate slug from title
  const createSlug = (title: string) => title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9 ]/g, '').trim().replace(/\s+/g, '-');

  // Mega Menu Data with slugs
  const digitalMarketingServices = [
    { title: "Search Engine Optimization", desc: "Rank higher and boost organic traffic.", icon: "🔍" },
    { title: "Search Engine Marketing", desc: "Targeted PPC campaigns for instant traffic.", icon: "🎯" },
    { title: "Social Media Marketing", desc: "Engage and build interactive social...", icon: "🔗" },
    { title: "Web Development", desc: "Custom, fast, and highly responsive web...", icon: "</>" },
    { title: "Content Marketing", desc: "Strategic content that educates and converts.", icon: "📄" },
    { title: "Affiliate Marketing", desc: "Expand your revenue channels with top...", icon: "👥" },
  ].map(s => ({ ...s, slug: createSlug(s.title) }));

  const promotionServices = [
    { title: "Mobile Marketing", desc: "Reach consumers directly on their mobile...", icon: "📱" },
    { title: "Influencer Marketing", desc: "Collaborate with trusted content creators.", icon: "✨" },
    { title: "SMS Marketing", desc: "Direct, high-open-rate instant text campaigns.", icon: "💬" },
    { title: "Email Marketing", desc: "Automated, personalized lifecycle flows.", icon: "✉️" },
    { title: "CRM Solutions", desc: "Optimize data to strengthen relationships.", icon: "🗄️" },
    { title: "CTV Ads Agency", desc: "Advertise premium spots on streaming TV...", icon: "📺" },
  ].map(s => ({ ...s, slug: createSlug(s.title) }));

  const solutionServices = [
    { title: "Online Reputation Management", desc: "Monitor, protect, and enhance your public...", icon: "🛡️" },
    { title: "Brand Strategy", desc: "Find your position, voice, and narrative insi...", icon: "🧭" },
    { title: "Lead Generation", desc: "Fill your pipeline with high-intent prospects.", icon: "⚡" },
    { title: "Customer Retention", desc: "Boost customer lifetime value and product...", icon: "❤️" },
    { title: "Digital Transformation", desc: "Integrate modern processes and legacy tec...", icon: "💻" },
    { title: "Market Research & Insights", desc: "Gain deep analysis to make informed...", icon: "📊" },
  ].map(s => ({ ...s, slug: createSlug(s.title) }));

  // Helper for active link detection
  const isActive = (path: string) => pathname === path;
  const isServiceActive = pathname.startsWith('/services');

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
          
          {/* Home */}
          <li className={`pb-1 cursor-pointer transition-colors duration-300 ${isActive('/') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}>
            <Link href="/">Home</Link>
          </li>
          
          {/* Advertisers */}
          <li className={`pb-1 cursor-pointer transition-colors duration-300 ${isActive('/advertisers') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}>
            <Link href="/advertisers">Advertisers</Link>
          </li>
          
          {/* Publishers */}
          <li className={`pb-1 cursor-pointer transition-colors duration-300 ${isActive('/publishers') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}>
            <Link href="/publishers">Publishers</Link>
          </li>
          
          {/* SERVICES DROPDOWN (MEGA MENU) */}
          <li 
            className={`relative pb-1 cursor-pointer group transition-colors duration-300 ${isServiceActive ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <span className="flex items-center gap-1 py-1">
              Services ▾
            </span>

            {/* Mega Menu Box */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[1160px] bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_25px_60px_rgba(79,70,229,0.12)] border border-indigo-50 p-8 grid grid-cols-3 gap-8 transition-all duration-300 origin-top z-50 ${
              isServicesOpen ? 'opacity-100 scale-100 pointer-events-auto visible' : 'opacity-0 scale-95 pointer-events-none invisible'
            }`}>
              
              {/* Column 1: Digital Marketing */}
              <div className="bg-gradient-to-b from-indigo-50/30 to-transparent p-5 rounded-2xl border border-indigo-50/50">
                <h4 className="text-[11px] font-extrabold text-indigo-600 tracking-wider uppercase mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 shadow-sm shadow-indigo-500"></span> DIGITAL MARKETING
                </h4>
                <div className="flex flex-col gap-4">
                  {digitalMarketingServices.map((item, idx) => (
                    <Link href={`/services/${item.slug}`} key={idx} onClick={() => setIsServicesOpen(false)} className="flex items-start gap-3.5 group/item cursor-pointer p-2.5 rounded-xl transition-all duration-200 hover:bg-white hover:shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-xl text-gray-700 shrink-0 group-hover/item:bg-indigo-600 group-hover/item:text-white group-hover/item:border-indigo-600 transition-all shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 group-hover/item:text-indigo-600 transition-colors">{item.title}</h5>
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: Promotions */}
              <div className="bg-gradient-to-b from-purple-50/30 to-transparent p-5 rounded-2xl border border-purple-50/50">
                <h4 className="text-[11px] font-extrabold text-purple-600 tracking-wider uppercase mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600 shadow-sm shadow-purple-500"></span> PROMOTIONS
                </h4>
                <div className="flex flex-col gap-4">
                  {promotionServices.map((item, idx) => (
                    <Link href={`/services/${item.slug}`} key={idx} onClick={() => setIsServicesOpen(false)} className="flex items-start gap-3.5 group/item cursor-pointer p-2.5 rounded-xl transition-all duration-200 hover:bg-white hover:shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-xl text-gray-700 shrink-0 group-hover/item:bg-purple-600 group-hover/item:text-white group-hover/item:border-purple-600 transition-all shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 group-hover/item:text-purple-600 transition-colors">{item.title}</h5>
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Solutions */}
              <div className="bg-gradient-to-b from-blue-50/30 to-transparent p-5 rounded-2xl border border-blue-50/50">
                <h4 className="text-[11px] font-extrabold text-blue-600 tracking-wider uppercase mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 shadow-sm shadow-blue-500"></span> SOLUTIONS
                </h4>
                <div className="flex flex-col gap-4">
                  {solutionServices.map((item, idx) => (
                    <Link href={`/services/${item.slug}`} key={idx} onClick={() => setIsServicesOpen(false)} className="flex items-start gap-3.5 group/item cursor-pointer p-2.5 rounded-xl transition-all duration-200 hover:bg-white hover:shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-xl text-gray-700 shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:border-blue-600 transition-all shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 group-hover/item:text-blue-600 transition-colors">{item.title}</h5>
                        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Banner inside Dropdown */}
              <div className="col-span-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 px-6 flex items-center justify-between text-white shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-xl">💡</span>
                  <div>
                    <h5 className="text-xs font-bold">Need a custom growth strategy for your brand?</h5>
                    <p className="text-[10px] text-indigo-100 font-medium">Talk to our performance marketing experts today.</p>
                  </div>
                </div>
                <Link href="/contact" onClick={() => setIsServicesOpen(false)} className="bg-white text-indigo-600 px-5 py-2 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors shadow-sm">
                  Get Free Audit &rarr;
                </Link>
              </div>

            </div>
          </li>

          {/* Resources */}
          <li className={`pb-1 cursor-pointer transition-colors duration-300 ${isActive('/resources') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}>
            <Link href="/resources">Resources ▾</Link>
          </li>
          
          {/* Company */}
          <li className={`pb-1 cursor-pointer transition-colors duration-300 ${isActive('/company') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}>
            <Link href="/company">Company ▾</Link>
          </li>
          
          {/* Contact Us */}
          <li className={`pb-1 cursor-pointer transition-colors duration-300 ${isActive('/contact') ? 'text-indigo-600 border-b-2 border-indigo-600' : 'border-b-2 border-transparent hover:text-indigo-600'}`}>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:flex items-center z-10">
          <Link href="/contact" className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all">
            Get Started →
          </Link>
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
      <div className={`lg:hidden absolute w-full bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-100 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'max-h-[800px] overflow-y-auto opacity-100 py-6 scale-y-100' : 'max-h-0 opacity-0 overflow-hidden py-0 scale-y-0'}`}>
        <ul className="flex flex-col items-center gap-4 text-sm font-semibold text-gray-600 pb-2 px-6">
          <li className={`cursor-pointer text-base ${isActive('/') ? 'text-indigo-600 font-bold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li className={`cursor-pointer text-base hover:text-indigo-600 transition-colors ${isActive('/advertisers') ? 'text-indigo-600 font-bold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/advertisers">Advertisers</Link>
          </li>
          <li className={`cursor-pointer text-base hover:text-indigo-600 transition-colors ${isActive('/publishers') ? 'text-indigo-600 font-bold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/publishers">Publishers</Link>
          </li>
          
          {/* MOBILE SERVICES ACCORDION */}
          <li className="w-full flex flex-col items-center">
            <div 
              className={`flex items-center justify-center gap-1.5 hover:text-indigo-600 cursor-pointer transition-colors text-base py-1 ${isServiceActive ? 'text-indigo-600 font-bold' : ''}`}
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
            >
              <span>Services</span>
              <span className={`transform transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}>▾</span>
            </div>

            {/* Accordion Dropdown Content */}
            <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileServicesOpen ? 'max-h-[1200px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
              <div className="flex flex-col gap-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                
                {/* Digital Marketing */}
                <div>
                  <p className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider mb-2">Digital Marketing</p>
                  <div className="flex flex-col gap-2.5 pl-2">
                    {digitalMarketingServices.map((item, idx) => (
                      <Link key={idx} href={`/services/${item.slug}`} className={`text-xs font-medium hover:text-indigo-600 transition-colors ${isActive(`/services/${item.slug}`) ? 'text-indigo-600' : 'text-gray-600'}`} onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Promotions */}
                <div>
                  <p className="text-[10px] font-extrabold text-purple-600 uppercase tracking-wider mb-2">Promotions</p>
                  <div className="flex flex-col gap-2.5 pl-2">
                    {promotionServices.map((item, idx) => (
                      <Link key={idx} href={`/services/${item.slug}`} className={`text-xs font-medium hover:text-purple-600 transition-colors ${isActive(`/services/${item.slug}`) ? 'text-purple-600' : 'text-gray-600'}`} onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-2">Solutions</p>
                  <div className="flex flex-col gap-2.5 pl-2">
                    {solutionServices.map((item, idx) => (
                      <Link key={idx} href={`/services/${item.slug}`} className={`text-xs font-medium hover:text-blue-600 transition-colors ${isActive(`/services/${item.slug}`) ? 'text-blue-600' : 'text-gray-600'}`} onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); }}>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </li>

          <li className={`cursor-pointer text-base hover:text-indigo-600 transition-colors ${isActive('/resources') ? 'text-indigo-600 font-bold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/resources">Resources</Link>
          </li>
          <li className={`cursor-pointer text-base hover:text-indigo-600 transition-colors ${isActive('/company') ? 'text-indigo-600 font-bold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/company">Company</Link>
          </li>
          <li className={`cursor-pointer text-base hover:text-indigo-600 transition-colors ${isActive('/contact') ? 'text-indigo-600 font-bold' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/contact">Contact Us</Link>
          </li>
          
          <li className="w-full border-t border-gray-100 pt-6 mt-2 flex flex-col items-center gap-4 px-2">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-indigo-600 text-white px-6 py-4 rounded-xl font-bold w-full shadow-lg shadow-indigo-200/50 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              Get Started <span>→</span>
            </Link>
          </li>
        </ul>
      </div>

    </nav>
  );
}