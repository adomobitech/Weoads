"use client";

import Image from 'next/image';

export default function Hero() {
  // Data for Services Section
  const services = [
    { icon: "📐", color: "text-blue-500", title: "Google Ads", desc: "Drive targeted traffic, increase ROI and maximize ad performance." },
    { icon: "∞", color: "text-blue-600", title: "Meta Ads", desc: "Reach the right audience and boost conversions with smart campaigns." },
    { icon: "🔍", color: "text-teal-500", title: "SEO", desc: "Rank higher, get discovered and grow organic traffic consistently." },
    { icon: "👥", color: "text-indigo-500", title: "Social Media Marketing", desc: "Build brand presence and engage your audience across platforms." },
    { icon: "📝", color: "text-purple-600", title: "Content Marketing", desc: "Create content that attracts, engages and converts your audience." },
    { icon: "🌐", color: "text-blue-700", title: "Website Development", desc: "Build fast, responsive and SEO-friendly websites that perform." },
    { icon: "📊", color: "text-indigo-600", title: "Analytics & Reporting", desc: "Track performance and make data-driven decisions." },
    { icon: "⚡", color: "text-blue-500", title: "Lead Generation", desc: "High-quality leads that fuel your pipeline and grow your business." },
  ];

  // Data for Stats Banner
  const stats = [
    { icon: "🚀", value: "100+", label: "Happy Clients" },
    { icon: "📈", value: "250+", label: "Projects Delivered" },
    { icon: "👥", value: "10M+", label: "Leads Generated" },
    { icon: "🎯", value: "5.8X", label: "Average ROI Increase" },
    { icon: "🌐", value: "20+", label: "Countries Served" },
    { icon: "🏆", value: "7+", label: "Years of Excellence" },
  ];

  return (
    <>
      {/* 1. MAIN HERO SECTION */}
      <section className="relative w-full min-h-[calc(100vh-80px)] bg-[#FAFBFF] overflow-hidden font-sans flex flex-col justify-center pt-16 pb-32">
        
        {/* Background Soft Blurs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4"></div>
        <div className="absolute bottom-10 right-20 w-[300px] h-[300px] bg-emerald-50/40 rounded-full blur-[80px] pointer-events-none -z-10"></div>

        <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 relative z-10 flex-1 flex items-center">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
            
            {/* LEFT SIDE: Typography & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start z-20">
              
              {/* Top Badge */}
              <div className="flex items-center gap-2 bg-white border border-gray-100 px-5 py-2.5 rounded-full mb-8 shadow-sm">
                <span className="text-sm">🚀</span>
                <span className="text-[11px] font-bold text-gray-600 tracking-widest uppercase">Performance Driven. Result Focused.</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-7xl lg:text-[5rem] font-black text-[#111827] leading-[1.05] tracking-tight mb-6">
                We Grow <br />
                <span className="text-[#8B5CF6]">Brands.</span><br />
                We Generate <br />
                <span className="text-[#00C896]">Results.</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-gray-500 font-medium max-w-[420px] leading-relaxed mb-10">
                We deliver full-funnel digital marketing solutions that help businesses grow, scale and dominate online.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#7C3AED] text-white px-8 py-4 rounded-full font-bold text-sm hover:shadow-[0_10px_25px_rgba(124,58,237,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                  Our Services 
                  <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center transition-transform">&rarr;</span>
                </button>
                <button className="w-full sm:w-auto bg-white text-[#581C87] border border-gray-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 hover:shadow-sm transition-all duration-300 flex items-center justify-center gap-2">
                  Get a Free Consultation
                  <span className="text-pink-500 text-lg">📞</span>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Dashboard UI */}
            <div className="lg:col-span-7 relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
              
              {/* MAIN DASHBOARD CARD */}
              <div className="relative w-full max-w-[700px] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-50 p-6 md:p-8 z-20">
                
                {/* Header Stats */}
                <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-6 mb-6">
                  <div className="flex items-center gap-4 pr-6 md:border-r border-gray-100">
                    <div className="w-16 h-16 bg-[#4F46E5] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 shrink-0">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Growth</p>
                      <p className="text-4xl font-black text-[#111827] leading-none">+128%</p>
                      <p className="text-[10px] font-semibold text-gray-400 mt-2">vs Last 30 Days</p>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Overview</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold mb-1">Clicks</p>
                        <p className="text-xl font-black text-[#111827]">45,231</p>
                        <p className="text-[10px] font-bold text-[#00C896] mt-1">+23.5%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold mb-1">Leads</p>
                        <p className="text-xl font-black text-[#111827]">3,256</p>
                        <p className="text-[10px] font-bold text-[#00C896] mt-1">+18.2%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold mb-1">Conversions</p>
                        <p className="text-xl font-black text-[#111827]">2,845</p>
                        <p className="text-[10px] font-bold text-[#00C896] mt-1">+35.7%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold mb-1">ROI</p>
                        <p className="text-xl font-black text-[#111827]">5.8x</p>
                        <p className="text-[10px] font-bold text-[#00C896] mt-1">+45.1%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts */}
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Performance Over Time</p>
                    <div className="w-full h-32 relative flex items-end">
                      <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-gray-100 pb-4 pl-1">
                        <div className="w-full border-b border-gray-50 border-dashed"></div>
                        <div className="w-full border-b border-gray-50 border-dashed"></div>
                      </div>
                      
                      <svg className="w-full h-full relative z-10 drop-shadow-md" viewBox="0 0 100 40" preserveAspectRatio="none">
                         <defs>
                            <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2"/>
                              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
                            </linearGradient>
                         </defs>
                         <path d="M0 35 L 15 25 L 30 30 L 45 15 L 60 20 L 75 5 L 90 10 L 100 0 L 100 40 L 0 40 Z" fill="url(#gradientArea)" />
                         <path d="M0 35 L 15 25 L 30 30 L 45 15 L 60 20 L 75 5 L 90 10 L 100 0" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                         <circle cx="15" cy="25" r="2" fill="#fff" stroke="#7C3AED" strokeWidth="1.5"/>
                         <circle cx="45" cy="15" r="2" fill="#fff" stroke="#7C3AED" strokeWidth="1.5"/>
                         <circle cx="75" cy="5" r="2" fill="#fff" stroke="#7C3AED" strokeWidth="1.5"/>
                      </svg>

                      <div className="absolute -bottom-5 w-full flex justify-between text-[8px] text-gray-400 px-1 font-semibold">
                        <span>May 12</span>
                        <span>May 19</span>
                        <span>May 26</span>
                        <span>Jun 02</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-[180px] shrink-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Top Channels</p>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                          <path className="text-gray-100" strokeWidth="7" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-[#4F46E5]" strokeDasharray="40, 100" strokeWidth="7" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-[#00C896]" strokeDasharray="28, 100" strokeDashoffset="-40" strokeWidth="7" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-[#A855F7]" strokeDasharray="14, 100" strokeDashoffset="-68" strokeWidth="7" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-2 text-[8px] font-semibold text-gray-500">
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#4F46E5]"></div> Google Ads <span className="font-bold text-[#111827] ml-2">40%</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00C896]"></div> Meta Ads <span className="font-bold text-[#111827] ml-2">28%</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#A855F7]"></div> SEO <span className="font-bold text-[#111827] ml-2">14%</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-300"></div> Others <span className="font-bold text-[#111827] ml-2">10%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 1: Leads Generated */}
              <div className="absolute -bottom-4 -left-6 bg-white p-5 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-50 z-30 flex flex-col gap-2 animate-[float_6s_ease-in-out_infinite]">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Leads Generated</p>
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-purple-100 text-[#7C3AED] rounded-lg flex items-center justify-center text-sm">👥</div>
                  <p className="text-2xl font-black text-[#111827]">3,250+</p>
                </div>
                <p className="text-[10px] font-semibold text-gray-400">This Month</p>
                <svg className="w-full h-4 text-[#00C896] mt-2" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M0 15 Q 20 10, 40 18 T 80 5 T 100 10" strokeLinecap="round" />
                </svg>
              </div>

              {/* FLOATING CARD 2: Cost Per Lead */}
              <div className="absolute bottom-4 -right-10 bg-white p-5 rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-50 z-30 flex flex-col gap-1 animate-[float_5s_ease-in-out_infinite_reverse]">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Cost Per Lead</p>
                <div className="flex items-end gap-2 mt-1">
                  <p className="text-2xl font-black text-[#111827]">$2.45</p>
                  <p className="text-[10px] font-bold text-[#00C896] mb-1">-12.5%</p>
                </div>
                <svg className="w-full h-4 text-[#A855F7] mt-2" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M0 10 Q 20 15, 40 8 T 80 12 T 100 5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Right Side Control Buttons (Floating) */}
              <div className="absolute top-1/4 -right-12 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-blue-500 text-lg cursor-pointer hover:scale-110 transition-transform">
                ◀
              </div>
              <div className="absolute top-1/2 -right-16 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                   <div className="w-1 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="absolute bottom-1/4 -right-2 w-10 h-10 bg-[#4F46E5] text-white rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                ↗
              </div>

            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}} />
      </section>

      {/* 2. OVERLAPPING TRUST LOGOS */}
      <section className="w-full bg-[#FAFBFF] px-6 md:px-12 pb-16 relative z-30">
        <div className="max-w-[1000px] mx-auto -mt-10 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            Trusted by 100+ Businesses Worldwide
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-lg font-black text-gray-800 flex items-center gap-1"><span className="text-xl">↻</span> Playio</span>
            <span className="text-lg font-black text-gray-800 tracking-widest">WINZO</span>
            <span className="text-sm font-bold text-gray-800 flex items-center gap-1"><span className="text-lg">🎓</span> CAREERWILL</span>
            <span className="text-sm font-bold text-gray-800 flex items-center gap-1"><span className="text-lg">💼</span> KreditBee</span>
            <span className="text-sm font-bold text-gray-800 lowercase flex items-center gap-1"><span className="text-lg">♥</span> frendy</span>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO (SERVICES GRID) */}
      <section className="w-full bg-[#FAFBFF] py-16 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto text-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">What We Do</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-12">
            Full-Service <span className="text-[#7C3AED]">Digital Marketing</span> Solutions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {services.map((srv, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                <div className={`text-4xl mb-4 ${srv.color}`}>
                  {srv.icon}
                </div>
                <h3 className="text-sm font-black text-gray-900 mb-2 leading-tight">{srv.title}</h3>
                <p className="text-[10px] text-gray-500 font-medium mb-4 leading-relaxed flex-1">
                  {srv.desc}
                </p>
                <button className="text-[10px] font-bold text-[#7C3AED] hover:text-[#4F46E5] flex items-center gap-1 transition-colors mt-auto">
                  Learn More <span>&rarr;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS BANNER (BLUE STRIP) */}
      <section className="w-full bg-[#FAFBFF] px-6 md:px-12 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-[2rem] p-8 md:p-10 shadow-xl shadow-indigo-500/20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 divide-x-0 lg:divide-x divide-white/20">
              {stats.map((stat, idx) => (
                <div key={idx} className={`flex items-center gap-4 ${idx !== 0 ? 'lg:pl-8' : ''}`}>
                  <div className="text-3xl text-white opacity-90">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-2xl font-black text-white leading-none mb-1">{stat.value}</h3>
                    <p className="text-[10px] font-bold text-indigo-100 uppercase tracking-wide">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}