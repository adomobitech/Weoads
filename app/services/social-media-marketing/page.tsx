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

  return (
    <main className="min-h-screen bg-white font-sans text-[#0B0F19] overflow-x-hidden flex flex-col relative selection:bg-purple-500 selection:text-white">
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
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-50 border-[4px] sm:border-[6px] border-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B0F19] mb-2 tracking-tight">Thank You!</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium mb-1">Your request has been submitted successfully.</p>
            <p className="text-sm text-gray-500 mb-8">Our team is reviewing your details and will get back to you shortly.</p>
            
            <div className="bg-[#FFF9F5] border border-[#FFE8D6] rounded-2xl p-5 sm:p-6 text-left mb-8">
              <h3 className="text-base font-black text-[#0B0F19] mb-4">What happens next?</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">1</span><p className="text-gray-700 text-sm font-semibold">Our expert will review your business requirements.</p></div>
                <div className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">2</span><p className="text-gray-700 text-sm font-semibold">You'll receive a confirmation email with a ticket ID.</p></div>
                <div className="flex items-start gap-3"><span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">3</span><p className="text-gray-700 text-sm font-semibold">Our team will contact you within 24 hours to discuss strategy.</p></div>
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

      {/* ================= 1. HERO SECTION (Unique Grid + Glowing Colors) ================= */}
      <section className="relative w-full pt-28 pb-32 px-6 md:px-12 text-center overflow-hidden">
        {/* Animated Background Gradients & Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 -z-20"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-[120px] -z-10"></div>

        <ScrollReveal animation="blur-in" className="max-w-[900px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-100 text-blue-600 px-5 py-2 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wide">Top Rated Social Agency</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-[#111827] leading-[1.1] tracking-tight mb-6">
            Content That Converts. <br />
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500">Converting.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            We turn attention into customers. Strategy-led creative, community cultivation, and paid amplification that drive measurable revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="#contact" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2">
              Request Free Audit <span className="rotate-45 -mt-0.5">&uarr;</span>
            </Link>
            <Link href="#methodology" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-sm">
              View Case Studies <span>&rarr;</span>
            </Link>
          </div>

          {/* Social Proof Logos */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-gray-400 font-bold text-sm">
            <span className="flex items-center gap-2 hover:text-blue-500 transition-colors cursor-default"><span className="text-xl">∞</span> Meta Partner</span>
            <span className="flex items-center gap-2 hover:text-blue-700 transition-colors cursor-default"><span className="text-xl">in</span> LinkedIn Experts</span>
            <span className="flex items-center gap-2 hover:text-black transition-colors cursor-default"><span className="text-xl">♪</span> TikTok Native</span>
          </div>
        </ScrollReveal>
      </section>

      {/* ================= 2. DARK STATS (More Than Just Likes) ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#0A1128] relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-grid-dark opacity-100 z-0"></div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-right">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 px-3 py-1 rounded-md mb-6 text-[10px] font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span> DIGITAL FIRST
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                More Than Just <br />
                <span className="text-blue-400">Likes & Follows.</span>
              </h2>

              <p className="text-gray-400 text-base mb-10 leading-relaxed">
                Vanity metrics feel good, but revenue feels better. We bridge the gap between creative storytelling and hard data. Our "Social Growth Engine" ensures every post serves a purpose in your sales funnel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">♡</div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Brand Humanization</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">People buy from people. We give your brand a voice that resonates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">📱</div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Platform Specific</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">No copy-pasting. We tailor content natively for LinkedIn, IG, and TikTok.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">⚡</div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Trend Riding</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">We monitor trends 24/7 so your brand can join the conversation instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-400">🛡️</div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Reputation Armor</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">Proactive community management to protect your brand image.</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Floating Dashboard */}
          <div className="lg:col-span-7 flex justify-end">
            <ScrollReveal animation="fade-left" delay={200} className="w-full max-w-[700px] animate-subtle-float">
              <div className="bg-[#121E3B] border border-gray-700/50 rounded-3xl p-6 shadow-[0_0_60px_rgba(37,99,235,0.15)] relative backdrop-blur-md">
                
                {/* Header Mockup */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center bg-gray-800/50"></div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">@YourBrand</p>
                      <p className="text-[10px] text-gray-500">Professional Account</p>
                    </div>
                  </div>
                  <div className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-blue-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Algorithm Optimized
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="bg-[#0B1224] border border-gray-700/50 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reach</p>
                      <span className="text-blue-500">👁</span>
                    </div>
                    <p className="text-2xl font-black text-blue-400">1.2M</p>
                  </div>
                  <div className="bg-[#0B1224] border border-gray-700/50 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Engage</p>
                      <span className="text-orange-400">♡</span>
                    </div>
                    <p className="text-2xl font-black text-orange-400">8.5%</p>
                  </div>
                  <div className="bg-[#0B1224] border border-gray-700/50 rounded-2xl p-4 relative">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Leads</p>
                      <span className="text-emerald-400">↗</span>
                    </div>
                    <p className="text-2xl font-black text-white">420+</p>
                  </div>
                </div>

                {/* Chart Mockup */}
                <div className="h-32 flex items-end justify-between gap-1 sm:gap-2 relative px-2">
                  {/* Floating tooltip */}
                  <div className="absolute top-0 left-1/4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg shadow-xl z-10 flex items-center gap-2">
                    <span className="text-xs">🔥</span>
                    <div>
                      <p className="text-[10px] font-bold text-white">Reel Trending</p>
                      <p className="text-[8px] text-gray-300">+15k views in 1h</p>
                    </div>
                  </div>
                  {[20, 35, 25, 45, 80, 50, 65, 40, 90, 70, 55, 30].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t-sm ${i === 4 || i === 8 ? 'bg-gradient-to-t from-orange-600 to-orange-400' : 'bg-gradient-to-t from-blue-600 to-blue-400'}`} style={{ height: `${h}%` }}></div>
                  ))}
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ================= 3. METHODOLOGY (Unique Connected Layout) ================= */}
      <section id="methodology" className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Our <span className="text-blue-600">Core Methodology</span>
            </h2>
            <p className="text-gray-500 font-medium mb-16">We don't just post randomly. We follow a strict 4-stage cycle designed to align your brand stories with business growth.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow h-full relative group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">🎤</div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Listen</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We listen to your goals, customers and competitors to set an actionable foundation.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow h-full relative group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Plan</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We translate objectives into a prioritized content & paid plan focused on conversions.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow h-full relative group">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">⚡</div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Execute</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We produce and publish high-performing creative while nurturing community signals.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 text-left shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-shadow h-full relative group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">📊</div>
                <h3 className="text-xl font-black text-gray-900 mb-3">Analyse</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We measure outcomes, run experiments, and optimize toward the metrics that matter.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 4. COMPREHENSIVE SUITE (Staggered Grid) ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF]">
        <div className="max-w-[1200px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Comprehensive <span className="text-blue-600">Social Suite</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">From the initial audit to the monthly report, we handle the chaos of social media so you can focus on running your business.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Row 1 */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform h-full">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-5 shadow-md">🔍</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Strategic Consulting</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We don't guess. We audit audiences, competitors, and funnels to build a growth roadmap that ties social activity to revenue.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform h-full">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center mb-5 shadow-md">📸</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Content Production</h3>
                <p className="text-sm text-gray-500 leading-relaxed">From scroll-stopping Reels to conversion-led thumbnails. Our studio crafts short-form and static assets that drive action.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform h-full">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center mb-5 shadow-md">💬</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Community Mgmt</h3>
                <p className="text-sm text-gray-500 leading-relaxed">We operate as your brand voice—managing DMs, surfacing opportunities, and turning engagement into repeat customers.</p>
              </div>
            </ScrollReveal>
            
            {/* Row 2 */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform h-full">
                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center mb-5 shadow-md">🚀</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Paid Social Ads</h3>
                <p className="text-sm text-gray-500 leading-relaxed">High-ROI paid social that amplifies top-performing content and targets buyers with precision across Meta, TikTok, and LinkedIn.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform h-full">
                <div className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center mb-5 shadow-md">⭐</div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Influencer Marketing</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Partner with creators who authentically amplify brand messages and drive measurable conversions, not just impressions.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-blue-50 rounded-3xl p-8 border border-blue-100 shadow-sm hover:-translate-y-1 transition-transform h-full relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-[#0B0F19] text-white flex items-center justify-center mb-5 shadow-md">📊</div>
                <h3 className="font-bold text-blue-700 mb-3 text-lg">Analytics & Reporting</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">Transparent reporting that ties social KPIs to leads and revenue, with actionable recommendations each month.</p>
                <Link href="#contact" className="text-xs font-bold text-blue-700 flex items-center gap-1 hover:gap-2 transition-all">Learn more &rarr;</Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. VIRAL CAMPAIGNS (Dark UI) ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#0B1224] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark opacity-50"></div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full mb-6 text-[10px] font-bold tracking-widest uppercase">
              SPECIALIZED CAMPAIGNS
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Create Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Brand Hype</span>
            </h2>
            <p className="text-gray-400 text-base mb-10 leading-relaxed max-w-lg">
              Social media is about moments. Whether it's a product launch or a live event, the right attention to detail and timely execution is all it takes to make it successful.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0">📢</div>
                <div>
                  <h4 className="font-bold text-white mb-2 text-lg">Event Promotions</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">We strive with a detailed event marketing promotion strategy that works as a dual-layer advertising service for your brand.</p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shrink-0">📈</div>
                <div>
                  <h4 className="font-bold text-white mb-2 text-lg">Amplify Reach</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Our "out of the box" designs combined with tailored content help boost conversions and generate maximum traffic during critical windows.</p>
                </div>
              </div>
            </div>
            
            <Link href="#contact" className="mt-10 inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform">
              Start Hype Campaign
            </Link>
          </ScrollReveal>

          {/* Right Floating Widget */}
          <ScrollReveal animation="fade-left" delay={200} className="flex justify-end">
            <div className="w-full max-w-[600px] bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">CAMPAIGN VELOCITY</p>
                  <h4 className="text-2xl font-bold text-white">Viral Trajectory</h4>
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded border border-emerald-500/20">
                  ↗ +400%
                </div>
              </div>

              {/* Minimal UI lines representing data */}
              <div className="space-y-4 mb-16">
                <div className="h-1 bg-gradient-to-r from-cyan-400 to-transparent w-full rounded-full opacity-50"></div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-transparent w-3/4 rounded-full opacity-30"></div>
                <div className="h-1 bg-gradient-to-r from-orange-400 to-transparent w-1/2 rounded-full opacity-30"></div>
              </div>

              <div className="flex gap-4">
                <div className="bg-white/5 rounded-xl p-4 flex-1 border border-white/10">
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-2">⏱ Launch Countdown</p>
                  <p className="text-xl font-bold text-white font-mono tracking-wider">04:23:11</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 flex-1 border border-white/10">
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 mb-2">👥 Live Audience</p>
                  <p className="text-xl font-bold text-white">12.5k</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================= 6. CASE STUDY & PRICING ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#FAFBFF] relative">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Highlight Case Study */}
          <ScrollReveal animation="scale-up" className="mb-32">
            <div className="bg-[#0B0F19] rounded-[2.5rem] p-8 md:p-16 text-white grid grid-cols-1 lg:grid-cols-2 gap-12 items-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"></div>
              
              <div>
                <div className="inline-block bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded mb-6 uppercase tracking-widest">CASE STUDY</div>
                <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Scaling <span className="text-orange-400">TechFlow</span> to Market Leader</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                  We helped a B2B SaaS company completely overhaul their LinkedIn presence. By shifting from corporate jargon to value-driven content, we achieved massive growth in 90 days.
                </p>
                <Link href="#contact" className="text-sm font-bold text-white hover:text-orange-400 transition-colors flex items-center gap-2 underline decoration-2 underline-offset-4">
                  Request Similar Results
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-orange-400 mb-2">👥</div>
                  <h4 className="text-2xl font-black text-white mb-1">+240%</h4>
                  <p className="text-[10px] text-gray-400">Follower Growth</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-orange-400 mb-2">⚡</div>
                  <h4 className="text-2xl font-black text-white mb-1">12.5%</h4>
                  <p className="text-[10px] text-gray-400">Engagement Rate</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-orange-400 mb-2">🎯</div>
                  <h4 className="text-2xl font-black text-white mb-1">85/mo</h4>
                  <p className="text-[10px] text-gray-400">Inbound Leads</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-orange-400 mb-2">🌐</div>
                  <h4 className="text-2xl font-black text-white mb-1">1.5M</h4>
                  <p className="text-[10px] text-gray-400">Content Reach</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Pricing Tables */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-900">Types of Social Media Marketing Packages We Offer</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Beginner */}
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="bg-[#F97316] text-white text-center py-4 font-bold text-lg">Beginner</div>
                <div className="p-6 text-center border-b border-gray-100">
                  <span className="text-3xl font-black text-[#F97316]">$225</span><span className="text-xs text-gray-500">/month</span>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold text-center mb-4">- Facebook -</p>
                  <ul className="space-y-3 text-[11px] text-gray-600 font-medium">
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Profile Optimization</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 10 Creative Image Posting</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 10 Post Sharing in Groups</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Cover Image Creative</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 1 Group Join</li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
                  <button className="w-full bg-[#F97316] text-white py-2.5 rounded text-xs font-bold flex justify-between px-4 hover:bg-[#EA580C] transition-colors">See All Features <span>&rarr;</span></button>
                  <Link href="#contact" className="w-full border border-orange-200 text-[#F97316] py-2.5 rounded text-xs font-bold text-center hover:bg-orange-50 transition-colors">Get Started</Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Advanced */}
            <ScrollReveal animation="fade-up" delay={100}>
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="bg-[#F97316] text-white text-center py-4 font-bold text-lg">Advanced</div>
                <div className="p-6 text-center border-b border-gray-100">
                  <span className="text-3xl font-black text-[#F97316]">$499</span><span className="text-xs text-gray-500">/month</span>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold text-center mb-4">- Facebook -</p>
                  <ul className="space-y-3 text-[11px] text-gray-600 font-medium">
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Profile Optimization</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 30 Creative Image Posting</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 30 Post Sharing in Groups</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 3 Group Join</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 50 Targeted Page Likes</li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
                  <button className="w-full bg-[#F97316] text-white py-2.5 rounded text-xs font-bold flex justify-between px-4 hover:bg-[#EA580C] transition-colors">See All Features <span>&rarr;</span></button>
                  <Link href="#contact" className="w-full border border-orange-200 text-[#F97316] py-2.5 rounded text-xs font-bold text-center hover:bg-orange-50 transition-colors">Get Started</Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Premium */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="bg-white border-2 border-[#F97316] shadow-xl rounded-xl overflow-hidden flex flex-col h-full relative -translate-y-2">
                <div className="bg-[#F97316] text-white text-center py-4 font-bold text-lg">Premium</div>
                <div className="p-6 text-center border-b border-gray-100">
                  <span className="text-3xl font-black text-[#F97316]">$799</span><span className="text-xs text-gray-500">/month</span>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold text-center mb-4">- Facebook -</p>
                  <ul className="space-y-3 text-[11px] text-gray-600 font-medium">
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Profile Optimization</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 50 Creative Image Posting</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 50 Post Sharing in Groups</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 10 Group Join</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 90 Targeted Page Likes</li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
                  <button className="w-full bg-[#F97316] text-white py-2.5 rounded text-xs font-bold flex justify-between px-4 hover:bg-[#EA580C] transition-colors">See All Features <span>&rarr;</span></button>
                  <Link href="#contact" className="w-full border border-orange-200 text-[#F97316] py-2.5 rounded text-xs font-bold text-center hover:bg-orange-50 transition-colors">Get Started</Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Supreme */}
            <ScrollReveal animation="fade-up" delay={300}>
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="bg-[#F97316] text-white text-center py-4 font-bold text-lg">Supreme</div>
                <div className="p-6 text-center border-b border-gray-100">
                  <span className="text-3xl font-black text-[#F97316]">$1199</span><span className="text-xs text-gray-500">/month</span>
                </div>
                <div className="p-6 flex-1">
                  <p className="text-xs font-bold text-center mb-4">- Facebook -</p>
                  <ul className="space-y-3 text-[11px] text-gray-600 font-medium">
                    <li className="flex gap-2"><span className="text-green-500">✓</span> Profile Optimization</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 90 Creative Image Posting</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 90 Post Sharing in Groups</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 20 Group Join</li>
                    <li className="flex gap-2"><span className="text-green-500">✓</span> 150 Targeted Page Likes</li>
                  </ul>
                </div>
                <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
                  <button className="w-full bg-[#F97316] text-white py-2.5 rounded text-xs font-bold flex justify-between px-4 hover:bg-[#EA580C] transition-colors">See All Features <span>&rarr;</span></button>
                  <Link href="#contact" className="w-full border border-orange-200 text-[#F97316] py-2.5 rounded text-xs font-bold text-center hover:bg-orange-50 transition-colors">Get Started</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ================= 7. CTA BANNER ================= */}
      <section className="w-full px-6 md:px-12 pb-16">
        <ScrollReveal animation="scale-up" className="max-w-[1200px] mx-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-[2.5rem] p-12 md:p-20 text-center shadow-xl text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Ready to go viral?</h2>
          <p className="text-blue-100 text-sm md:text-base mb-10 max-w-xl mx-auto">Schedule your free 30-minute social media audit. We'll identify your biggest opportunities for growth on Instagram, LinkedIn, and beyond.</p>
          <Link href="#contact" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform">
            Book Free Audit
          </Link>
        </ScrollReveal>
      </section>

      {/* ================= 8. CONTACT FORM (PERFECTED API LOGIC) ================= */}
      <section id="contact" className="w-full py-24 px-6 md:px-12 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Illustration */}
          <div className="relative flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="w-64 h-64 md:w-80 md:h-80 relative mb-8">
              <div className="absolute inset-0 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                {/* Envelope Illustration */}
                <div className="w-40 h-28 bg-white border-2 border-blue-400 rounded-lg shadow-lg relative -rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 w-full h-1/2 border-b-2 border-blue-400 flex justify-center bg-blue-50/30">
                    <div className="w-[120%] h-px bg-blue-400 absolute rotate-12 transform origin-left"></div>
                    <div className="w-[120%] h-px bg-blue-400 absolute -rotate-12 transform origin-right"></div>
                  </div>
                  <div className="flex flex-col gap-2 mt-8 w-full px-4">
                    <div className="w-3/4 h-1.5 bg-blue-200 rounded-full"></div>
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
            
            <div className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-md mb-2">
              500+ Happy Clients
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-blue-900/5 border border-gray-100 relative">
            <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif">Get in Touch</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">We'd love to hear from you. Send us a message!</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country <span className="text-red-500">*</span></label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Message <span className="text-red-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more about your inquiry..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>
              </div>

              <div className="flex items-start gap-3 mt-2">
                <div className="flex items-center h-5">
                  <input id="smm-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" />
                </div>
                <label htmlFor="smm-privacy" className="text-[11px] font-medium text-gray-500 cursor-pointer mt-[2px]">
                  I agree to the <span className="text-blue-500 underline font-bold cursor-pointer">privacy policy</span>.
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full bg-[#0388B4] text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-[#026C90] transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
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