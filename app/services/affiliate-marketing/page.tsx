"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

// ==========================================
// 1. ADVANCED SCROLL REVEAL ENGINE
// ==========================================
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
  else if (animation === "fade-right") baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16";
  else if (animation === "fade-left") baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16";
  else if (animation === "scale-up") baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
  else if (animation === "blur-up") baseClass += isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-12";

  return <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// ==========================================
// 2. UNIQUE ANIMATION: LIVE TRAFFIC PIPELINE
// ==========================================
const LiveTrafficPipeline = () => {
  const [rawClicks, setRawClicks] = useState(45210);
  const [blocked, setBlocked] = useState(3102);
  const [sales, setSales] = useState(1840);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
      
      setRawClicks(prev => prev + Math.floor(Math.random() * 15) + 5);
      if (Math.random() > 0.5) setBlocked(prev => prev + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.3) setSales(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] p-8 md:p-10 w-full text-left flex flex-col justify-center h-[450px] relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5 relative z-10">
        <span className="text-emerald-600 font-black text-xs tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Network Router
        </span>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
          Live Tracking
        </span>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 flex-1">
        <div className="bg-[#FAFBFF] p-5 rounded-2xl border border-gray-200 text-center w-full md:w-1/3 shadow-sm relative">
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Raw Traffic</p>
          <p className="text-2xl lg:text-3xl font-black text-gray-900 font-mono">{rawClicks.toLocaleString()}</p>
          <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gray-200 hidden md:block ${pulse ? 'bg-emerald-300' : ''} transition-colors duration-200`}></div>
        </div>

        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl z-10 transition-all duration-300 shadow-md ${pulse ? 'bg-emerald-100 text-emerald-600 scale-110 shadow-emerald-500/30' : 'bg-white border-2 border-gray-100 text-gray-400'}`}>
          🛡️
        </div>

        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 text-center w-full md:w-1/3 shadow-sm relative">
          <div className={`absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-gray-200 hidden md:block ${pulse ? 'bg-emerald-300' : ''} transition-colors duration-200`}></div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Verified Sales</p>
          <p className="text-2xl lg:text-3xl font-black text-emerald-600 font-mono drop-shadow-sm">{sales.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-gray-100 relative z-10 flex justify-between items-center bg-gray-50 p-4 rounded-xl">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Fraud Blocked: <span className="text-red-500">{blocked.toLocaleString()}</span></p>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quality: <span className="text-emerald-500">96%</span></p>
      </div>
    </div>
  );
};

// ==========================================
// 3. ANIMATED COUNTER
// ==========================================
const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }: any) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(easeOut * end);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(end);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{Math.round(count)}{suffix}</span>;
};

