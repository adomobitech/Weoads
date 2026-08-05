import Image from 'next/image';

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
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              I'm an Advertiser &rarr;
            </button>
            <button className="bg-indigo-700/50 text-white border border-indigo-400 px-8 py-4 rounded-xl font-bold text-sm hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
              I'm a Publisher &rarr;
            </button>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            
            {/* Updated Footer Logo - Bigger & Transparent */}
            <div className="mb-6">
               <div className="relative w-48 h-14 md:w-56 md:h-16">
                 <Image 
                   src="/logo.png" 
                   alt="WeoAds Logo" 
                   fill 
                   className="object-contain object-left mix-blend-multiply" 
                 />
               </div>
            </div>

            <p className="text-sm text-gray-500 font-medium max-w-xs mb-6">
              Empowering advertisers and publishers worldwide with high-quality traffic, advanced tools, and real results.
            </p>
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 cursor-pointer transition-colors">f</span>
              <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 cursor-pointer transition-colors">t</span>
              <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 cursor-pointer transition-colors">in</span>
              <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 cursor-pointer transition-colors">ig</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="hover:text-indigo-600 cursor-pointer">About Us</li>
              <li className="hover:text-indigo-600 cursor-pointer">Careers</li>
              <li className="hover:text-indigo-600 cursor-pointer">Blog</li>
              <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="hover:text-indigo-600 cursor-pointer">For Advertisers</li>
              <li className="hover:text-indigo-600 cursor-pointer">For Publishers</li>
              <li className="hover:text-indigo-600 cursor-pointer">Ad Formats</li>
              <li className="hover:text-indigo-600 cursor-pointer">Affiliate Program</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="hover:text-indigo-600 cursor-pointer">Help Center</li>
              <li className="hover:text-indigo-600 cursor-pointer">Case Studies</li>
              <li className="hover:text-indigo-600 cursor-pointer">News & Updates</li>
              <li className="hover:text-indigo-600 cursor-pointer">API Documentation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li className="hover:text-indigo-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-indigo-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-indigo-600 cursor-pointer">Cookie Policy</li>
              <li className="hover:text-indigo-600 cursor-pointer">Compliance</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-gray-400">
          <p>© 2026 WeoAds. All rights reserved.</p>
          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-600">
            <span>English ▾</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}