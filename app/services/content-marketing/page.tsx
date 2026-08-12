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
// 2. LIVE GHOSTWRITER ANIMATION
// ==========================================
const LiveGhostWriter = () => {
  const [text, setText] = useState('');
  const fullText = `Title: How to Scale Digital Assets\n\nIn today's algorithmic landscape, deploying generic templates is not enough to secure top rankings.\n\nYou need heavily researched, semantically optimized content that answers high-intent queries.\n\nBy leveraging deep technical knowledge and elite copywriting, we build massive authority...`;
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length + 40) { i = 0; } 
    }, 45);
    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-[0_20px_60px_-15px_rgba(168,85,247,0.15)] p-8 md:p-10 w-full text-left h-[450px] flex flex-col relative overflow-hidden group hover:border-purple-300 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-14 bg-purple-50 flex items-center px-8 border-b border-gray-100">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
        <span className="text-xs font-bold text-purple-600 uppercase tracking-widest flex-1 text-center pr-8">SEO_Draft_v1.docx</span>
      </div>
      <div className="mt-10 font-serif text-gray-700 leading-loose whitespace-pre-wrap flex-1 text-lg md:text-xl relative z-10">
        {text}<span className="inline-block w-0.5 h-6 bg-purple-600 animate-pulse align-middle ml-1"></span>
      </div>
      <div className="absolute bottom-4 right-6 opacity-5 font-black text-6xl pointer-events-none">W</div>
    </div>
  );
};

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

