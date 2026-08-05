export default function TrustLogos() {
  return (
    <section className="w-full bg-[#FAFBFF] px-6 md:px-12 pb-16 relative z-30">
      
      {/* Container overlapping the Hero Section via negative margin */}
      <div className="max-w-[1000px] mx-auto -mt-10 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
          Trusted by 100+ Businesses Worldwide
        </span>
        
        {/* Logos */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
          <span className="text-lg font-black text-gray-800 flex items-center gap-1"><span className="text-xl">↻</span> Playio</span>
          <span className="text-lg font-black text-gray-800 tracking-widest">WINZO</span>
          <span className="text-sm font-bold text-gray-800 flex items-center gap-1"><span className="text-lg">🎓</span> CAREERWILL</span>
          <span className="text-sm font-bold text-gray-800 flex items-center gap-1"><span className="text-lg">💼</span> KreditBee</span>
          <span className="text-sm font-bold text-gray-800 lowercase flex items-center gap-1"><span className="text-lg">♥</span> frendy</span>
        </div>

      </div>
    </section>
  );
}