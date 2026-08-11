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
      className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-sm opacity-80 hover:opacity-100 transition-[height,opacity] duration-700 ease-out"
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

  // Active channel tab for the console-style channel switcher below
  const [activeChannel, setActiveChannel] = useState('google');
  const channelData: Record<string, { label: string; icon: string; desc: string; stat: string }> = {
    google: { label: 'Google Ads', icon: '🔍', desc: 'Search, Shopping, and Performance Max campaigns built around commercial intent.', stat: '4.2x avg. ROAS' },
    meta: { label: 'Meta Ads', icon: '∞', desc: 'Feed, Reels, and retargeting creative tuned for scroll-stopping performance.', stat: '2.1x avg. ROAS' },
    linkedin: { label: 'LinkedIn Ads', icon: 'in', desc: 'ABM and lead-gen campaigns targeting the exact job titles that convert.', stat: '$38 avg. CPL' },
    bing: { label: 'Microsoft Ads', icon: 'B', desc: 'Low-competition search inventory that stretches budget further.', stat: '-18% avg. CPC' },
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
          0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(6,182,212,0); }
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

      {/* ================= 1. HERO — CONSOLE ================= */}
      <section className="relative w-full pt-20 pb-24 px-6 md:px-12 bg-[#FAFBFF] overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-[0.35]" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <ScrollReveal animation="fade-right" className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 bg-white border border-cyan-100 text-cyan-700 px-4 py-1.5 rounded-full mb-6 shadow-sm text-[10px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Live Campaign Management
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[#111827] leading-[1.05] tracking-tight mb-6">
              Performance Search<br />
              <span className="text-cyan-600">Marketing.</span> Engineered.
            </h1>
            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mb-8">
              We run paid search like an engineering discipline — hypothesis, test, measure, scale. Every dollar is accountable to a number on a dashboard, not a vibe.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a href="#audit" className="shine-btn w-full sm:w-auto bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:shadow-cyan-500/30 hover:-translate-y-1 transition-all duration-300 text-center">
                Get Your Free Audit
              </a>
              <a href="#channels" className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 text-center">
                See Channels
              </a>
            </div>
          </ScrollReveal>

          {/* Terminal / console mock instead of a generic gradient hero card */}
          <ScrollReveal animation="fade-left" delay={150} className="lg:col-span-6">
            <div className="bg-[#0F172A] rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1e293b] border-b border-slate-700/50">
                <span className="w-3 h-3 rounded-full bg-red-400/70"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400/70"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400/70"></span>
                <span className="ml-3 text-[10px] font-mono text-slate-400">weoads — campaign-monitor.sh</span>
              </div>
              <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed">
                <p className="text-slate-500">$ weoads status --account acme-corp</p>
                <p className="text-cyan-400 mt-2">✓ Google Ads .......... <span className="text-slate-300">Optimizing</span></p>
                <p className="text-cyan-400">✓ Meta Ads ............ <span className="text-slate-300">Optimizing</span></p>
                <p className="text-cyan-400">✓ LinkedIn Ads ........ <span className="text-slate-300">Scaling</span></p>
                <p className="text-slate-500 mt-3">$ weoads metrics --last 30d</p>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase">ROAS</p>
                    <p className="text-emerald-400 font-black text-lg">4.2x</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase">CPA</p>
                    <p className="text-cyan-400 font-black text-lg">-38%</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px] uppercase">CTR</p>
                    <p className="text-amber-400 font-black text-lg">+61%</p>
                  </div>
                </div>
                <p className="text-slate-600 mt-4">_<span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse align-middle"></span></p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 2. KPI CONSOLE TILES ================= */}
      <section className="w-full py-20 px-6 md:px-12 bg-[#0F172A] text-white">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal animation="fade-up" className="mb-12">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-cyan-400">Live Dashboard</span>
            <h2 className="text-2xl md:text-3xl font-black mt-3">The numbers we're accountable to</h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Avg. ROAS", value: 4.2, decimals: 1, suffix: "x", bars: [40, 55, 45, 70, 60, 85, 92] },
              { label: "CTR Lift", value: 61, suffix: "%", bars: [30, 35, 50, 45, 65, 70, 88] },
              { label: "CPA Reduction", value: 38, suffix: "%", bars: [80, 70, 65, 55, 45, 38, 30] },
              { label: "Conversion Rate", value: 9.4, decimals: 1, suffix: "%", bars: [20, 30, 28, 45, 55, 68, 80] },
            ].map((kpi) => (
              <ScrollReveal key={kpi.label} animation="fade-up">
                <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl p-5 hover:border-cyan-500/40 transition-all duration-300">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{kpi.label}</p>
                  <p className="text-2xl font-black text-cyan-400 mb-3">
                    <AnimatedCounter end={kpi.value} decimals={kpi.decimals || 0} suffix={kpi.suffix} />
                  </p>
                  <div className="flex items-end gap-1 h-10">
                    {kpi.bars.map((h, i) => <GrowBar key={i} height={h} delay={i * 80} />)}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. CHANNEL SWITCHER (interactive tabs) ================= */}
      <section id="channels" className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-cyan-600">Where We Run Media</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">One team. Every channel.</h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up">
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {Object.entries(channelData).map(([key, ch]) => (
                <button
                  key={key}
                  onClick={() => setActiveChannel(key)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 border ${
                    activeChannel === key
                      ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-cyan-300 hover:text-cyan-700'
                  }`}
                >
                  {ch.icon} {ch.label}
                </button>
              ))}
            </div>

            <div className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-10 md:p-14 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-black text-gray-900 mb-3">{channelData[activeChannel].label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{channelData[activeChannel].desc}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Client Benchmark</p>
                <p className="text-2xl font-black text-cyan-600">{channelData[activeChannel].stat}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 4. PROCESS — HORIZONTAL STEPPER ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-cyan-600">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">From audit to autopilot</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {[
              { t: "Audit", d: "Full account teardown — wasted spend, missed intent, structural gaps." },
              { t: "Rebuild", d: "Restructured campaigns aligned to how your buyers actually search." },
              { t: "Test", d: "Rapid creative and bidding experiments, measured weekly." },
              { t: "Scale", d: "Double down on what compounds; cut what doesn't." },
            ].map((step, i) => (
              <ScrollReveal key={step.t} animation="fade-up" delay={i * 120} className="relative px-4">
                {i < 3 && <DrawLine className="hidden md:block absolute top-5 left-1/2 w-full" />}
                <div className="w-10 h-10 rounded-full bg-[#0F172A] text-cyan-400 flex items-center justify-center font-black text-sm mb-4 relative z-10 mx-auto md:mx-0">
                  {i + 1}
                </div>
                <h4 className="font-bold text-gray-900 mb-2 text-center md:text-left">{step.t}</h4>
                <p className="text-xs text-gray-500 leading-relaxed text-center md:text-left">{step.d}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. WEOADS VS TYPICAL AGENCY ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-14">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-cyan-600">The Difference</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">WeoAds vs. a typical agency</h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-[#0F172A] text-white p-8 md:p-10">
                <h3 className="font-black text-cyan-400 mb-6 uppercase text-xs tracking-widest">WeoAds</h3>
                <ul className="space-y-4 text-sm font-medium">
                  {[
                    "Dedicated strategist who knows your account by name",
                    "Weekly optimization, not monthly check-ins",
                    "Full transparency into spend and account access",
                    "Creative + copy testing built into every sprint",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="text-cyan-400 font-black">✓</span>
                      <span className="text-slate-200">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FAFBFF] p-8 md:p-10">
                <h3 className="font-black text-gray-400 mb-6 uppercase text-xs tracking-widest">Typical Agency</h3>
                <ul className="space-y-4 text-sm font-medium">
                  {[
                    "Junior account manager, rotated every few months",
                    "\"Set and forget\" campaigns reviewed monthly",
                    "Black-box reporting with vague summaries",
                    "One static ad set running for a full quarter",
                  ].map(t => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="text-gray-300 font-black">✕</span>
                      <span className="text-gray-500">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 6. PRICING — CONSOLE CARDS ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-cyan-600">Management Fees</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Pick your management tier</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: "Starter", fee: "$500", spend: "Up to $10k/mo ad spend", features: ["1 Channel Managed", "Monthly Reporting", "Email Support"], hi: false },
              { n: "Growth", fee: "$1,200", spend: "Up to $40k/mo ad spend", features: ["Up to 3 Channels", "Weekly Optimization", "Dedicated Strategist", "Creative Testing"], hi: true },
              { n: "Scale", fee: "Custom", spend: "$40k+/mo ad spend", features: ["Unlimited Channels", "Daily Monitoring", "Priority Support", "Quarterly Strategy Review"], hi: false },
            ].map(plan => (
              <ScrollReveal key={plan.n} animation="fade-up">
                <div className={`rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col ${plan.hi ? 'border-2 border-cyan-500' : 'border border-gray-200'}`}>
                  <div className="bg-[#0F172A] px-6 py-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70"></span>
                    <span className="ml-2 text-[10px] font-mono text-slate-400">{plan.n.toLowerCase()}.plan</span>
                  </div>
                  <div className="bg-white p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-black text-gray-900 mb-1">{plan.n}</h3>
                      <p className="text-xs text-gray-500 font-medium mb-6">{plan.spend}</p>
                      <div className="text-3xl font-black text-gray-900 mb-6">{plan.fee}<span className="text-xs text-gray-400 font-normal">{plan.fee !== 'Custom' ? '/mo' : ''}</span></div>
                      <ul className="space-y-3 text-xs font-medium text-gray-600 mb-8">
                        {plan.features.map(f => (
                          <li key={f} className="flex items-center gap-2">
                            <span className={plan.hi ? 'text-cyan-600' : 'text-gray-400'}>✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a href="#audit" className={`w-full py-3.5 rounded-xl font-bold text-xs text-center block transition-all duration-300 hover:scale-[1.03] ${plan.hi ? 'bg-cyan-600 text-white hover:bg-cyan-700' : 'bg-gray-900 text-white hover:bg-cyan-700'}`}>
                      Get Started
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. CONTACT SECTION (With Perfected API Form) ================= */}
      <section id="audit" className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] relative overflow-hidden border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Illustration & Trust Indicators */}
          <ScrollReveal animation="fade-right" className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="w-64 h-64 md:w-80 md:h-80 relative mb-8">
              {/* Decorative Envelope/Audit Graphic */}
              <div className="absolute inset-0 bg-cyan-100 rounded-full opacity-50 blur-3xl animate-pulse"></div>
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <div className="w-32 h-24 bg-white border-2 border-cyan-400 rounded-lg shadow-lg relative -rotate-6 transform hover:rotate-0 transition-transform duration-500 animate-float">
                  <div className="absolute top-0 left-0 right-0 h-12 border-b-2 border-cyan-400 border-dashed rounded-t-lg bg-cyan-50/50 flex items-center justify-center overflow-hidden">
                    <div className="w-[120%] h-px bg-cyan-400 rotate-12 absolute"></div>
                    <div className="w-[120%] h-px bg-cyan-400 -rotate-12 absolute"></div>
                  </div>
                  <div className="absolute bottom-3 left-4 w-16 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="absolute bottom-6 left-4 w-24 h-1.5 bg-cyan-200 rounded-full"></div>
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

            <div className="bg-cyan-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md mb-2">
              500+ Happy Clients
            </div>
            <p className="text-gray-500 text-sm font-medium">Join businesses that trust WeoAds to handle their SEM budget.</p>
          </ScrollReveal>

          {/* Right Side: The Perfected Form */}
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-cyan-900/5 border border-gray-100 relative hover:shadow-cyan-900/10 transition-shadow duration-500">
              <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif">Get in Touch</h3>
              <p className="text-sm text-gray-500 font-medium mb-8">We'd love to hear from you. Send us a message!</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all focus:scale-[1.01]" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all focus:scale-[1.01]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all focus:scale-[1.01]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country <span className="text-red-500">*</span></label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all focus:scale-[1.01]" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none focus:scale-[1.01]"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <div className="flex items-center h-5">
                    <input id="sem-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 cursor-pointer" />
                  </div>
                  <label htmlFor="sem-privacy" className="text-[11px] font-medium text-gray-500 cursor-pointer mt-[2px]">
                    I agree to the <span className="text-cyan-500 underline font-bold cursor-pointer">privacy policy</span>.
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