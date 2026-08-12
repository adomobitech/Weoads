"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

const ScrollReveal = ({ children, className = "", delay = 0, animation = "fade-up", threshold = 0.1 }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  let baseClass = "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] w-full will-change-[opacity,transform] ";
  if (animation === "fade-up") baseClass += isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16";
  else if (animation === "fade-right") baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16";
  else if (animation === "fade-left") baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16";
  else if (animation === "scale-up") baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
  else if (animation === "blur-in") baseClass += isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-12";

  return <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// Unique Component: Live Bidding & ROAS Console
const LiveROASConsole = () => {
  const [roas, setRoas] = useState(2.1);
  const [cpc, setCpc] = useState(3.40);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoas(prev => (prev < 4.8 ? Number((prev + 0.1).toFixed(1)) : 4.8));
      setCpc(prev => (prev > 1.25 ? Number((prev - 0.05).toFixed(2)) : 1.25));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.15)] p-8 md:p-10 w-full text-left flex flex-col justify-center h-[450px] relative overflow-hidden group">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-5">
        <span className="text-cyan-600 font-black text-xs tracking-widest uppercase flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span> Bidding Algorithm Active
        </span>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">Google Ads P-Max</span>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-[#FAFBFF] p-6 rounded-2xl border border-gray-100 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target ROAS</p>
          <p className="text-4xl font-black text-cyan-600 font-mono">{roas}x</p>
        </div>
        <div className="bg-[#FAFBFF] p-6 rounded-2xl border border-gray-100 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Optimized CPC</p>
          <p className="text-4xl font-black text-blue-600 font-mono">${cpc.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-cyan-50 border border-cyan-100 p-5 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black text-cyan-700 uppercase tracking-widest">Wasted Spend Blocked</p>
          <p className="text-xs text-cyan-900 font-medium">Auto-filtering negative search terms in real time.</p>
        </div>
        <span className="text-2xl font-black text-cyan-600 font-mono">-$1,420</span>
      </div>
    </div>
  );
};

