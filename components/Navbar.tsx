import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 md:px-12 bg-[#FAFBFF]">
      
      {/* Updated Logo Section - Bigger & Transparent via CSS */}
      <div className="flex items-center cursor-pointer">
        <div className="relative w-48 h-14 md:w-56 md:h-16">
          <Image 
            src="/logo.png" 
            alt="WeoAds Logo" 
            fill 
            className="object-contain object-left mix-blend-multiply" 
            priority 
          />
        </div>
      </div>

      {/* Nav Links */}
      <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <li className="text-indigo-600 border-b-2 border-indigo-600 pb-1 cursor-pointer">Home</li>
        <li className="cursor-pointer hover:text-indigo-600 transition-colors">Advertisers</li>
        <li className="cursor-pointer hover:text-indigo-600 transition-colors">Publishers</li>
        <li className="cursor-pointer hover:text-indigo-600 transition-colors">Services ▾</li>
        <li className="cursor-pointer hover:text-indigo-600 transition-colors">Resources ▾</li>
        <li className="cursor-pointer hover:text-indigo-600 transition-colors">Company ▾</li>
      </ul>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
          <span className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
            ✉ hello@weoads.com
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
            🌐 We are Global ▾
          </span>
        </div>
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
          <button className="text-sm font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
            Log In
          </button>
          <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200/50">
            Get Started →
          </button>
        </div>
      </div>
    </nav>
  );
}