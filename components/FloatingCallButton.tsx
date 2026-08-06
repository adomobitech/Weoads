"use client";

export default function FloatingCallButton() {
  return (
    <a 
      href="tel:+17373056651" 
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[99] group flex items-center bg-[#4F46E5] text-white rounded-full p-3.5 md:p-4 shadow-[0_10px_25px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_35px_rgba(79,70,229,0.6)] transition-all duration-300 hover:-translate-y-1 hover:pr-6 md:hover:pr-8"
      aria-label="Call Us"
    >
      {/* Background Pulse Effect matched to theme */}
      <div className="absolute inset-0 rounded-full border-2 border-[#4F46E5]/60 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] group-hover:animate-none"></div>

      {/* Phone Icon */}
      <div className="relative z-10 flex items-center justify-center bg-white/20 rounded-full p-2.5">
        <svg 
          className="w-5 h-5 md:w-6 md:h-6 animate-[wiggle_1s_ease-in-out_infinite] group-hover:animate-none text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
          />
        </svg>
      </div>

      {/* Expandable Phone Number */}
      <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 md:group-hover:ml-4 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm md:text-base tracking-wide text-white">
        +1 (737) 305-6651
      </span>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}} />
    </a>
  );
}