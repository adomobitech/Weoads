"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

/* =====================================================================
   ANIMATION PRIMITIVES
   ===================================================================== */

// ScrollReveal — now supports more entrance styles + optional stagger index
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
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  let baseClass = "transition-all duration-1000 ease-out w-full will-change-transform ";
  if (animation === "fade-up") {
    baseClass += isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12";
  } else if (animation === "fade-right") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12";
  } else if (animation === "fade-left") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12";
  } else if (animation === "scale-up") {
    baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
  } else if (animation === "blur-up") {
    baseClass += isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-8 blur-sm";
  } else if (animation === "rotate-in") {
    baseClass += isVisible ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-3 scale-95";
  } else if (animation === "pop") {
    baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75";
  }

  return (
    <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Counts up a number when it scrolls into view
const AnimatedCounter = ({ end, duration = 1600, prefix = "", suffix = "", decimals = 0 }: any) => {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          setDone(true);
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * end);
            if (progress < 1) requestAnimationFrame(tick);
            else setValue(end);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, done]);

  return (
    <span ref={ref}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </span>
  );
};

// Animates a horizontal bar's height/width from 0 once visible (used for the fake dashboard chart)
const GrowBar = ({ height, delay = 0 }: any) => {
  const [grown, setGrown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setGrown(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm opacity-80 hover:opacity-100 transition-[height,opacity] duration-700 ease-out"
      style={{ height: grown ? `${height}%` : '4%' }}
    ></div>
  );
};

// Draws a horizontal connector line left-to-right once visible
const DrawLine = ({ className = "" }: any) => {
  const [drawn, setDrawn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="h-px bg-gray-300 transition-all duration-[1400ms] ease-out"
        style={{ width: drawn ? '100%' : '0%' }}
      ></div>
    </div>
  );
};

export default function SEMPage() {
  // ================= CONTACT FORM LOGIC (Imported from Contact Page) =================
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
      apiFormData.append('additional_text2', 'SEM Page Contact Form');
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

  return (
    <main className="min-h-screen bg-white font-sans text-[#0B0F19] overflow-x-hidden flex flex-col relative">
      <Navbar />

      {/* Global animation keyframes + helpers */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
        }
        @keyframes scale-up {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        @keyframes grid-pan {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes ping-soft {
          0% { transform: scale(1); opacity: 0.6; }
          70%, 100% { transform: scale(2.2); opacity: 0; }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-blob { animation: blob 9s ease-in-out infinite; }
        .animate-blob-delay { animation: blob 9s ease-in-out infinite; animation-delay: 2.5s; }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s ease infinite; }
        .animate-grid-pan { animation: grid-pan 6s linear infinite; }
        .animate-scale-up { animation: scale-up 0.3s ease-out; }

        .shine-btn { position: relative; overflow: hidden; }
        .shine-btn::after {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-120%) skewX(-15deg);
        }
        .shine-btn:hover::after { animation: shimmer 1.1s ease; }

        .hover-lift { transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.35s ease; }
        .hover-lift:hover { transform: translateY(-6px); }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}} />

      {/* ================= PREMIUM SUCCESS POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl animate-scale-up max-h-[95vh] overflow-y-auto hide-scrollbar">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-50 border-[4px] sm:border-[6px] border-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-5 relative">
              <span className="absolute inset-0 rounded-full bg-orange-300" style={{ animation: 'ping-soft 1.8s ease-out infinite' }}></span>
              <svg className="w-8 h-8 sm:w-10 sm:h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B0F19] mb-2 tracking-tight">Thank You!</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium mb-1">Your request has been submitted successfully.</p>
            <p className="text-sm text-gray-500 mb-8">Our team is reviewing your details and will get back to you shortly.</p>
            <div className="bg-[#FFF9F5] border border-[#FFE8D6] rounded-2xl p-5 sm:p-6 text-left mb-8">
              <h3 className="text-base font-black text-[#0B0F19] mb-4">What happens next?</h3>
              <div className="flex flex-col gap-4">
                {[
                  "Our expert will review your business requirements.",
                  "You'll receive a confirmation email with a ticket ID.",
                  "Our team will contact you within 24 hours to discuss strategy.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3 opacity-0" style={{ animation: `scale-up 0.4s ease-out ${0.15 * (i + 1)}s forwards` }}>
                    <span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">{i + 1}</span>
                    <p className="text-gray-700 text-sm font-semibold">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-3">
              <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors hover:scale-[1.02] active:scale-[0.98]">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CUSTOM ERROR POPUP ================= */}
      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-scale-up">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-[float_2.4s_ease-in-out_infinite]">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Oops!</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors hover:scale-[1.02] active:scale-[0.98]">Try Again</button>
          </div>
        </div>
      )}

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full pt-20 pb-28 px-6 md:px-12 text-center bg-[#FAFBFF] overflow-hidden">
        {/* Ambient animated blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl animate-blob"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-16 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl animate-blob-delay"></div>

        <ScrollReveal animation="scale-up" className="max-w-[900px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50/50 border border-blue-100 text-blue-600 px-4 py-1.5 rounded-full mb-8 shadow-sm animate-float">
            <span className="text-sm text-blue-500">🛡️</span>
            <span className="text-[11px] font-bold tracking-widest uppercase">Certified Google Partner Agency</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[#111827] leading-[1.1] tracking-tight mb-6">
            <ScrollReveal animation="fade-up" delay={80}><span className="inline-block">Performance Search</span></ScrollReveal>{" "}
            <br className="hidden md:block" />
            <ScrollReveal animation="fade-up" delay={180}><span className="inline-block">Marketing.</span></ScrollReveal>
            <br />
            <ScrollReveal animation="fade-up" delay={300}>
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text animate-gradient-x">
                Convert Searches Into <br className="hidden md:block" /> Customers.
              </span>
            </ScrollReveal>
          </h1>

          <ScrollReveal animation="fade-up" delay={420}>
            <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Stop wasting budget on low-intent clicks. We design search-first campaigns that reach buyers exactly when they intend to purchase and drive measurable ROI.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={540}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#audit" className="shine-btn group w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                Request Free Audit <span className="rotate-45 -mt-0.5 inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">&uarr;</span>
              </Link>
              <Link href="#process" className="group w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                Our Process <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </ScrollReveal>
        </ScrollReveal>
      </section>

      {/* ================= 2. DARK STATS & FEATURES ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#0F172A] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 animate-grid-pan"></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

          {/* Left Side Content */}
          <ScrollReveal animation="fade-right" className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1 rounded-md mb-6 text-[10px] font-bold tracking-widest uppercase">
              <span className="text-xs">📢</span> INSTANT VELOCITY
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              Don't Wait for Rankings. <br />
              <span className="text-blue-400">Own the Top Spot Today.</span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
              SEO takes months. <strong className="text-white">Google Ads</strong> delivers revenue tomorrow. We manage the complexity of the Google Marketing Platform—bidding, quality scores, and negative keywords—so you focus on handling the leads.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: "⏱️", title: "Instant Visibility", text: "Skip the waiting period. Get seen by high-intent customers immediately." },
                { icon: "🎯", title: "Laser Targeting", text: "Target by keyword, location, device, and even competitor names." },
                { icon: "✨", title: "Smart Retargeting", text: "Bring back 98% of visitors who didn't convert the first time." },
                { icon: "$", title: "Cost Control", text: "Pay only for clicks. We optimize for the lowest possible CPC." },
              ].map((f, i) => (
                <ScrollReveal key={f.title} animation="fade-up" delay={i * 120} className="!w-auto">
                  <div className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-blue-400 transition-all duration-300 group-hover:bg-blue-500/20 group-hover:border-blue-400/40 group-hover:scale-110">{f.icon}</div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{f.title}</h4>
                      <p className="text-sm text-gray-400 leading-snug">{f.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Side Visual Dashboard */}
          <div className="lg:col-span-7 flex justify-end">
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="w-full max-w-[700px] bg-[#1E293B] border border-gray-700/50 rounded-2xl p-6 shadow-2xl shadow-blue-900/20 relative hover-lift hover:shadow-blue-500/20 animate-float-slow">
                {/* Mock UI Header */}
                <div className="flex items-center justify-between mb-6 border-b border-gray-700/50 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> Live Campaign: Q4_Growth
                  </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Impressions</p>
                    <p className="text-2xl font-black text-blue-400 mb-1"><AnimatedCounter end={84.2} decimals={1} suffix="K" /></p>
                    <p className="text-[10px] font-bold text-emerald-400">▲ +12% vs 7d</p>
                  </div>
                  <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Click Rate</p>
                    <p className="text-2xl font-black text-blue-400 mb-1"><AnimatedCounter end={4.8} decimals={1} suffix="%" /></p>
                    <p className="text-[10px] font-bold text-emerald-400">▲ +0.8% vs 7d</p>
                  </div>
                  <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-4 relative transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Conv. Value</p>
                    <p className="text-2xl font-black text-orange-400 mb-1"><AnimatedCounter end={12.5} decimals={1} prefix="$" suffix="k" /></p>
                    <p className="text-[10px] font-bold text-emerald-400">▲ +24% vs 7d</p>
                  </div>
                </div>

                {/* Graph Area Mockup */}
                <div className="h-40 flex items-end gap-2 px-2 relative">
                  <div className="absolute top-4 right-4 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded shadow-lg backdrop-blur-sm z-10 flex items-center gap-1">
                    ✓ ROAS Target Met
                  </div>
                  {/* Bars */}
                  {[30, 40, 35, 50, 45, 60, 55, 75, 70, 90, 85, 100].map((height, i) => (
                    <GrowBar key={i} height={height} delay={i * 60} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ================= 3. GROWTH ENGINE (6 Grid Cards) ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Comprehensive <span className="text-blue-600">Growth Engine</span>
            </h2>
            <p className="text-gray-500 font-medium">Beyond just "running ads." We build a machine that turns $1 into $4.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎯", color: "bg-blue-50 text-blue-600", title: "Strategic Campaign Setup", text: "Blueprinted account architecture focused on lasting scale." },
              { icon: "🔍", color: "bg-blue-50 text-blue-600", title: "Precision Keyword Research", text: "Discover high-intent queries and negative keyword strategies to reduce waste." },
              { icon: "✍️", color: "bg-blue-50 text-blue-600", title: "Persuasive Ad Creatives", text: "Conversion-first headlines and descriptions that improve quality scores." },
              { icon: "📈", color: "bg-emerald-50 text-emerald-600", title: "Performance Optimization", text: "Continuous bid & audience optimization driven by live performance signals." },
              { icon: "⚡", color: "bg-orange-50 text-orange-500", title: "Landing Page CRO", text: "Conversion-focused landing templates and A/B experiments to raise CVR.", link: true },
              { icon: "📊", color: "bg-cyan-50 text-cyan-600", title: "Transparent Reporting", text: "Clear dashboards highlighting profit, ROAS, and actionable recommendations." },
            ].map((card, i) => (
              <ScrollReveal key={card.title} animation="pop" delay={i * 100}>
                <div className="bg-white border border-gray-100 shadow-sm hover-lift hover:shadow-xl hover:border-blue-100 transition-shadow rounded-2xl p-8 relative overflow-hidden group h-full">
                  {card.link && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-125"></div>}
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6`}>{card.icon}</div>
                  <h3 className={`text-lg font-bold mb-3 ${card.link ? 'text-blue-600' : 'text-gray-900'}`}>{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-1">{card.text}</p>
                  {card.link && <Link href="#" className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all mt-3">View Details &rarr;</Link>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. HOW IT WORKS & TESTIMONIALS ================= */}
      <section id="process" className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto">

          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4 block">How it Works</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              From Audit to <span className="text-blue-600">Dominance</span>
            </h2>
            <p className="text-gray-500 font-medium">Our proven 4-step framework eliminates the guesswork from paid acquisition.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative mb-32">
            {/* Connecting Line — draws in on scroll */}
            <DrawLine className="hidden lg:block absolute top-8 left-20 right-20 -z-10" />

            {[
              { icon: "📋", title: "Audit & Analysis", text: "We audit account structure, creative, and tracking to stop budget leakage." },
              { icon: "⚙️", title: "Strategic Build", text: "We deploy segmented campaigns with focused creatives and measurement in place." },
              { icon: "🚀", title: "Launch & Learn", text: "Rapid launch with tight learning loops to accelerate profitable scaling." },
              { icon: "📈", title: "Iterative Optimization", text: "Test-driven improvements that steadily lower CPA and increase conversions." },
            ].map((step, i) => (
              <ScrollReveal key={step.title} animation="pop" delay={i * 180} className="text-center relative bg-[#FAFBFF]">
                <div className="w-16 h-16 mx-auto bg-blue-50 border-4 border-white text-blue-600 flex items-center justify-center rounded-full mb-6 relative shadow-sm transition-transform duration-300 hover:scale-110 hover:shadow-md">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">{i + 1}</span>
                  {step.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed px-4">{step.text}</p>
              </ScrollReveal>
            ))}
          </div>

          {/* Testimonial Block */}
          <ScrollReveal animation="fade-up" className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">Real Revenue.</h2>
              <h2 className="text-4xl md:text-5xl font-black text-blue-600 mb-4">Not Just Clicks.</h2>
              <p className="text-gray-500 font-medium">See what happens when you pair aggressive strategy with creative excellence.</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">★★★★★</div>
              <span className="font-bold text-sm text-gray-900">5.0/5</span>
              <span className="text-xs text-gray-500">(50+ Reviews)</span>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "ROAS Increase", tagColor: "bg-blue-50 text-blue-600", stat: 312, prefix: "+", suffix: "%", quote: "Our previous agency was burning cash. WeoAds stabilized performance and increased ROAS within weeks.", initial: "A", name: "Alex D.", role: "CMO, TechFlow" },
              { tag: "Cost Per Lead", tagColor: "bg-indigo-50 text-indigo-600", stat: 45, prefix: "-", suffix: "%", quote: "Lead quality improved dramatically while cost per lead fell. Real, measurable impact.", initial: "S", name: "Sarah J.", role: "Founder, LegalEase" },
              { tag: "Revenue Generated", tagColor: "bg-emerald-50 text-emerald-600", stat: 2.4, decimals: 1, prefix: "$", suffix: "M", quote: "We scaled ad spend profitably and unlocked steady new revenue streams.", initial: "M", name: "Marcus R.", role: "Director, E-Com Brands" },
            ].map((t, i) => (
              <ScrollReveal key={t.name} animation="fade-up" delay={i * 130}>
                <div className="bg-white border border-gray-100 shadow-sm hover-lift hover:shadow-lg rounded-2xl p-8 relative h-full">
                  <span className="absolute top-6 right-6 text-4xl text-gray-100 font-serif">"</span>
                  <div className={`inline-block ${t.tagColor} text-[10px] font-bold px-3 py-1 rounded-full mb-4`}>{t.tag}</div>
                  <h3 className="text-4xl font-black text-blue-600 mb-4">
                    <AnimatedCounter end={t.stat} prefix={t.prefix} suffix={t.suffix} decimals={t.decimals || 0} />
                  </h3>
                  <p className="text-sm text-gray-600 italic mb-8">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-sm">{t.initial}</div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-900">{t.name}</h5>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 5. PRICING SECTION ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <ScrollReveal animation="fade-up" className="max-w-[1200px] mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full mb-4 text-[10px] font-bold tracking-widest uppercase">
            ⚡ Transparent Pricing
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            Invest in <span className="text-blue-600">Results</span>
          </h2>
          <p className="text-gray-500 font-medium">Straightforward management fees. No hidden percentages. No long-term contracts.</p>
        </ScrollReveal>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

          {/* Starter Plan */}
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover-lift hover:shadow-md transition-shadow h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-xs text-gray-500 mb-6">For local businesses ready to acquire nearby customers efficiently.</p>
              <div className="text-5xl font-black text-gray-900 mb-8"><span className="text-2xl align-top">$</span>199<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-600">
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Up to $3k Ad Spend</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Search & Display Networks</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Monthly Reporting</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Standard Support</li>
              </ul>
              <Link href="#audit" className="w-full block bg-[#FAFBFF] border border-gray-200 text-gray-900 py-3.5 rounded-xl font-bold text-sm text-center hover:bg-gray-50 transition-colors">
                Choose Plan &nearr;
              </Link>
            </div>
          </ScrollReveal>

          {/* Growth Plan (Recommended) */}
          <ScrollReveal animation="pop" delay={150}>
            <div className="bg-white border-2 border-blue-500 rounded-3xl p-8 shadow-xl relative -translate-y-4 hover:-translate-y-5 transition-transform duration-300" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1">
                ⚙️ RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Growth</h3>
              <p className="text-xs text-gray-500 mb-6">For brands ready to scale paid channels and systematize growth.</p>
              <div className="text-5xl font-black text-gray-900 mb-8"><span className="text-2xl align-top">$</span>499<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-600">
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Up to $10k Ad Spend</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Search, Display & YouTube</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Bi-Weekly Optimization</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> A/B Copy Testing</li>
                <li className="flex gap-3"><span className="text-blue-500">✓</span> Competitor Analysis</li>
              </ul>
              <Link href="#audit" className="shine-btn w-full block bg-blue-600 text-white py-3.5 rounded-xl font-bold text-sm text-center hover:bg-blue-700 transition-colors shadow-md">
                Choose Plan &nearr;
              </Link>
            </div>
          </ScrollReveal>

          {/* Enterprise Plan (Dark) */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="bg-[#0B0F19] text-white border border-gray-800 rounded-3xl p-8 shadow-lg hover-lift hover:shadow-xl h-full">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
              <p className="text-xs text-gray-400 mb-6">For organizations seeking broad market leadership and full-funnel excellence.</p>
              <div className="text-5xl font-black text-white mb-8"><span className="text-2xl align-top">$</span>999<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Unlimited Ad Spend</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Full-Funnel Strategy</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Dedicated Account Manager</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Landing Page Design</li>
                <li className="flex gap-3"><span className="text-emerald-400">✓</span> Daily Optimization</li>
              </ul>
              <Link href="#audit" className="w-full block bg-white text-gray-900 py-3.5 rounded-xl font-bold text-sm text-center hover:bg-gray-100 transition-colors">
                Choose Plan &nearr;
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ================= 6. CTA BANNER ================= */}
      <section className="w-full px-6 md:px-12 pb-16 pt-8">
        <ScrollReveal animation="scale-up" className="max-w-[1200px] mx-auto">
          <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 animate-gradient-x rounded-[2.5rem] p-12 md:p-20 text-center shadow-xl shadow-blue-500/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-slow"></div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 relative">Ready to scale your revenue?</h2>
            <p className="text-blue-100 text-base md:text-lg mb-10 max-w-2xl mx-auto relative">Get a free, no-obligation audit of your existing campaigns. We'll find wasted spend and missed opportunities in 48 hours.</p>
            <Link href="#audit" className="shine-btn inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform relative">
              Get Your Free Audit &nearr;
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= 7. CONTACT SECTION (With Perfected API Form) ================= */}
      <section id="audit" className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] relative overflow-hidden border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Illustration & Trust Indicators */}
          <ScrollReveal animation="fade-right" className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="w-64 h-64 md:w-80 md:h-80 relative mb-8">
              {/* Decorative Envelope/Audit Graphic */}
              <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 blur-3xl animate-pulse"></div>
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <div className="w-32 h-24 bg-white border-2 border-blue-400 rounded-lg shadow-lg relative -rotate-6 transform hover:rotate-0 transition-transform duration-500 animate-float">
                  <div className="absolute top-0 left-0 right-0 h-12 border-b-2 border-blue-400 border-dashed rounded-t-lg bg-blue-50/50 flex items-center justify-center overflow-hidden">
                    <div className="w-[120%] h-px bg-blue-400 rotate-12 absolute"></div>
                    <div className="w-[120%] h-px bg-blue-400 -rotate-12 absolute"></div>
                  </div>
                  <div className="absolute bottom-3 left-4 w-16 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="absolute bottom-6 left-4 w-24 h-1.5 bg-blue-200 rounded-full"></div>
                </div>
                <div className="absolute top-1/4 right-8 w-4 h-4 rounded-full bg-purple-400 animate-pulse"></div>
                <div className="absolute bottom-1/4 left-8 w-3 h-3 rounded-full bg-cyan-400 animate-float-slow"></div>

                {/* Floating Badge */}
                <div className="absolute top-0 right-[-20%] bg-white border border-gray-100 shadow-md px-4 py-2 rounded-full flex items-center gap-2 animate-float">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-gray-700">24h Response</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md mb-2">
              500+ Happy Clients
            </div>
            <p className="text-gray-500 text-sm font-medium">Join businesses that trust WeoAds to handle their SEM budget.</p>
          </ScrollReveal>

          {/* Right Side: The Perfected Form */}
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-blue-900/5 border border-gray-100 relative hover:shadow-blue-900/10 transition-shadow duration-500">
              <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif">Get in Touch</h3>
              <p className="text-sm text-gray-500 font-medium mb-8">We'd love to hear from you. Send us a message!</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all focus:scale-[1.01]" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all focus:scale-[1.01]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all focus:scale-[1.01]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country <span className="text-red-500">*</span></label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all focus:scale-[1.01]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none focus:scale-[1.01]"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <div className="flex items-center h-5">
                    <input id="sem-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                  </div>
                  <label htmlFor="sem-privacy" className="text-[11px] font-medium text-gray-500 cursor-pointer mt-[2px]">
                    I agree to the <span className="text-blue-500 underline font-bold cursor-pointer">privacy policy</span>.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className={`shine-btn w-full bg-[#0388B4] text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-[#026C90] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  <svg className={`w-4 h-4 -rotate-45 -mt-0.5 ${isSubmitting ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}