import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAFBFF] pt-10 pb-6 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto">
        
        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-[2rem] p-10 md:p-14 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 opacity-20 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </div>
          
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Grow Your Business?</h2>
            <p className="text-indigo-100 font-medium">Join 500+ brands and publishers scaling their performance marketing globally.</p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-4">
            <Link href="/advertisers" className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              I'm an Advertiser &rarr;
            </Link>
            <Link href="/publishers" className="bg-indigo-700/50 text-white border border-indigo-400 px-8 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              I'm a Publisher &rarr;
            </Link>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-12">
          
          {/* Company Info & Contact Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 pr-0 lg:pr-8">
            
            {/* Logo */}
            <div className="mb-6">
               <div className="relative w-48 h-14 md:w-56 md:h-16">
                 <Link href="/">
                   <Image 
                     src="/logo.png" 
                     alt="WeoAds Logo" 
                     fill 
                     className="object-contain object-left mix-blend-multiply cursor-pointer" 
                   />
                 </Link>
               </div>
            </div>

            <p className="text-sm text-gray-500 font-medium mb-6">
              Empowering advertisers and publishers worldwide with high-quality traffic, advanced tools, and real results.
            </p>

            {/* Contact Information */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                <svg className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>5900 Balcones Drive STE 100<br/>Austin, TX 78731 USA</span>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+17373056651" className="hover:text-indigo-600 transition-colors">+1 (737) 305-6651</a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                <svg className="w-5 h-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@weoads.com" className="hover:text-indigo-600 transition-colors">support@weoads.com</a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3">
              <a href="https://x.com/weoads" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-black hover:border-black transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z"/></svg>
              </a>
              <a href="https://www.instagram.com/weoads" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/weoads" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-700 hover:border-blue-700 transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.youtube.com/@weoads" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.facebook.com/weoads" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
            </div>
          </div>

          {/* Spacer / Menu Columns */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
              <li><Link href="/resources" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
              <li className="hover:text-indigo-600 cursor-pointer transition-colors">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/advertisers" className="hover:text-indigo-600 transition-colors">For Advertisers</Link></li>
              <li><Link href="/publishers" className="hover:text-indigo-600 transition-colors">For Publishers</Link></li>
              <li><Link href="/ad-formats" className="hover:text-indigo-600 transition-colors">Ad Formats</Link></li>
              <li><Link href="/affiliate-program" className="hover:text-indigo-600 transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/help-center" className="hover:text-indigo-600 transition-colors">Help Center</Link></li>
              <li><Link href="/case-studies" className="hover:text-indigo-600 transition-colors">Case Studies</Link></li>
              <li><Link href="/news-updates" className="hover:text-indigo-600 transition-colors">News & Updates</Link></li>
              <li><Link href="/api-documentation" className="hover:text-indigo-600 transition-colors">API Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-indigo-600 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/compliance" className="hover:text-indigo-600 transition-colors">Compliance</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400">
          <p>© Weeo Media LLC.All rights reserved.</p>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600 transition-colors">
            <span>English ▾</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
