"use client";

import { useEffect, useRef, useState } from 'react';

export default function AdFormats() {
  const [activeTab, setActiveTab] = useState('Pop-Under');
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { id: 'Pop-Under', icon: '🪟' },
    { id: 'Interstitial', icon: '📱' },
    { id: 'In-Page Push', icon: '🔔' },
    { id: 'Native', icon: '📰' },
    { id: 'Banner', icon: '🖼️' },
    { id: 'AutoTag', icon: '</>' }
  ];

  // Dynamic content based on the selected tab
  const tabContent: Record<string, { f1: any, f2: any, f3: any }> = {
    'Pop-Under': {
      f1: { title: "High Visibility", desc: "Appears entirely behind the main browser window, guaranteeing undivided user attention when they close tabs." },
      f2: { title: "Cost-Effective Scale", desc: "Lower CPC rates combined with massive volume potential, perfect for aggressively scaling campaigns." },
      f3: { title: "Zero Intrusion UX", desc: "Triggers seamlessly without disrupting or annoying the user during their active browsing session." }
    },
    'Interstitial': {
      f1: { title: "Full-Screen Impact", desc: "Captures 100% of the screen real estate during natural app or website transitions for maximum CTR." },
      f2: { title: "High Engagement", desc: "Commands complete focus with high-resolution creatives and unmistakable call-to-actions." },
      f3: { title: "Guaranteed Views", desc: "Ensures your advertising message is seen fully before the user continues their digital journey." }
    },
    'In-Page Push': {
      f1: { title: "Native OS Feel", desc: "Mimics system notifications perfectly across all devices, including iOS, bypassing standard ad-blockers." },
      f2: { title: "High Conversions", desc: "Incredible interaction rates because users naturally check and click familiar notification alerts." },
      f3: { title: "Premium Placement", desc: "Displays cleanly in the corner of the screen without covering the main publisher content." }
    },
    'Native': {
      f1: { title: "Organic Integration", desc: "Blends flawlessly with the publisher's editorial content, matching the exact look and feel of the site." },
      f2: { title: "Trust Building", desc: "Drives higher quality leads as users interact with these ads just like standard editorial articles." },
      f3: { title: "Ad-Blindness Proof", desc: "Overcomes standard banner-blindness by offering value-driven visual formatting." }
    },
    'Banner': {
      f1: { title: "Universal Compatibility", desc: "Supports all standard IAB sizes across desktop and mobile for instant, frictionless campaign launches." },
      f2: { title: "Brand Awareness", desc: "Constant visibility in premium above-the-fold placements keeps your brand top-of-mind." },
      f3: { title: "Rich Media Ready", desc: "Supports HTML5, GIFs, and dynamic creatives to capture user attention efficiently." }
    },
    'AutoTag': {
      f1: { title: "Time-Tested Results", desc: "Over a decade of AutoTag expertise, refined and modernized for today's complex traffic sources." },
      f2: { title: "Broad Potential", desc: "Advertisers see stronger awareness; publishers enjoy automatically increased and optimized earnings." },
      f3: { title: "Minimal Intrusiveness", desc: "Formats dynamically designed by AI to engage audiences without ever disrupting their experience." }
    }
  };

  const currentContent = tabContent[activeTab];

  return (
    <section className="w-full bg-[#FAFBFF] py-20 px-6 md:px-12 border-t border-gray-100" ref={sectionRef}>
      <style>{`
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.15); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }
        @keyframes tabIconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.18); }
        }
        .adf-badge-anim { animation: badgeFloat 3.2s ease-in-out infinite; }
        .adf-dot-live { animation: dotPulse 1.8s ease-in-out infinite; }
        .adf-shimmer { animation: shimmerSweep 2.6s ease-in-out infinite; }
        .adf-tab-icon-active { animation: tabIconPulse 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .adf-badge-anim, .adf-dot-live, .adf-shimmer, .adf-tab-icon-active { animation: none !important; }
        }
      `}</style>
      <div
        className={`max-w-[1400px] mx-auto transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Ad Formats</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Engaging Ad Formats That Convert</h2>
        </div>

        {/* Dynamic Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-[1rem] font-bold text-sm transition-all duration-300 border ${
                activeTab === tab.id 
                  ? 'bg-white text-indigo-600 border-indigo-100 shadow-md scale-105 ring-1 ring-indigo-50' 
                  : 'bg-white/50 text-gray-500 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-sm hover:-translate-y-0.5'
              }`}
            >
              <span className={`inline-block ${activeTab === tab.id ? 'opacity-100 adf-tab-icon-active' : 'opacity-60 grayscale'}`}>{tab.icon}</span>
              {tab.id}
            </button>
          ))}
        </div>

        {/* Content Box (Animated rendering based on active tab) */}
        <div key={activeTab} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col lg:flex-row items-center gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:w-3/4">
            
            {/* Feature 1 */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#F5F3FF] text-[#7C3AED] rounded-full flex items-center justify-center text-xl shadow-inner border border-purple-50 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                ⏱️
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">{currentContent.f1.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{currentContent.f1.desc}</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#EFF6FF] text-[#2563EB] rounded-full flex items-center justify-center text-xl shadow-inner border border-blue-50 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                👥
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">{currentContent.f2.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{currentContent.f2.desc}</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-[#F0FDF4] text-[#16A34A] rounded-full flex items-center justify-center text-xl shadow-inner border border-green-50 transition-transform duration-300 hover:scale-110 hover:rotate-6">
                🎯
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">{currentContent.f3.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{currentContent.f3.desc}</p>
              </div>
            </div>
          </div>

          {/* Unique CSS Graphic Area (Replaces static 'Laptop Graphic' text) */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-end">
            <div className="w-full max-w-[220px] aspect-[4/3] bg-gradient-to-br from-indigo-50/80 to-purple-50/50 rounded-2xl border border-indigo-100/50 flex flex-col p-4 shadow-inner relative group overflow-hidden">
               
               {/* Floating Chart Icon Badge (Like in screenshot) - now floats continuously */}
               <div className="adf-badge-anim absolute -right-2 -top-2 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-lg rounded-xl flex items-center justify-center text-indigo-500 z-10 border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                 📈
               </div>

               {/* CSS Wireframe / Mockup UI */}
               <div className="flex items-center gap-1.5 mb-3 border-b border-indigo-100/50 pb-2">
                 <div className="w-2 h-2 rounded-full bg-red-400"></div>
                 <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-400 adf-dot-live"></div>
               </div>

               <div className="flex-1 flex flex-col gap-2 group-hover:scale-[1.02] transition-transform duration-500">
                 <div className="w-3/4 h-3 bg-indigo-200/50 rounded-full"></div>
                 <div className="w-full h-12 bg-white/60 border border-indigo-100/50 rounded-lg mt-1 relative overflow-hidden flex items-center justify-center">
                   {/* Shimmer sweep */}
                   <div className="adf-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none"></div>
                   {/* Dynamic element inside wireframe */}
                   <span className="relative text-indigo-400/80 font-bold text-xs uppercase tracking-wider">{activeTab} Ad</span>
                 </div>
                 <div className="flex gap-2 mt-auto">
                   <div className="w-full h-2 bg-purple-200/50 rounded-full"></div>
                   <div className="w-1/2 h-2 bg-blue-200/50 rounded-full"></div>
                 </div>
               </div>
               
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}