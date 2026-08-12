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
      { threshold, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  let baseClass = "transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] w-full will-change-[opacity,transform] ";
  if (animation === "fade-up") {
    baseClass += isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16";
  } else if (animation === "fade-right") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16";
  } else if (animation === "fade-left") {
    baseClass += isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-16";
  } else if (animation === "scale-up") {
    baseClass += isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90";
  } else if (animation === "blur-in") {
    baseClass += isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-12";
  }

  return (
    <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Counter Component for animating numbers up
const Counter = ({ value, isVisible, suffix = "", prefix = "" }: any) => {
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

  return <span>{prefix}{Math.floor(count).toLocaleString('en-US')}{suffix}</span>;
};

// Interactive Animated Search Bar Component
const InteractiveSearchBar = () => {
  const [text, setText] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const targetText = "how to scale organic revenue to $500k/mo?";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(targetText.slice(0, index));
      index++;
      if (index > targetText.length) {
        clearInterval(interval);
        setTimeout(() => setIsSearched(true), 400);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto my-8 z-20">
      <div className={`bg-white border border-gray-200 shadow-[0_15px_35px_rgba(0,0,0,0.06)] rounded-full p-4 flex items-center gap-4 transition-all duration-500 ${isSearched ? '-translate-y-2 border-emerald-300' : 'translate-y-0'}`}>
        <svg className="w-6 h-6 text-emerald-500 ml-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <span className="text-gray-800 font-medium text-base md:text-lg flex-1 text-left whitespace-nowrap overflow-hidden">
          {text}<span className="animate-pulse bg-emerald-500 w-0.5 h-5 inline-block align-middle ml-1"></span>
        </span>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:bg-emerald-700 transition-colors">Search</button>
      </div>

      {isSearched && (
        <div className="mt-4 bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 text-left animate-[scale-up_0.3s_ease-out]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Page #1 Result · Position #1</span>
          </div>
          <h4 className="text-xl font-black text-gray-900 mb-1">Enterprise Organic Growth & Technical SEO Playbook</h4>
          <p className="text-xs font-mono text-emerald-700 mb-3">https://www.weoads.com/services/search-engine-optimization</p>
          <p className="text-sm text-gray-500 leading-relaxed">Engineered technical architecture, structured schema markup, and topic clusters that drive sustainable organic revenue without algorithmic penalty risk.</p>
        </div>
      )}
    </div>
  );
};

export default function SEOPage() {
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
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
        .bg-grid-light { background-image: radial-gradient(#10b981 1.5px, transparent 1.5px); background-size: 32px 32px; opacity: 0.12; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 25s linear infinite; }
      `}} />

      {/* SUCCESS POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-emerald-50 border-4 border-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Audit Initialized!</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">Our SEO architects are analyzing your website's crawl budget, backlinks, and keyword gaps. Expect your strategy deck shortly.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg">Close Window</button>
          </div>
        </div>
      )}

      {/* ERROR POPUP */}
      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Error</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">Try Again</button>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO SECTION */}
      <section className="relative w-full pt-32 pb-24 px-6 md:px-12 text-center flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-grid-light -z-20"></div>
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[400px] bg-emerald-300/30 rounded-full blur-[140px] -z-10"></div>

        <ScrollReveal animation="blur-in" className="max-w-[1100px] mx-auto z-10">
          <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-600 px-5 py-2.5 rounded-full mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black tracking-widest uppercase">Organic Search Engineering</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.08] tracking-tight mb-6">
            Search is a Long Game.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700">We Play It Better.</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-6">
            Zero black-hat shortcuts. We engineer technical site architecture, semantic content clusters, and authoritative digital PR that force Google to rank you on Page 1.
          </p>

          <InteractiveSearchBar />
        </ScrollReveal>
      </section>

      {/* SECTION 2: MARQUEE TICKER */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 pr-16 text-2xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-emerald-600 transition-colors">TECHNICAL SEO</span><span>•</span>
            <span className="hover:text-teal-600 transition-colors">SCHEMA MARKUP</span><span>•</span>
            <span className="hover:text-emerald-600 transition-colors">CONTENT CLUSTERS</span><span>•</span>
            <span className="hover:text-teal-600 transition-colors">AEO / GEO SEARCH</span><span>•</span>
            <span className="hover:text-emerald-600 transition-colors">DIGITAL PR LINKS</span>
          </div>
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-emerald-600 transition-colors">TECHNICAL SEO</span><span>•</span>
            <span className="hover:text-teal-600 transition-colors">SCHEMA MARKUP</span><span>•</span>
            <span className="hover:text-emerald-600 transition-colors">CONTENT CLUSTERS</span><span>•</span>
            <span className="hover:text-teal-600 transition-colors">AEO / GEO SEARCH</span><span>•</span>
            <span className="hover:text-emerald-600 transition-colors">DIGITAL PR LINKS</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: WHY TEMPLATES FAIL ENTERPRISES */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Generic SEO Fails Enterprises</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Off-the-shelf SEO checklists fail because search engines demand architectural excellence.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl mb-6">⚡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Core Web Vitals Slowness</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Slow LCP and INP scores tank rankings before you even write a word of content. Technical speed is the first filter.</p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl mb-6">🔒</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Topical Authority Gaps</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Random blog posts don't rank anymore. Google requires comprehensive semantic topic clusters to prove domain authority.</p>
            </ScrollReveal>
            <ScrollReveal delay={300} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl mb-6">📈</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">AI / AEO Search Shift</h4>
              <p className="text-gray-500 text-sm leading-relaxed">AI answer engines like ChatGPT and Perplexity require structured schema JSON-LD to pull your brand into recommendations.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE PILLARS BENTO GRID */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-emerald-600 font-black tracking-widest text-xs uppercase block mb-3">Our Core Pillars</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Four Disciplines. One Result.</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal animation="scale-up" delay={0} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💻</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Technical SEO</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Fixing crawl errors, rendering bottlenecks, site speed, and structured data so search engines index every key page.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={100} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🤖</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">AEO / GEO Search</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Optimizing content for AI answer engines like ChatGPT, Perplexity, and Google SGE beyond traditional blue links.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={200} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6">✍️</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Semantic Content</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Building topical authority through comprehensive content clusters that completely satisfy commercial search intent.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={300} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🔗</div>
              <h3 className="text-xl font-black text-gray-900 mb-3">Earned Backlinks</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Digital PR outreach that earns high-DR links from legitimate news outlets and trusted niche publications.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES WE SERVE */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Industries We Engineer Organic Growth For</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['SaaS & B2B Software', 'FinTech & Banking', 'E-Commerce Brands', 'Healthcare & Biotech', 'EdTech Platforms', 'Real Estate Portals', 'Logistics & Supply', 'Enterprise Media'].map((ind, i) => (
              <ScrollReveal key={i} delay={i*50} animation="scale-up" className="bg-[#FAFBFF] border border-gray-100 p-6 rounded-2xl flex items-center justify-center hover:border-emerald-300 transition-colors">
                <span className="font-bold text-gray-700 text-sm">{ind}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WORKFLOW TIMELINE */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal className="text-center mb-20">
            <span className="text-emerald-600 font-black tracking-widest text-xs uppercase block mb-3">Execution Framework</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">How We Execute SEO</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Crawl & Audit", desc: "Analyzing server logs, indexation status, and technical blockers hindering rank." },
              { step: "02", title: "Content Gap", desc: "Mapping high-intent commercial keywords competitors are ranking for and you are missing." },
              { step: "03", title: "On-Page Tuning", desc: "Optimizing title tags, schema JSON-LD, internal linking, and Core Web Vitals speed." },
              { step: "04", title: "Authority PR", desc: "Securing authoritative, contextual backlinks to force high-value pages onto Page 1." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 150} className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-6 shadow-md">{item.step}</div>
                <h4 className="text-lg font-black text-gray-900 mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: METRICS STRIP */}
      <section className="w-full bg-[#0B0F19] py-24 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-gray-800">
          <div className="pt-6 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-emerald-400 mb-3"><Counter value={13200} isVisible={true} suffix="+" /></h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Page #1 Rankings Won</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-teal-400 mb-3">100/100</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Target PageSpeed Score</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-green-400 mb-3"><Counter value={418} isVisible={true} suffix="%" /></h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Average Organic YoY Growth</p>
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
              <h4 className="text-xl font-bold text-gray-900 mb-3">How long does SEO take to show results?</h4>
              <p className="text-base text-gray-500 leading-relaxed">SEO is a compounding strategy. Technical fixes can show results in weeks, but content and link building typically require 3 to 6 months to establish strong Page 1 authority.</p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Do you do black-hat SEO?</h4>
              <p className="text-base text-gray-500 leading-relaxed">Absolutely not. We strictly adhere to Google's Webmaster Guidelines. We do not use PBNs, hidden text, or spammy link building. Our focus is purely on high-quality content and elite technical structure.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 9: WHITE CONTACT FORM SECTION */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Ranking Audit
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to claim <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Page One?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Send us your site URL. Our strategists will run a full technical crawl and keyword audit to show you exact revenue gaps.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">📞</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>🇮🇳 +91-6366666760</div>
              </div>
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 text-xl">✉️</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Support</p>support@weoads.com</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Request Free Audit</h3>
              
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
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Website Domain</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="yoursite.com" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Target Keywords <span className="text-emerald-600">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="What keywords do you want to rank for?" rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 transition-all resize-none placeholder-gray-400"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input id="seo-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600" />
                  <label htmlFor="seo-privacy" className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5">
                    I agree to the <span className="text-emerald-600 font-bold hover:underline">Privacy Policy</span>.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
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