export default function AffiliateMarketingPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', country: '', message: '' });
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) { setErrorMsg("Please agree to the Privacy Policy to continue."); return; }
    setIsSubmitting(true); setErrorMsg("");

    try {
      const payload = {
        fullName: formData.fullName, email: formData.email, mobileNumber: formData.phone,
        country: formData.country || 'Not Provided', additional_text1: formData.message,
        additional_text2: 'Affiliate Marketing Page Form', receivedBy: 'WeoAds System'
      };
      const response = await fetch('https://click.creditsdeal.com/api/leadApi', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowPopup(true);
        setFormData({ fullName: '', email: '', phone: '', country: '', message: '' });
        setPrivacyAgreed(false);
      } else {
        setErrorMsg("Missing required fields. Please check your inputs.");
      }
    } catch (error) {
      setErrorMsg("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-gray-900 overflow-x-hidden flex flex-col relative selection:bg-emerald-500 selection:text-white">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-grid-light { background-image: radial-gradient(#10b981 1px, transparent 1px); background-size: 30px 30px; opacity: 0.1; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 25s linear infinite; }
      `}} />

      {/* ================= POPUPS ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-emerald-50 border-4 border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Application Sent!</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">Our affiliate managers will deeply review your offer or traffic sources and connect with you shortly to discuss scalability.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg">Close Window</button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Error!</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-red-400 transition-colors">Try Again</button>
          </div>
        </div>
      )}

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full pt-32 pb-24 px-6 md:px-12 text-center flex flex-col justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-grid-light -z-20"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-300/30 rounded-full blur-[120px] -z-10 animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-300/30 rounded-full blur-[120px] -z-10 animate-float-fast"></div>

        <ScrollReveal animation="blur-up" className="max-w-[1300px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left mt-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-600 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm"></span>
              <span className="text-[10px] font-black tracking-widest uppercase">Performance Partnerships</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
              Pay For Action.<br/> Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Revenue.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
              We connect high-converting offers with elite publishers. Zero risk, strictly verified leads, and highly scalable CPA campaigns that protect your budget from fraud.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#contact" className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_10px_20px_rgba(16,185,129,0.2)] hover:bg-emerald-500 transition-all hover:-translate-y-1 text-center">
                Become an Advertiser
              </a>
              <a href="#ecosystem" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-10 py-4.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all hover:-translate-y-1 text-center shadow-sm">
                Explore Ecosystem &rarr;
              </a>
            </div>
          </div>
          
          <div className="relative w-full">
            <LiveTrafficPipeline />
          </div>
        </ScrollReveal>
      </section>

      {/* ================= 2. MARQUEE ================= */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(4)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
              <span className="hover:text-emerald-500 transition-colors duration-300 cursor-default">CPA CAMPAIGNS</span>
              <span className="text-gray-200">•</span>
              <span className="hover:text-gray-900 transition-colors duration-300 cursor-default">LEAD GENERATION</span>
              <span className="text-gray-200">•</span>
              <span className="hover:text-teal-400 transition-colors duration-300 cursor-default">HIGH-TICKET OFFERS</span>
              <span className="text-gray-200">•</span>
              <span className="hover:text-emerald-500 transition-colors duration-300 cursor-default">FRAUD PROTECTION</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 3. BENTO GRID (SERVICES) ================= */}
      <section id="ecosystem" className="w-full py-32 px-6 md:px-12 relative bg-[#FAFBFF]">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-emerald-600 font-black tracking-widest text-xs uppercase block mb-4">Our Ecosystem</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">The Affiliate Advantage</h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto mt-6 text-lg">We manage the network, rigorously recruit top-tier publishers, and heavily optimize payouts so you only pay when you profit.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="scale-up" delay={0} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:border-emerald-200 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 group relative overflow-hidden">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">👥</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Publisher Recruitment</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We extensively source and strictly vet elite affiliates, mega influencers, and hardcore media buyers who have the exact audience tailored for your high-converting offers.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={150} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:border-teal-200 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] transition-all duration-500 group relative overflow-hidden">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">CPA & CPL Campaigns</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Zero risk advertising structure. You define the exact conversion event (Lead, Sale, Install), and you strictly only pay when that specific action is successfully completed.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={300} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:border-red-200 hover:shadow-[0_20px_40px_-15px_rgba(239,68,68,0.15)] transition-all duration-500 group relative overflow-hidden">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Advanced Fraud Protection</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We use advanced traffic filtering algorithms and complex behavioral analysis to block malicious bots, click farms, and fraudulent leads immediately before they hit your CRM.</p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={0} className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-[2.5rem] p-10 group relative overflow-hidden lg:col-span-2 flex flex-col justify-center hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-shadow">
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform">📈</div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Offer Optimization & Scaling</h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-2xl">We do not just launch offers; we manage them aggressively. We continuously A/B test custom landing pages, adjust dynamic payouts based directly on traffic quality, and scale massive winning campaigns globally through our trusted network.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:border-emerald-200 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-center">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Real-Time Tracking</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Complete, undisputed transparency with postback URLs, pixel tracking integrations, and beautiful custom dashboards so you see your ROI in real-time.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 4. NEW SECTION: TRAFFIC SOURCES ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Our High-Quality Traffic Sources</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Search Arbitrage', 'Native Ads', 'Social Media', 'Email Drops', 'Push Notifications', 'In-App Display', 'Influencer Traffic', 'SEO & Organic'].map((source, i) => (
              <ScrollReveal key={i} delay={i*50} animation="scale-up" className="bg-[#FAFBFF] border border-gray-100 p-6 rounded-2xl flex items-center justify-center hover:border-emerald-300 transition-colors">
                <span className="font-bold text-gray-700 text-sm">{source}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. NEW SECTION: BRAND COMPLIANCE ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-gradient-to-br from-gray-900 to-emerald-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-400/20 rounded-full blur-[100px]"></div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <ScrollReveal animation="fade-right">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Absolute Brand Safety</h2>
            <p className="text-lg text-emerald-100/80 leading-relaxed mb-6">
              Affiliate marketing shouldn't mean risking your brand reputation. We enforce strict compliance rules on all our publishers.
            </p>
            <ul className="space-y-4 font-bold text-gray-200">
              <li className="flex items-center gap-3"><span className="text-emerald-400 text-xl">✓</span> No bidding on branded search terms.</li>
              <li className="flex items-center gap-3"><span className="text-emerald-400 text-xl">✓</span> Mandatory pre-approval for custom creatives.</li>
              <li className="flex items-center gap-3"><span className="text-emerald-400 text-xl">✓</span> Zero tolerance for spam or misleading claims.</li>
            </ul>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl">
             <div className="text-6xl mb-6">⚖️</div>
             <h3 className="text-2xl font-black text-white mb-4">Strict Compliance</h3>
             <p className="text-gray-300 text-sm">We actively monitor ad placements across the web to ensure your brand guidelines are never violated.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 6. PROCESS WORKFLOW ================= */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto text-center">
          <ScrollReveal animation="fade-up" className="mb-24">
            <span className="text-emerald-600 font-black tracking-widest text-[10px] uppercase block mb-4">Workflow</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">Campaign Execution</h2>
            <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto">From initial offer setup to massive global scaling, our process is built strictly for ROI.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[3.5rem] left-[10%] right-[10%] h-1 bg-gray-200 -z-10"></div>
            
            {[
              { step: "01", title: "Offer Setup & Tech", desc: "We integrate your tracking pixels, set up secure postback URLs, and establish clear payout structures." },
              { step: "02", title: "Publisher Matching", desc: "We manually match your specific offer with our top-tier publishers who hold your exact target audience." },
              { step: "03", title: "Traffic Filtering", desc: "Launching initial traffic tests while our anti-fraud algorithms heavily filter out any low-quality leads." },
              { step: "04", title: "ROI Scaling", desc: "Once we establish a profitable baseline, we open the floodgates and scale traffic aggressively." }
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 200} className="bg-white border border-gray-100 rounded-3xl p-10 relative hover:-translate-y-4 transition-transform duration-500 hover:shadow-xl">
                <div className="w-20 h-20 bg-[#FAFBFF] border-2 border-emerald-100 text-emerald-600 font-black text-2xl rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. METRICS STRIP ================= */}
      <section className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 py-24 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-6 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">10k+</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">Vetted Publishers</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">
              <AnimatedCounter end={0} duration={2000} />%
            </h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">Risk (Pay Per Action)</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">24/7</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">Fraud Monitoring</p>
          </div>
        </div>
      </section>

      {/* ================= 8. FAQs ================= */}
      <section className="w-full py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Frequently Asked Questions</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            <ScrollReveal animation="fade-up" delay={0} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">How do you track conversions?</h4>
              <p className="text-base text-gray-500 leading-relaxed">We utilize highly advanced Server-to-Server (S2S) postback tracking and pixel integrations to securely log every conversion. This ensures there are zero discrepancies between our network and your CRM.</p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">What happens if I get fraudulent leads?</h4>
              <p className="text-base text-gray-500 leading-relaxed">You never pay for fraud. Our proprietary internal algorithms analyze IP addresses, user behavior, and conversion times to automatically scrub fake traffic before it registers as a payable action.</p>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Can publishers apply to the network?</h4>
              <p className="text-base text-gray-500 leading-relaxed">Yes. However, we have a strict vetting process. Publishers must provide proof of traffic quality, historical conversion data, and promotional methods before accessing our exclusive high-payout offers.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 9. CONTACT FORM (WHITE/LIGHT THEME) ================= */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Join The Network
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to scale your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">acquisitions?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Whether you are an advertiser demanding high-quality volume, or a publisher looking for exclusive high-converting offers, drop your details below to begin.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">📞</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>
                  🇮🇳 +91-6366666760
                </div>
              </div>
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xl">✉️</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                  support@weoads.com
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Submit Application</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-emerald-600">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-emerald-600">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-emerald-600">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Company / Network</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Company Name" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Offer Details & Geos <span className="text-emerald-600">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your offer, target CPA, and accepted Geos..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all resize-none placeholder-gray-400"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <div className="flex items-center h-5">
                    <input id="aff-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600" />
                  </div>
                  <label htmlFor="aff-privacy" className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5">
                    I agree to the <span className="text-emerald-600 font-bold hover:underline">Privacy Policy</span> and consent to being contacted.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 mt-4 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Sending Application...' : 'Apply as Advertiser'}
                </button>
              </form>
            </div>
          </ScrollReveal>

        </div>
      </section>

      <Footer />
    </main>
  );
}