"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

// ScrollReveal Component for Smooth Lazy Animations on Scroll
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

  let baseClass = "transition-all duration-1000 ease-out w-full ";
  if (animation === "fade-up") {
    baseClass += isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12";
  } else if (animation === "fade-right") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12";
  } else if (animation === "fade-left") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12";
  } else if (animation === "scale-up") {
    baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
  }

  return (
    <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {typeof children === 'function' ? children(isVisible) : children}
    </div>
  );
};

// Counter Component for animating numbers up
const Counter = ({ value, isVisible, suffix = "", format = true }: any) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const duration = 2000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(easeOutQuart * value);

      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  const displayValue = format ? Math.floor(count).toLocaleString('en-US') : count.toFixed(0);

  return <span>{displayValue}{suffix}</span>;
};

export default function SEOPage() {
  // ================= AUDIT REQUEST FORM LOGIC =================
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
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        mobileNumber: formData.phone,
        country: formData.country || 'Not Provided',
        additional_text1: formData.message,
        additional_text2: 'SEO Page Audit Request',
        receivedBy: 'WeoAds System'
      };

      const response = await fetch('https://click.creditsdeal.com/api/leadApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
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
          setErrorMsg("Something went wrong on the server. Please try again or call us directly.");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      setErrorMsg("Network error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-[#0B0F19] overflow-x-hidden flex flex-col">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes ping-soft-seo {
          0% { transform: scale(1); opacity: 0.55; }
          70%, 100% { transform: scale(2.1); opacity: 0; }
        }
      `}} />

      {/* ================= AUDIT REQUEST: SUCCESS POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F19]/70 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[1.75rem] p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl animate-[fadeSlideIn_0.35s_ease-out] max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-50 border-[4px] sm:border-[6px] border-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-5 relative shrink-0">
              <span className="absolute inset-0 rounded-full bg-amber-300" style={{ animation: 'ping-soft-seo 1.8s ease-out infinite' }}></span>
              <svg className="w-8 h-8 sm:w-10 sm:h-10 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B0F19] mb-2 tracking-tight">Audit Requested!</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium mb-1">Your ranking audit is in the queue.</p>
            <p className="text-sm text-gray-500 mb-8">A strategist will review your site and follow up shortly.</p>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5 sm:p-6 text-left mb-8">
              <h3 className="text-base font-black text-[#0B0F19] mb-4">What happens next?</h3>
              <div className="flex flex-col gap-4">
                {[
                  "We run a full crawl and keyword-gap analysis on your domain.",
                  "You'll get a confirmation email with your audit reference.",
                  "Our strategist calls within 24 hours with quick-win findings.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">{i + 1}</span>
                    <p className="text-gray-700 text-sm font-semibold leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setShowPopup(false)} className="w-full sm:w-auto bg-[#0B0F19] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-emerald-700 transition-colors hover:scale-[1.02] active:scale-[0.98]">Close</button>
          </div>
        </div>
      )}

      {/* ================= AUDIT REQUEST: ERROR POPUP ================= */}
      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0F19]/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[1.75rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[fadeSlideIn_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Hold on</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors hover:scale-[1.02] active:scale-[0.98]">Try Again</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marqueeScroll 22s linear infinite; }
        @keyframes ticketFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-ticket { animation: ticketFloat 6s ease-in-out infinite; }
        @keyframes drawTimeline {
          from { height: 0%; }
          to { height: 100%; }
        }
      `}} />

      {/* ================= 1. HERO — MASTHEAD ================= */}
      <section className="relative w-full pt-16 pb-20 px-6 md:px-12 overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal animation="fade-up" className="flex items-center gap-3 mb-10 text-[10px] font-black tracking-[0.25em] uppercase text-gray-400">
            <span className="w-8 h-px bg-gray-300"></span>
            WeoAds Journal — SEO Desk
            <span className="w-8 h-px bg-gray-300"></span>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal animation="fade-right" className="lg:col-span-7">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111827] leading-[1.02] tracking-tight mb-8">
                Search is a<br />
                long game. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500">We play it</span><br />
                better.
              </h1>
              <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-lg mb-10 border-l-2 border-emerald-200 pl-5">
                No shortcuts, no black-hat tricks — just disciplined technical work, real content, and links worth earning. WeoAds builds SEO programs that compound month over month.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#playbook" className="w-full sm:w-auto bg-[#0B0F19] text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-emerald-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 text-center">
                  Read Our Playbook
                </a>
                <a href="#get-audit" className="w-full sm:w-auto text-gray-700 border border-gray-200 px-8 py-4 rounded-full font-bold text-sm hover:border-emerald-300 hover:text-emerald-700 hover:-translate-y-1 transition-all duration-300 text-center">
                  Get a Free Audit &rarr;
                </a>
              </div>
            </ScrollReveal>

            {/* Ticket-style visual */}
            <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-5 flex justify-center">
              <div className="animate-ticket w-full max-w-[340px] bg-white border border-gray-200 rounded-3xl shadow-2xl p-6 relative">
                <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4 mb-4">
                  <span className="text-[10px] font-black tracking-widest uppercase text-emerald-600">Ranking Ticket</span>
                  <span className="text-[10px] font-bold text-gray-400">#WA-4471</span>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Keyword</span>
                    <span className="text-xs font-bold text-gray-900">"project management tool"</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Position 90d ago</span>
                    <span className="text-xs font-bold text-gray-400">#38</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Position today</span>
                    <span className="text-sm font-black text-emerald-600">#3 ▲35</span>
                  </div>
                </div>
                <div className="w-full h-8 bg-gray-50 rounded-lg overflow-hidden flex items-end gap-0.5 px-1 pb-1">
                  {[20,28,22,35,30,45,40,55,60,70,80,92].map((h,i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-400 rounded-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
                  {[...Array(8)].map((_,i) => <span key={i} className="w-2 h-2 rounded-full bg-[#FAFBFF] border border-gray-200"></span>)}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 2. MARQUEE STAT STRIP ================= */}
      <div className="w-full bg-[#0B0F19] py-4 overflow-hidden border-b border-white/5">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-10 pr-10">
              {[
                "213,456+ Organic Sessions Delivered",
                "13,200+ Keyword Positions Won",
                "98/100 Average Speed Score",
                "231,580+ Qualified Leads Sourced",
                "145% Average YoY Growth",
              ].map((t, i) => (
                <span key={i} className="flex items-center gap-3 text-xs font-bold tracking-wide text-gray-300 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ================= 3. BENTO SERVICES GRID (UNIQUE UI UPDATE) ================= */}
      <section id="playbook" className="w-full py-24 px-6 md:px-12 bg-white relative overflow-hidden">
        {/* Background blobs for uniqueness */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-50/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal animation="fade-up" className="mb-14 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-[#0B0F19] mt-3 leading-[1.1] tracking-tight">
              Four disciplines. One <br className="hidden md:block"/> compounding result.
            </h2>
          </ScrollReveal>

          {/* Precision Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-fr">
            
            {/* Left Big Card - Technical SEO */}
            <ScrollReveal animation="scale-up" delay={0} className="lg:col-span-6 lg:row-span-2">
              <div className="group relative h-full w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#0B111E] to-[#0A2218] shadow-2xl flex flex-col p-10 min-h-[420px] hover:shadow-emerald-900/20 transition-all duration-500">
                {/* Glowing orb inside */}
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/30 rounded-full blur-[90px] group-hover:bg-emerald-400/40 transition-all duration-700"></div>

                <div className="w-16 h-16 rounded-[1.25rem] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-lg mb-auto group-hover:-translate-y-2 transition-transform duration-500 z-10">
                  💻
                </div>

                <div className="relative z-10 mt-12">
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Technical &<br/>On-Page SEO</h3>
                  <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-sm">
                    Site architecture, Core Web Vitals, internal linking, and metadata — the structural work that lets everything else perform.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Top Right Wide Card - AI/AEO */}
            <ScrollReveal animation="fade-left" delay={100} className="lg:col-span-6 lg:row-span-1">
              <div className="group h-full w-full rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-500">
                <div className="w-16 h-16 shrink-0 rounded-[1.25rem] bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                  🤖
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">AI / AEO / GEO Optimization</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Structured for AI answer engines, not just blue links.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bottom Right 1 - Content */}
            <ScrollReveal animation="fade-up" delay={200} className="lg:col-span-3 lg:row-span-1">
              <div className="group h-full w-full rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(245,158,11,0.1)] p-8 md:p-10 flex flex-col justify-between min-h-[240px] transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-[1.25rem] bg-amber-50 border border-amber-100/50 flex items-center justify-center text-2xl mb-8 group-hover:rotate-12 transition-transform duration-500">
                  ✍️
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">Content Writing</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Topic clusters that build authority.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Bottom Right 2 - Link Building */}
            <ScrollReveal animation="fade-up" delay={300} className="lg:col-span-3 lg:row-span-1">
              <div className="group h-full w-full rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(16,185,129,0.1)] p-8 md:p-10 flex flex-col justify-between min-h-[240px] transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-[1.25rem] bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-2xl mb-8 group-hover:-rotate-12 transition-transform duration-500">
                  🔗
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">Link Building</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Earned links from trusted sources.
                  </p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ================= 4. PROCESS — VERTICAL TIMELINE ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-emerald-600">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">The framework behind every ranking</h2>
          </ScrollReveal>

          <div className="relative pl-10">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200"></div>
            <div className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-emerald-500 to-teal-400" style={{ animation: 'drawTimeline 1.6s ease-out forwards' }}></div>

            {[
              { t: "Relevance", d: "We map topic clusters and semantic content so search engines understand exactly what you're an authority on." },
              { t: "Authority", d: "Earned links and citations from sources that actually move the needle — no link farms, ever." },
              { t: "Optimization", d: "Continuous technical tuning: speed, crawlability, structured data, and on-page refinement." },
              { t: "Reporting", d: "Transparent monthly reporting tied to revenue and leads, not vanity traffic." },
            ].map((step, i) => (
              <ScrollReveal key={step.t} animation="fade-up" delay={i * 120} className="relative mb-10 last:mb-0">
                <span className="absolute -left-10 top-0 w-4 h-4 rounded-full bg-white border-4 border-emerald-500"></span>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-black text-emerald-600">0{i + 1}</span>
                    <h4 className="font-bold text-gray-900">{step.t}</h4>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.d}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. RESULTS LEDGER ================= */}
      <section className="w-full py-24 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-14">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-emerald-600">The Ledger</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Numbers, not adjectives</h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up">
            {(isVisible: boolean) => (
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-400 px-6 py-4">
                  <span>Metric</span>
                  <span className="text-center">Before</span>
                  <span className="text-center">After</span>
                  <span className="text-right">Change</span>
                </div>
                {[
                  { m: "Organic Sessions", before: "41,200", after: 213456, suffix: "", change: "+418%" },
                  { m: "Keyword Positions (Top 10)", before: "620", after: 13200, suffix: "+", change: "+2,029%" },
                  { m: "Qualified Leads / mo", before: "1,140", after: 8420, suffix: "+", change: "+639%" },
                  { m: "Avg. Page Speed Score", before: "54", after: 98, suffix: "/100", change: "+81%" },
                ].map((row, i) => (
                  <div key={row.m} className={`grid grid-cols-4 items-center px-6 py-5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFBFF]'}`}>
                    <span className="font-bold text-gray-800">{row.m}</span>
                    <span className="text-center text-gray-400 font-mono">{row.before}</span>
                    <span className="text-center text-emerald-600 font-black font-mono">
                      <Counter value={row.after} isVisible={isVisible} suffix={row.suffix} />
                    </span>
                    <span className="text-right text-teal-600 font-bold">{row.change}</span>
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 6. PRICING — COMPARISON TABLE ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-14">
            <span className="text-[10px] font-black tracking-[0.25em] uppercase text-emerald-600">Investment</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Transparent SEO pricing</h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" className="overflow-x-auto hide-scrollbar">
            <table className="w-full min-w-[720px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left text-xs font-bold text-gray-400 pb-4 pl-2 w-[28%]">Plan Feature</th>
                  {[
                    { n: "Beginner", p: "$225", hi: false },
                    { n: "Advanced", p: "$449", hi: false },
                    { n: "Premium", p: "$1,499", hi: true },
                    { n: "Supreme", p: "$2,999", hi: false },
                  ].map(plan => (
                    <th key={plan.n} className={`pb-4 text-center ${plan.hi ? 'text-emerald-600' : 'text-gray-900'}`}>
                      <div className="font-black text-base">{plan.n}</div>
                      <div className="text-xl font-black mt-1">{plan.p}<span className="text-[10px] text-gray-400 font-normal">/mo</span></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Keyword Capacity", v: ["Up to 30", "Up to 70", "Up to 250", "Unlimited"] },
                  { f: "Initial Review & Analysis", v: [true, true, true, true] },
                  { f: "On-Page Optimization", v: [true, true, true, true] },
                  { f: "AI / AEO / GEO Optimization", v: [false, false, true, false] },
                  { f: "Voice Search Optimization", v: [false, false, true, false] },
                  { f: "Content Writing", v: [true, true, true, true] },
                  { f: "Link Building", v: [true, true, true, true] },
                ].map((row, ri) => (
                  <tr key={row.f} className={ri % 2 === 0 ? 'bg-white' : 'bg-white/60'}>
                    <td className="text-xs font-bold text-gray-600 py-4 pl-2 border-t border-gray-100">{row.f}</td>
                    {row.v.map((val, ci) => (
                      <td key={ci} className="text-center py-4 border-t border-gray-100">
                        {typeof val === 'string' ? (
                          <span className="text-xs font-bold text-gray-700">{val}</span>
                        ) : val ? (
                          <span className="text-emerald-600 font-black">✓</span>
                        ) : (
                          <span className="text-gray-300 font-black">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="py-6 pl-2"></td>
                  {[false, false, true, false].map((hi, i) => (
                    <td key={i} className="text-center py-6">
                      <a href="#get-audit" className={`inline-block px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 ${hi ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-900 text-white hover:bg-emerald-700'}`}>
                        Get Started
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 8. FREE AUDIT REQUEST (layered dark/glass panel) ================= */}
      <section id="get-audit" className="w-full py-20 px-6 md:px-12">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#0B0F19] via-[#0E2E24] to-[#0B0F19] p-3 md:p-4 shadow-2xl overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] animate-[blobMove_15s_ease-in-out_infinite]"></div>
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px] animate-[blobMove_18s_ease-in-out_infinite_reverse]"></div>

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">

                {/* Left: editorial info column, sits directly on the dark glass */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center text-white">
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 text-[10px] font-bold tracking-widest uppercase w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-[glowPulse_1.6s_ease-in-out_infinite]"></span>
                    Free Ranking Audit
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 leading-tight">
                    Get a strategist's eyes <br className="hidden md:block" />
                    on your rankings —
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300"> free.</span>
                  </h2>
                  <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8 max-w-sm">
                    Tell us a bit about your site and goals. No sales script — just a real crawl, a keyword-gap check, and honest next steps.
                  </p>

                  <div className="flex flex-col gap-4">
                    {[
                      { k: "01", t: "48-Hour Turnaround", d: "Audit findings land in your inbox within two business days." },
                      { k: "02", t: "Human Strategist", d: "A real SEO lead reviews the data, not just software." },
                      { k: "03", t: "Zero Obligation", d: "Keep the roadmap whether you work with us or not." },
                    ].map((item) => (
                      <div key={item.k} className="flex items-start gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                        <span className="text-amber-400 font-black text-xs tracking-widest mt-0.5">{item.k}</span>
                        <div>
                          <h4 className="text-sm font-bold text-white mb-0.5">{item.t}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: form floats as a light card above the dark panel */}
                <div className="lg:col-span-7 p-2 md:p-3">
                  <div className="bg-white rounded-[2rem] p-8 md:p-10 h-full shadow-xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Jane Cooper" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Work Email <span className="text-red-500">*</span></label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Website / Domain</label>
                          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="yoursite.com" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">What are you hoping to rank for? <span className="text-red-500">*</span></label>
                        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Briefly describe your goals, target keywords, or current challenges..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none"></textarea>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex items-center h-5">
                          <input id="seo-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 cursor-pointer" />
                        </div>
                        <label htmlFor="seo-privacy" className="text-[11px] font-bold text-gray-500 tracking-wide cursor-pointer mt-[2px]">
                          I agree to the <span className="underline decoration-2 underline-offset-2 text-black cursor-pointer">Privacy Policy</span> and consent to being contacted.
                        </label>
                      </div>

                      <button type="submit" disabled={isSubmitting} className={`group relative w-full overflow-hidden bg-[#0B0F19] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 hover:-translate-y-0.5 transition-all duration-300 shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></span>
                        <span className="relative">{isSubmitting ? 'Submitting...' : 'Request My Free Audit'}</span>
                      </button>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes blobMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes growLine {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to { width: 75%; }
        }
      `}} />
    </main>
  );
}