export default function SEMPage() {
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
        additional_text2: 'SEM Page Lead Request', receivedBy: 'WeoAds System'
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
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-gray-900 overflow-x-hidden flex flex-col relative selection:bg-cyan-500 selection:text-white">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-grid-light { background-image: radial-gradient(#06b6d4 1.5px, transparent 1.5px); background-size: 32px 32px; opacity: 0.12; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 25s linear infinite; }
      `}} />

      {/* POPUP MODALS */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-cyan-50 border-4 border-cyan-100 text-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Audit Request Submitted!</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">Our media buyers will review your ad account architecture, search term reports, and bidding strategies. Expect a teardown deck shortly!</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-cyan-600 transition-colors shadow-lg">Close Window</button>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO */}
      <section className="relative w-full pt-32 pb-24 px-6 md:px-12 text-center flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-grid-light -z-20"></div>
        <div className="max-w-[1300px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left mt-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-cyan-50 border border-cyan-100 text-cyan-700 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
              <span className="text-[10px] font-black tracking-widest uppercase">Performance Paid Search</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
              Pay for Clicks.<br/> Optimize for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Pure Profit.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
              We run paid search like an engineering discipline. We eliminate wasted budget on broad match traps and force Google Ads & Meta Ads to bid exclusively on high-intent buyers.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#contact" className="w-full sm:w-auto bg-cyan-600 text-white px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:bg-cyan-500 transition-all hover:-translate-y-1 text-center">
                Audit My Account
              </a>
              <a href="#channels" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-10 py-4.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all hover:-translate-y-1 text-center shadow-sm">
                Explore Channels &rarr;
              </a>
            </div>
          </div>
          
          <div className="relative w-full">
            <LiveROASConsole />
          </div>
        </div>
      </section>

      {/* SECTION 2: MARQUEE TICKER */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-cyan-500 transition-colors">GOOGLE ADS</span><span>•</span>
            <span className="hover:text-blue-600 transition-colors">META ADS</span><span>•</span>
            <span className="hover:text-indigo-600 transition-colors">LINKEDIN B2B</span><span>•</span>
            <span className="hover:text-cyan-600 transition-colors">PERFORMANCE MAX</span><span>•</span>
            <span className="hover:text-cyan-500 transition-colors">MICROSOFT BING</span>
          </div>
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-cyan-500 transition-colors">GOOGLE ADS</span><span>•</span>
            <span className="hover:text-blue-600 transition-colors">META ADS</span><span>•</span>
            <span className="hover:text-indigo-600 transition-colors">LINKEDIN B2B</span><span>•</span>
            <span className="hover:text-cyan-600 transition-colors">PERFORMANCE MAX</span><span>•</span>
            <span className="hover:text-cyan-500 transition-colors">MICROSOFT BING</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE WASTED SPEND BLEED */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Where Your Ad Spend Is Actually Going</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Default ad platform settings are designed to maximize network revenue, not your ROAS.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl mb-6">🎯</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Broad Match Traps</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Google matches your ads to low-intent search terms that burn budget without generating qualified sales calls or checkouts.</p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-xl mb-6">📊</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Broken Pixel Attribution</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Without S2S Server-Side Conversion APIs, iOS privacy updates blind ad networks, leading to miscalibrated AI bidding.</p>
            </ScrollReveal>
            <ScrollReveal delay={300} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl mb-6">⚡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Creative Fatigue</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Running static ads for months without fresh variants causes CTRs to plummet and Cost Per Acquisition (CPA) to surge.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: CHANNELS BENTO */}
      <section id="channels" className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-cyan-600 font-black tracking-widest text-xs uppercase block mb-3">Omnichannel Strategy</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Where We Deploy Budget</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="scale-up" delay={0} className="bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🔍</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Google Search Ads</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Capturing active search intent. Exact match keyword targeting and strict negative keyword lists to capture buyers at decision time.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={150} className="bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🛍️</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Performance Max</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Leveraging Google's multi-channel AI with clean data signals to scale revenue across Search, YouTube, Display, and Gmail.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={300} className="bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💼</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">LinkedIn B2B Ads</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Account-Based Marketing (ABM). Target exact job titles, company sizes, and key decision-makers with high-converting offers.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES WE SCALE */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Industries We Scale Paid Media For</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['E-Commerce & DTC', 'B2B SaaS Products', 'High-Ticket Lead Gen', 'FinTech Applications', 'Healthcare Clinics', 'Professional Services', 'Real Estate Brands', 'EdTech Courses'].map((ind, i) => (
              <ScrollReveal key={i} delay={i*50} animation="scale-up" className="bg-[#FAFBFF] border border-gray-100 p-6 rounded-2xl flex items-center justify-center hover:border-cyan-300 transition-colors">
                <span className="font-bold text-gray-700 text-sm">{ind}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: PROCESS WORKFLOW */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto text-center">
          <ScrollReveal className="mb-24">
            <span className="text-cyan-600 font-black tracking-widest text-[10px] uppercase block mb-4">Methodology</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">From Audit to Autopilot</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {[
              { step: "01", title: "Forensic Audit", desc: "Full account teardown. We identify wasted spend, poor structural setups, and missed intent." },
              { step: "02", title: "Restructure", desc: "Rebuilding campaigns logically aligned to exactly how your buyers actually search." },
              { step: "03", title: "Creative Testing", desc: "Rapid A/B testing of ad copy, visuals, and landing pages to find the highest converting variants." },
              { step: "04", title: "Scale Winners", desc: "We aggressively double down on campaigns that compound ROAS, and ruthlessly cut what doesn't." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 200} className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm text-center">
                <div className="w-20 h-20 bg-cyan-50 text-cyan-600 font-black text-2xl rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">{item.step}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: METRICS STRIP */}
      <section className="w-full bg-[#0B0F19] py-24 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <div className="pt-6 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-cyan-400 mb-3">4.2x</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Average ROAS Delivered</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-blue-400 mb-3">-38%</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Average CPA Reduction</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-indigo-400 mb-3">+61%</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Average Click-Through Lift</p>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQs */}
      <section className="w-full py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Frequently Asked Questions</h2>
          </ScrollReveal>

          <div className="flex flex-col gap-6">
            <ScrollReveal animation="fade-up" delay={0} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">How quickly will I see ROI?</h4>
              <p className="text-base text-gray-500 leading-relaxed">Unlike SEO, SEM generates immediate traffic. However, the first 2-4 weeks are our learning phase where we gather conversion data to feed bidding algorithms. Optimized ROI stabilizes month 2 onwards.</p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Who owns the ad accounts?</h4>
              <p className="text-base text-gray-500 leading-relaxed">You do. We believe in absolute transparency. You retain 100% ownership and administrative access to all ad accounts, tracking pixels, and historical data generated.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 9: WHITE CONTACT FORM SECTION */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-100 text-cyan-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> Free Account Audit
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to stop <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">bleeding ad spend?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Let our media buyers inspect your ad account. We'll find wasted spend and show you the exact structural gaps within 24 hours.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 text-xl">📞</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>🇮🇳 +91-6366666760</div>
              </div>
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">✉️</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Support</p>support@weoads.com</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Request Ad Audit</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-cyan-600">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-cyan-600">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-cyan-600">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Monthly Ad Budget</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. $5k/mo" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Account Details <span className="text-cyan-600">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Which channels are you running? What is the core issue?" rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-cyan-500 transition-all resize-none placeholder-gray-400"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input id="sem-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer accent-cyan-600" />
                  <label htmlFor="sem-privacy" className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5">
                    I agree to the <span className="text-cyan-600 font-bold hover:underline">Privacy Policy</span>.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                  {isSubmitting ? 'Requesting...' : 'Get Free Audit'}
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