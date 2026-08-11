"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

// Smooth Scroll Reveal Animation Component
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

  let baseClass = "transition-all duration-1000 ease-out w-full ";
  if (animation === "fade-up") {
    baseClass += isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12";
  } else if (animation === "fade-right") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12";
  } else if (animation === "fade-left") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12";
  } else if (animation === "scale-up") {
    baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
  } else if (animation === "blur-in") {
    baseClass += isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-md translate-y-10";
  }

  return (
    <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function SocialMediaMarketingPage() {
  // ================= CONTACT FORM LOGIC (API PERFECTED) =================
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) {
      setErrorMsg("Please agree to the Privacy Policy to continue.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const apiFormData = new FormData();
      apiFormData.append('fullName', formData.fullName);
      apiFormData.append('email', formData.email);
      apiFormData.append('mobileNumber', formData.phone);
      apiFormData.append('country', formData.country || 'N/A');
      apiFormData.append('additional_text1', formData.message);
      apiFormData.append('additional_text2', 'SMM Page Form');
      apiFormData.append('receivedBy', 'WeoAds System');

      const response = await fetch('https://click.creditsdeal.com/api/leadApi', {
        method: 'POST',
        body: apiFormData,
      });

      if (response.ok) {
        setShowPopup(true);
        setFormData({ fullName: '', email: '', phone: '', country: '', message: '' });
        setPrivacyAgreed(false);
      } else {
        const errorData = await response.text();
        console.error("Server Error Details:", errorData);
        try {
          const parsedError = JSON.parse(errorData);
          setErrorMsg(parsedError.responseMessage || "Missing required fields. Please check your inputs.");
        } catch {
          setErrorMsg("Something went wrong on the server. Please try again.");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMsg("Network error. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Active testimonial index for the swipeable proof carousel below
  const [activeStory, setActiveStory] = useState(0);
  const stories = [
    { name: "Priya R.", brand: "Loomé Skincare", quote: "Our Reels went from a few hundred views to consistently hitting six figures within two months.", metric: "+312% Reach" },
    { name: "Daniel K.", brand: "Northwind Coffee Co.", quote: "They actually understand platform culture — nothing felt like a repurposed ad.", metric: "+4.8x Engagement" },
    { name: "Sasha M.", brand: "FormFit Studio", quote: "Content calendar, community replies, reporting — it finally feels handled.", metric: "+9,200 Followers" },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-[#0B0F19] overflow-x-hidden flex flex-col relative selection:bg-fuchsia-500 selection:text-white">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-grid-pattern { background-image: linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px); background-size: 40px 40px; }
        .bg-grid-dark { background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 50px 50px; }
        @keyframes subtle-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-subtle-float { animation: subtle-float 5s ease-in-out infinite; }
      `}} />

      {/* ================= SUCCESS POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out] max-h-[95vh] overflow-y-auto hide-scrollbar">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-violet-50 border-[4px] sm:border-[6px] border-violet-100 text-violet-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B0F19] mb-2 tracking-tight">Thank You!</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium mb-1">Your request has been submitted successfully.</p>
            <p className="text-sm text-gray-500 mb-8">Our team is reviewing your details and will get back to you shortly.</p>
            
            <div className="bg-[#FFF9F5] border border-[#FFE8D6] rounded-2xl p-5 sm:p-6 text-left mb-8">
              <h3 className="text-base font-black text-[#0B0F19] mb-4">What happens next?</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-[#9333EA] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">1</span><p className="text-gray-700 text-sm font-semibold">Our expert will review your business requirements.</p></div>
                <div className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-[#9333EA] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">2</span><p className="text-gray-700 text-sm font-semibold">You'll receive a confirmation email with a ticket ID.</p></div>
                <div className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-[#9333EA] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">3</span><p className="text-gray-700 text-sm font-semibold">Our team will contact you within 24 hours to discuss strategy.</p></div>
              </div>
            </div>
            
            <button onClick={() => setShowPopup(false)} className="w-full sm:w-auto bg-[#0B0F19] text-white px-10 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">Close</button>
          </div>
        </div>
      )}

      {/* ================= ERROR POPUP ================= */}
      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Oops!</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">Try Again</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes platformMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-platform-marquee { animation: platformMarquee 28s linear infinite; }
      `}} />

      {/* ================= 1. HERO — BENTO / SCATTERED POST MOCKUPS ================= */}
      <section className="relative w-full pt-20 pb-28 px-6 md:px-12 overflow-hidden bg-gradient-to-b from-[#FDF4FF] to-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          <ScrollReveal animation="fade-right" className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 bg-white border border-fuchsia-100 text-fuchsia-600 px-5 py-2 rounded-full mb-8 shadow-sm text-[10px] font-bold tracking-widest uppercase">
              <span className="text-sm">✦</span> Content That Performs
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[#111827] leading-[1.05] tracking-tight mb-6">
              Stop posting.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 via-violet-500 to-fuchsia-600">Start converting.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-10">
              Social media that's built for the algorithm and the P&amp;L at the same time — strategy, creative, community, and reporting under one roof.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-fuchsia-500/30 hover:scale-105 active:scale-95 transition-all duration-300">
                Start My Content Plan
              </a>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <span className="flex items-center gap-1"><span className="text-base">∞</span> Meta Partner</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="flex items-center gap-1"><span className="text-base">in</span> LinkedIn Experts</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Scattered post mockups instead of one big gradient card */}
          <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-6 relative h-[420px] hidden md:block">
            <div className="absolute top-0 left-6 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 rotate-[-8deg]" style={{ animation: 'subtle-float 6s ease-in-out infinite' }}>
              <div className="w-full h-28 rounded-xl bg-gradient-to-br from-fuchsia-400 to-violet-400 mb-2"></div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">♡ 12.4k <span className="text-gray-300">·</span> 💬 340</div>
            </div>
            <div className="absolute top-14 right-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 rotate-[6deg]" style={{ animation: 'subtle-float 7s ease-in-out infinite', animationDelay: '0.5s' }}>
              <div className="w-full h-32 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-300 mb-2"></div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">▶ 1.2M views</div>
            </div>
            <div className="absolute bottom-4 left-16 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 rotate-[3deg]" style={{ animation: 'subtle-float 5.5s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-fuchsia-300 to-pink-300 mb-2"></div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gray-600">↗ 8.5% engagement</div>
            </div>
            <div className="absolute -bottom-2 right-10 bg-[#0B0F19] text-white rounded-2xl shadow-xl p-4 w-40" style={{ animation: 'subtle-float 6.5s ease-in-out infinite', animationDelay: '1.5s' }}>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">This Month</p>
              <p className="text-lg font-black text-fuchsia-400">+312% <span className="text-xs text-gray-400 font-medium">reach</span></p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 2. PLATFORM MARQUEE ================= */}
      <div className="w-full bg-[#0B0F19] py-5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-platform-marquee w-max">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-14 pr-14">
              {["Instagram", "TikTok", "LinkedIn", "YouTube Shorts", "Pinterest", "X / Twitter", "Facebook"].map(p => (
                <span key={p} className="text-sm font-black uppercase tracking-widest text-gray-500 hover:text-fuchsia-400 transition-colors">{p}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= 3. MASONRY SERVICES GRID ================= */}
      <section id="methodology" className="w-full py-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal animation="fade-up" className="max-w-xl mb-14">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-fuchsia-600">The Full Suite</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Everything a modern brand needs on social</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎤", t: "Strategy & Voice", d: "A content pillar system and brand voice guide so every post feels intentional.", mt: "lg:mt-0" },
              { icon: "🎬", t: "Content Production", d: "Short-form video, carousels, and static creative shot and edited for each platform's native feel.", mt: "lg:mt-10" },
              { icon: "📅", t: "Publishing & Scheduling", d: "A managed calendar with optimal posting windows per platform.", mt: "lg:mt-4" },
              { icon: "💬", t: "Community Management", d: "Real replies to comments and DMs — not canned responses.", mt: "lg:mt-8" },
              { icon: "📊", t: "Analytics & Reporting", d: "Monthly reporting tied to reach, engagement, and conversions, not vanity metrics.", mt: "lg:mt-0" },
              { icon: "⚡", t: "Paid Social Boosting", d: "Strategic ad spend behind top-performing organic content.", mt: "lg:mt-6" },
            ].map(card => (
              <ScrollReveal key={card.t} animation="fade-up" className={card.mt}>
                <div className="group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 hover:border-fuchsia-200 transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-fuchsia-50 text-fuchsia-600 flex items-center justify-center text-xl mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform">{card.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{card.t}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. CONTENT CALENDAR MOCKUP ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#0B0F19] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-fuchsia-600/20 rounded-full blur-[110px]"></div>
        <div className="max-w-[1100px] mx-auto relative">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-fuchsia-400">Behind The Scenes</span>
            <h2 className="text-2xl md:text-4xl font-black mt-3">Your week, planned before it starts</h2>
          </ScrollReveal>

          <ScrollReveal animation="scale-up">
            <div className="bg-[#160B28] border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl overflow-x-auto hide-scrollbar">
              <div className="grid grid-cols-7 gap-3 min-w-[700px]">
                {["MON","TUE","WED","THU","FRI","SAT","SUN"].map((d, i) => (
                  <div key={d} className="flex flex-col gap-2">
                    <p className="text-[10px] font-bold text-gray-500 text-center uppercase tracking-widest">{d}</p>
                    <div className={`rounded-xl p-3 h-24 flex flex-col justify-between text-[10px] font-bold ${
                      [1,3,5].includes(i) ? 'bg-fuchsia-600/20 border border-fuchsia-500/30 text-fuchsia-300' :
                      [2,4].includes(i) ? 'bg-violet-600/20 border border-violet-500/30 text-violet-300' :
                      'bg-white/5 border border-white/10 text-gray-500'
                    }`}>
                      <span>{[1,3,5].includes(i) ? '🎬 Reel' : [2,4].includes(i) ? '📝 Carousel' : i === 6 ? '💬 Engage' : '—'}</span>
                      {[1,2,3,4,5].includes(i) && <span className="text-gray-500">9:00 AM</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 5. RESULTS CAROUSEL (interactive) ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF]">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-fuchsia-600">Client Stories</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 mb-12">Real brands, real numbers</h2>
          </ScrollReveal>

          <ScrollReveal animation="scale-up">
            <div className="bg-white border border-gray-100 rounded-3xl p-10 md:p-14 shadow-sm relative min-h-[260px] flex flex-col justify-center">
              <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-6">"{stories[activeStory].quote}"</p>
              <p className="text-sm font-bold text-gray-500 mb-1">{stories[activeStory].name} · <span className="text-gray-400 font-medium">{stories[activeStory].brand}</span></p>
              <span className="inline-block mx-auto mt-4 bg-fuchsia-50 text-fuchsia-600 text-xs font-black px-4 py-1.5 rounded-full w-fit">{stories[activeStory].metric}</span>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {stories.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setActiveStory(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${activeStory === i ? 'w-8 bg-fuchsia-600' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Show story ${i + 1}`}
                ></button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 6. PRICING — TILTED CARDS ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-fuchsia-600">Packages</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Simple, growth-ready pricing</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {[
              { n: "Spark", price: "$799", d: "For brands starting fresh on social.", features: ["2 Platforms", "12 Posts / mo", "Monthly Report"], rot: "md:-rotate-2", hi: false },
              { n: "Momentum", price: "$1,899", d: "For brands ready to scale reach and revenue.", features: ["4 Platforms", "24 Posts / mo", "Community Mgmt", "Paid Boosting"], rot: "md:rotate-0 md:scale-105", hi: true },
              { n: "Studio", price: "$3,499", d: "For brands that need a full content engine.", features: ["Unlimited Platforms", "Daily Content", "Dedicated Editor", "Weekly Strategy Calls"], rot: "md:rotate-2", hi: false },
            ].map(plan => (
              <ScrollReveal key={plan.n} animation="fade-up">
                <div className={`group bg-white border ${plan.hi ? 'border-fuchsia-500 border-2 shadow-xl' : 'border-gray-200 shadow-sm'} rounded-3xl p-8 h-full flex flex-col justify-between transition-all duration-500 hover:rotate-0 hover:scale-105 hover:shadow-2xl ${plan.rot}`}>
                  <div>
                    {plan.hi && <span className="inline-block bg-fuchsia-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4">Most Popular</span>}
                    <h3 className="text-xl font-black text-gray-900 mb-1">{plan.n}</h3>
                    <p className="text-xs text-gray-500 font-medium mb-6">{plan.d}</p>
                    <div className="text-3xl font-black text-gray-900 mb-6">{plan.price}<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                    <ul className="space-y-3 text-xs font-medium text-gray-600 mb-8">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2">
                          <span className={plan.hi ? 'text-fuchsia-600' : 'text-gray-400'}>✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a href="#contact" className={`w-full py-3.5 rounded-xl font-bold text-xs text-center block transition-all duration-300 ${plan.hi ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700' : 'bg-gray-900 text-white hover:bg-fuchsia-700'}`}>
                    Get Started
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. CONTACT FORM (PERFECTED API LOGIC) ================= */}
      <section id="contact" className="w-full py-24 px-6 md:px-12 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Illustration */}
          <div className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="w-64 h-64 md:w-80 md:h-80 relative mb-8">
              <div className="absolute inset-0 bg-fuchsia-50 rounded-full opacity-50 blur-3xl"></div>
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                {/* Envelope Illustration */}
                <div className="w-40 h-28 bg-white border-2 border-fuchsia-400 rounded-lg shadow-lg relative -rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 w-full h-1/2 border-b-2 border-fuchsia-400 flex justify-center bg-fuchsia-50/30">
                    <div className="w-[120%] h-px bg-fuchsia-400 absolute rotate-12 transform origin-left"></div>
                    <div className="w-[120%] h-px bg-fuchsia-400 absolute -rotate-12 transform origin-right"></div>
                  </div>
                  <div className="flex flex-col gap-2 mt-8 w-full px-4">
                    <div className="w-3/4 h-1.5 bg-fuchsia-200 rounded-full"></div>
                    <div className="w-1/2 h-1.5 bg-purple-200 rounded-full"></div>
                  </div>
                </div>
                <div className="absolute top-1/4 right-4 w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-4 w-4 h-4 rounded-full bg-cyan-400"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-0 right-[-10%] bg-white border border-gray-100 shadow-md px-4 py-2 rounded-full flex items-center gap-2 animate-subtle-float">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  <span className="text-[10px] font-bold text-gray-700">24h Response</span>
                </div>
              </div>
            </div>
            
            <div className="bg-fuchsia-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-md mb-2">
              500+ Happy Clients
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-fuchsia-900/5 border border-gray-100 relative">
            <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif">Get in Touch</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">We'd love to hear from you. Send us a message!</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country <span className="text-red-500">*</span></label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message <span className="text-red-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all resize-none"></textarea>
              </div>

              <div className="flex items-start gap-3 mt-2">
                <div className="flex items-center h-5">
                  <input id="smm-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 focus:ring-fuchsia-500 cursor-pointer" />
                </div>
                <label htmlFor="smm-privacy" className="text-[11px] font-medium text-gray-500 cursor-pointer mt-[2px]">
                  I agree to the <span className="text-fuchsia-500 underline font-bold cursor-pointer">privacy policy</span>.
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full bg-[#9333EA] text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-[#7E22CE] transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                <svg className="w-4 h-4 -rotate-45 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                {isSubmitting ? 'Sending Request...' : 'Send Message'}
              </button>

              <div className="text-[10px] text-gray-400 font-medium text-center tracking-widest uppercase flex items-center justify-center gap-4 mt-2">
                <span>SECURE FORM</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>24H RESPONSE</span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span>NO SPAM</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}