export default function ContentMarketingPage() {
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
        additional_text2: 'Content Marketing Page Form', receivedBy: 'WeoAds System'
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
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-gray-900 overflow-x-hidden flex flex-col relative selection:bg-purple-500 selection:text-white">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-dots-pattern { background-image: radial-gradient(#d8b4fe 1.5px, transparent 1.5px); background-size: 32px 32px; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(15px); } }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 30s linear infinite; }
      `}} />

      {/* Popups */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-purple-50 border-4 border-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Message Sent!</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">Our content strategists will review your brief and reach out within 24 hours to discuss the roadmap.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-purple-600 transition-colors shadow-lg">Close Window</button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Oops!</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">Try Again</button>
          </div>
        </div>
      )}

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full pt-32 pb-32 px-6 md:px-12 text-center flex flex-col justify-center min-h-[100vh] bg-dots-pattern">
        <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-purple-300/40 rounded-full blur-[150px] -z-10 animate-float-slow"></div>
        <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-orange-200/40 rounded-full blur-[150px] -z-10 animate-float-fast"></div>

        <ScrollReveal animation="blur-up" className="max-w-[1300px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left mt-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-white border border-purple-100 text-purple-700 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <span className="text-lg leading-none">✍️</span>
              <span className="text-xs font-black tracking-widest uppercase">Strategic Content Marketing</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0B0F19] leading-[1.1] tracking-tight mb-8">
              Words That Rank.<br/> Stories That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500">Convert.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
              We do not write fluff. Our content is heavily researched, semantically optimized, and crafted to build massive authority in your industry while driving highly qualified leads.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#contact" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1 text-center">
                Start Content Plan
              </a>
              <a href="#arsenal" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-10 py-4.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all hover:-translate-y-1 text-center shadow-sm">
                View Our Arsenal &rarr;
              </a>
            </div>
          </div>
          <div className="relative w-full"><LiveGhostWriter /></div>
        </ScrollReveal>
      </section>

      {/* ================= 2. MARQUEE ================= */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-purple-600 transition-colors duration-300 cursor-default">SEO BLOGS</span><span className="text-gray-200">•</span>
            <span className="hover:text-pink-500 transition-colors duration-300 cursor-default">WHITEPAPERS</span><span className="text-gray-200">•</span>
            <span className="hover:text-orange-500 transition-colors duration-300 cursor-default">LANDING PAGES</span><span className="text-gray-200">•</span>
            <span className="hover:text-blue-500 transition-colors duration-300 cursor-default">CASE STUDIES</span>
          </div>
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-purple-600 transition-colors duration-300 cursor-default">SEO BLOGS</span><span className="text-gray-200">•</span>
            <span className="hover:text-pink-500 transition-colors duration-300 cursor-default">WHITEPAPERS</span><span className="text-gray-200">•</span>
            <span className="hover:text-orange-500 transition-colors duration-300 cursor-default">LANDING PAGES</span><span className="text-gray-200">•</span>
            <span className="hover:text-blue-500 transition-colors duration-300 cursor-default">CASE STUDIES</span>
          </div>
        </div>
      </div>

      {/* ================= 3. NEW SECTION: THE CONTENT ROI ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal animation="fade-right">
            <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">Paid Ads Stop When The Budget Stops. <span className="text-purple-600">Content Compounds.</span></h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">
              A well-researched, high-ranking SEO article doesn't just bring traffic once. It brings highly qualified leads every single day, month after month, without you paying for each click.
            </p>
            <ul className="space-y-4 font-bold text-gray-700">
              <li className="flex items-center gap-3"><span className="text-purple-500 text-xl">✓</span> Builds undeniable industry authority.</li>
              <li className="flex items-center gap-3"><span className="text-purple-500 text-xl">✓</span> Drastically lowers long-term CAC (Cost Per Acquisition).</li>
              <li className="flex items-center gap-3"><span className="text-purple-500 text-xl">✓</span> Shortens the sales cycle by educating prospects upfront.</li>
            </ul>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" className="bg-[#FAFBFF] border border-purple-100 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center">
             <div className="text-6xl mb-6">📈</div>
             <h3 className="text-2xl font-black text-gray-900 mb-4">The Compounding Effect</h3>
             <p className="text-gray-500 text-sm">Businesses that prioritize blogging experience a 13x increase in positive ROI year-over-year compared to businesses that don't.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 4. OUR ARSENAL (BENTO GRID) ================= */}
      <section id="arsenal" className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-purple-600 font-black tracking-widest text-xs uppercase block mb-4">Content Arsenal</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">Formats That Drive Growth</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="scale-up" delay={0} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">📝</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">SEO Blog Posts</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Long-form, semantic articles structured to capture high-intent search traffic and answer complex queries.</p>
            </ScrollReveal>
            <ScrollReveal animation="scale-up" delay={150} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">📄</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Whitepapers & E-Books</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Deep-dive technical assets used as lead magnets to capture emails and nurture high-value B2B prospects.</p>
            </ScrollReveal>
            <ScrollReveal animation="scale-up" delay={300} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Landing Page Copy</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Conversion-obsessed copywriting for your sales pages. We write headlines that hook and CTAs that force clicks.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. NEW SECTION: CONTENT DISTRIBUTION ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Omnichannel Content Distribution</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Organic Search (SEO)', 'LinkedIn Articles', 'Email Newsletters', 'Digital PR', 'Medium Publishing', 'Twitter Threads', 'Lead Magnets', 'Case Studies'].map((ind, i) => (
              <ScrollReveal key={i} delay={i*50} animation="scale-up" className="bg-[#FAFBFF] border border-gray-100 p-6 rounded-2xl flex items-center justify-center hover:border-purple-300 transition-colors">
                <span className="font-bold text-gray-700 text-sm">{ind}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. THE EDITORIAL PROCESS ================= */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-24">
            <span className="text-purple-600 font-black tracking-widest text-xs uppercase block mb-4">Methodology</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">Our Editorial Engine</h2>
          </ScrollReveal>

          <div className="relative pl-12 md:pl-0">
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1.5 bg-gray-200 rounded-full"></div>
            
            <ScrollReveal animation="fade-right" delay={0} className="relative mb-16 flex flex-col md:flex-row md:justify-start items-center w-full">
              <span className="absolute left-[-29px] md:left-1/2 md:-translate-x-1/2 top-8 w-7 h-7 rounded-full bg-white border-[5px] border-purple-500 shadow-lg z-10"></span>
              <div className="w-full md:w-[45%] bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 md:text-right md:mr-auto">
                <span className="text-purple-200 font-black text-4xl block mb-4">01</span>
                <h4 className="text-2xl font-black text-gray-900 mb-3">Deep Discovery</h4>
                <p className="text-base text-gray-500 leading-relaxed">We study your brand voice, interview your SMEs, and analyze competitors to find lucrative content gaps.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-left" delay={150} className="relative mb-16 flex flex-col md:flex-row md:justify-end items-center w-full">
              <span className="absolute left-[-29px] md:left-1/2 md:-translate-x-1/2 top-8 w-7 h-7 rounded-full bg-white border-[5px] border-purple-500 shadow-lg z-10"></span>
              <div className="w-full md:w-[45%] bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 md:text-left md:ml-auto">
                <span className="text-purple-200 font-black text-4xl block mb-4">02</span>
                <h4 className="text-2xl font-black text-gray-900 mb-3">Keyword Architecture</h4>
                <p className="text-base text-gray-500 leading-relaxed">Building topic clusters based on actual search volume and commercial intent, not guesswork.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 7. METRICS STRIP ================= */}
      <section className="w-full bg-gradient-to-r from-purple-700 via-pink-600 to-orange-500 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-6 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">2M+</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-90">Words Published</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">Top 3</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-90">Ranking Guarantees</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3"><AnimatedCounter end={145} />%</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-90">Avg Traffic Lift</p>
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
              <h4 className="text-xl font-bold text-gray-900 mb-3">Do you use AI to write content?</h4>
              <p className="text-base text-gray-500 leading-relaxed">We use AI strictly for outlining, ideation, and research organization. 100% of our final copy is researched, written, and meticulously edited by native human experts to ensure it connects emotionally with readers.</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">How long until we see SEO results?</h4>
              <p className="text-base text-gray-500 leading-relaxed">Content marketing is a compounding asset. You will typically start seeing a highly noticeable upward movement in organic traffic and lead generation between months 3 and 6.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 9. CONTACT FORM (WHITE/LIGHT THEME) ================= */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Content Estimation
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to dominate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">your niche?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Drop us your details. We'll rigorously audit your current content structure and show you exactly where the massive traffic gaps are—no strings attached.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl">📞</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>
                  🇮🇳 +91-6366666760
                </div>
              </div>
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">✉️</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                  support@weoads.com
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Request Content Audit</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-purple-600">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-purple-600">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-purple-600">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Target Audience & Goals <span className="text-purple-600">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Who are you trying to reach and what are your KPIs?" rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 transition-all resize-none placeholder-gray-400"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <div className="flex items-center h-5">
                    <input id="cm-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer accent-purple-600" />
                  </div>
                  <label className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5" htmlFor="cm-privacy">
                    I agree to the <span className="text-purple-600 font-bold hover:underline">Privacy Policy</span> and consent to being contacted.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 mt-4 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Initializing Request...' : 'Get Content Audit'}
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