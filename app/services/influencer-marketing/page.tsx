"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

const ScrollReveal = ({ children, className = "", delay = 0, animation = "fade-up", threshold = 0.1 }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold, rootMargin: "50px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  let baseClass = "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] w-full will-change-[opacity,transform] ";
  if (animation === "fade-up") baseClass += isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16";
  else if (animation === "scale-up") baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";

  return <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// Interactive Tabbed Hero for Influencer Marketing
const InteractiveInfluencerHero = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Macro & Micro Creators", sub: "Verified Audience Engagement", desc: "We source and vet creators across Instagram and YouTube who hold genuine influence over their communities.", metric: "4.8x", label: "Average Engagement", badge: "Creator Match" },
    { title: "UGC Content Factory", sub: "High-Converting Video Ads", desc: "Raw, authentic video ads shot by real users to fuel your paid social funnels with high ROAS.", metric: "3.5x", label: "ROAS on UGC Ads", badge: "Ad Creative" },
    { title: "Product Seeding Flows", sub: "Automated Gifting Campaigns", desc: "Scaling organic brand mentions through systematic product seeding to top-tier micro influencers.", metric: "+300%", label: "Organic Mentions", badge: "Viral Buzz" },
    { title: "Creator Whitelisting", sub: "Paid Ads Via Creator Handles", desc: "Run paid ads directly through influencer profiles to leverage their social proof and lower your CPA.", metric: "-42%", label: "CPA Reduction", badge: "Whitelisting" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12 text-left w-full max-w-[1300px] mx-auto">
      <div className="lg:col-span-7 bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -z-10"></div>
        <div>
          <span className="bg-pink-100 text-pink-700 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-6">
            {tabs[activeTab].badge}
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">{tabs[activeTab].title}</h3>
          <p className="text-pink-700 font-bold text-sm mb-6">{tabs[activeTab].sub}</p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">{tabs[activeTab].desc}</p>
        </div>
        <div className="bg-[#FAFBFF] border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Benchmark</p>
            <p className="text-3xl font-black text-pink-600 font-mono">{tabs[activeTab].metric}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-700">{tabs[activeTab].label}</p>
            <span className="text-[10px] text-pink-500 font-bold">Verified Result ✓</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
        {tabs.map((tab, idx) => {
          const isSelected = activeTab === idx;
          return (
            <div key={idx} onClick={() => setActiveTab(idx)} className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border flex items-center justify-between ${isSelected ? 'bg-[#0B0F19] text-white border-[#0B0F19] shadow-xl scale-[1.02]' : 'bg-white hover:bg-[#FAFBFF] text-gray-900 border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${isSelected ? 'bg-pink-500 text-gray-900' : 'bg-pink-50 text-pink-600'}`}>0{idx + 1}</div>
                <div>
                  <h4 className={`text-base font-black tracking-tight mb-0.5 ${isSelected ? 'text-white' : 'text-gray-900'}`}>{tab.title}</h4>
                  <p className={`text-xs truncate max-w-[200px] sm:max-w-[260px] ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>{tab.sub}</p>
                </div>
              </div>
              <span className={`text-xl font-bold transition-transform ${isSelected ? 'text-pink-400 translate-x-1' : 'text-gray-300'}`}>→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function InfluencerMarketingPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', country: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      await fetch('https://click.creditsdeal.com/api/leadApi', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, additional_text2: 'Influencer Page Lead', receivedBy: 'WeoAds' }),
      });
      setShowPopup(true); setFormData({ fullName: '', email: '', phone: '', country: '', message: '' });
    } catch (error) {} finally { setIsSubmitting(false); }
  };

  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-gray-900 overflow-x-hidden flex flex-col relative selection:bg-pink-500 selection:text-white">
      <Navbar />

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-lg w-full text-center shadow-2xl">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Campaign Brief Received!</h2>
            <p className="text-gray-600 mb-6">Our influencer relations team will match your brand with vetted creators matching your target niche.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white py-4 rounded-xl font-bold">Close Window</button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative w-full pt-36 pb-28 px-6 md:px-12 text-center flex flex-col items-center justify-center min-h-[90vh]">
        <div className="max-w-[1300px] mx-auto z-10 w-full">
          <div className="inline-flex items-center gap-3 bg-pink-50 border border-pink-100 text-pink-700 px-5 py-2.5 rounded-full mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-600 animate-pulse"></span>
            <span className="text-[10px] font-black tracking-widest uppercase">Creator Economy Partnerships</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
            Collaborate With <br/> Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Content Creators.</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Stop relying on cold banner ads. We manage end-to-end influencer campaigns, creator whitelisting, and high-performing User Generated Content (UGC) pipelines.
          </p>

          <InteractiveInfluencerHero />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Ready to scale with creators?</h2>
            <p className="text-gray-500 text-lg mb-8">Tell us about your product and target audience. We'll curate a custom creator roster for your brand.</p>
            <p className="text-pink-600 font-bold">📞 Direct Line: +91-6366666760</p>
          </div>
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-gray-200">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input type="text" name="fullName" onChange={(e)=>setFormData({...formData, fullName: e.target.value})} placeholder="Full Name" required className="w-full bg-[#FAFBFF] border border-gray-200 rounded-xl px-5 py-4" />
              <input type="email" name="email" onChange={(e)=>setFormData({...formData, email: e.target.value})} placeholder="Work Email" required className="w-full bg-[#FAFBFF] border border-gray-200 rounded-xl px-5 py-4" />
              <input type="tel" name="phone" onChange={(e)=>setFormData({...formData, phone: e.target.value})} placeholder="Phone Number" required className="w-full bg-[#FAFBFF] border border-gray-200 rounded-xl px-5 py-4" />
              <textarea name="message" onChange={(e)=>setFormData({...formData, message: e.target.value})} placeholder="Campaign goals & budget range..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 rounded-xl px-5 py-4 resize-none"></textarea>
              <button type="submit" className="w-full bg-pink-600 text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-pink-700">
                Request Creator Roster
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}