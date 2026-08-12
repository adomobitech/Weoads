"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

// ==========================================
// 1. LAZY SCROLL REVEAL ANIMATION ENGINE
// ==========================================
const ScrollReveal = ({ children, className = "", delay = 0, animation = "fade-up", threshold = 0.1 }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold, rootMargin: "50px" });
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
// ==========================================
// 2. UNIQUE UI: INSTAGRAM REEL REDIRECTING DIRECTLY TO YOUR INSTA PAGE
// ==========================================
const LiveReelMockup = () => {
  const [likes, setLikes] = useState(18542);
  const [comments, setComments] = useState(1245);
  const [shares, setShares] = useState(897);

  // Target Instagram URL provided by you
  const instaUrl = "https://www.instagram.com/weoads?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

  useEffect(() => {
    const interval = setInterval(() => {
      setLikes(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Function to open your Instagram page in a new tab
  const redirectToInsta = () => {
    window.open(instaUrl, '_blank');
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] h-[590px] bg-[#0A0D14] rounded-[2.5rem] p-3 border-[4px] border-gray-800/80 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden group">
      
      {/* Background Video (Muted, Autoplay, Loop from public/video.mp4) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer"
        onClick={redirectToInsta}
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Instagram Gradient Vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/95 pointer-events-none"></div>

      {/* Top Bar (Instagram Style Headers) */}
      <div className="relative z-10 flex justify-between items-center text-white px-3 pt-3">
        <span className="font-black tracking-widest text-[10px] bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">REELS</span>
        <div className="flex gap-2 items-center bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm cursor-pointer" onClick={redirectToInsta}>
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-wider text-white">VIRAL MODE</span>
        </div>
      </div>

      {/* Right Action Stack (All buttons redirect to your Instagram page) */}
      <div className="absolute right-4 bottom-24 z-10 flex flex-col items-center gap-5 text-white">
        {/* Like Button */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={redirectToInsta}
            className="w-11 h-11 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-lg shadow-lg hover:scale-110 transition-transform text-red-500"
            title="Like on Instagram"
          >
            ❤️
          </button>
          <span className="font-black font-mono text-xs tracking-tight text-white drop-shadow-md">{likes.toLocaleString()}</span>
        </div>

        {/* Comment Button */}
        <div className="flex flex-col items-center gap-1">
          <div 
            onClick={redirectToInsta}
            className="w-11 h-11 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-lg shadow-lg hover:scale-110 transition-transform cursor-pointer"
            title="Comment on Instagram"
          >
            💬
          </div>
          <span className="font-black font-mono text-xs tracking-tight text-white drop-shadow-md">{comments.toLocaleString()}</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={redirectToInsta}
            className="w-11 h-11 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/15 flex items-center justify-center text-lg shadow-lg hover:scale-110 transition-transform cursor-pointer text-white active:scale-95"
            title="Share on Instagram"
          >
            ✈️
          </button>
          <span className="font-black font-mono text-xs tracking-tight text-white drop-shadow-md">{shares.toLocaleString()}</span>
        </div>
      </div>

      {/* Bottom Profile Info & Caption (Redirects to Instagram on click) */}
      <div className="relative z-10 text-white text-left p-3 max-w-[84%] cursor-pointer" onClick={redirectToInsta}>
        <div className="flex items-center gap-2.5 mb-2">
          {/* Custom Logo from public/logo.png with Instagram gradient ring */}
          <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-md shrink-0">
            <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
              <img 
                src="/insta.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} 
              />
            </div>
          </div>

          <span className="font-extrabold text-sm tracking-tight drop-shadow-md">weoads.official</span>
          
          <button 
            onClick={(e) => { e.stopPropagation(); redirectToInsta(); }}
            className="text-[11px] font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white px-3 py-0.5 rounded-full transition-all"
          >
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-xs text-gray-200 font-medium leading-relaxed drop-shadow-md line-clamp-2">
          Scaling brands with native short-form video & viral engagement engines 🚀 #SocialGrowth #MarketingAgency
        </p>
      </div>
    </div>
  );
};
export default function SocialMediaMarketingPage() {
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
        additional_text2: 'SMM Page Lead Request', receivedBy: 'WeoAds System'
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
    <main className="min-h-screen bg-[#FFFBFD] font-sans text-gray-900 overflow-x-hidden flex flex-col relative selection:bg-pink-500 selection:text-white">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-grid-pink { background-image: radial-gradient(#ec4899 1.2px, transparent 1.2px); background-size: 28px 28px; opacity: 0.12; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 25s linear infinite; }
      `}} />

      {/* POPUP MODALS */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-pink-50 border-4 border-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Audit Request Submitted!</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">Our creative strategists will analyze your social profiles, engagement benchmarks, and content gaps. Expect a roadmap shortly!</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-pink-600 transition-colors shadow-lg">Close Window</button>
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

      {/* SECTION 1: HERO */}
      <section className="relative w-full pt-36 pb-28 px-6 md:px-12 text-center flex flex-col items-center justify-center min-h-[92vh]">
        <div className="absolute inset-0 bg-grid-pink -z-20"></div>
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[400px] bg-pink-300/30 rounded-full blur-[140px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-300/30 rounded-full blur-[140px] -z-10"></div>

        <ScrollReveal animation="blur-in" className="max-w-[1300px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
          <div>
            <div className="inline-flex items-center gap-3 bg-pink-50 border border-pink-100 text-pink-600 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></span>
              <span className="text-[10px] font-black tracking-widest uppercase">Next-Gen Social Agency</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.08] tracking-tight mb-8">
              Stop Posting Flyers.<br />
              Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600">Fanatical Cult.</span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
              Social media that converts views into active buyers. We engineer native short-form video, high-converting carousels, and active community management across every channel.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#contact" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_10px_25px_rgba(236,72,153,0.3)] hover:shadow-xl hover:-translate-y-1 transition-all text-center">
                Claim Free Social Audit
              </a>
              <a href="#platforms" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-10 py-4.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all hover:-translate-y-1 text-center shadow-sm">
                Explore Channels &rarr;
              </a>
            </div>
          </div>

          <div className="relative w-full">
            <LiveReelMockup />
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 2: PLATFORM MARQUEE */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-pink-500 transition-colors">INSTAGRAM REELS</span><span>•</span>
            <span className="hover:text-purple-600 transition-colors">TIKTOK CREATIVE</span><span>•</span>
            <span className="hover:text-blue-600 transition-colors">LINKEDIN B2B</span><span>•</span>
            <span className="hover:text-red-500 transition-colors">YOUTUBE SHORTS</span><span>•</span>
            <span className="hover:text-indigo-500 transition-colors">PINTEREST BOARDS</span>
          </div>
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-pink-500 transition-colors">INSTAGRAM REELS</span><span>•</span>
            <span className="hover:text-purple-600 transition-colors">TIKTOK CREATIVE</span><span>•</span>
            <span className="hover:text-blue-600 transition-colors">LINKEDIN B2B</span><span>•</span>
            <span className="hover:text-red-500 transition-colors">YOUTUBE SHORTS</span><span>•</span>
            <span className="hover:text-indigo-500 transition-colors">PINTEREST BOARDS</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: THE PROBLEM VS SOLUTION */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Why 90% of Social Accounts Stay Dead</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Posting static graphics once a week without hook psychology is burning your brand equity.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0} className="p-8 rounded-3xl bg-[#FFFDFE] border border-pink-100 shadow-sm">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center text-xl mb-6">📢</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">No 3-Second Hook</h4>
              <p className="text-gray-500 text-sm leading-relaxed">If your video doesn't hook the user in the first 3 seconds, the algorithm immediately stops recommending it.</p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="p-8 rounded-3xl bg-[#FFFDFE] border border-purple-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-xl mb-6">💬</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Zero DM Engagement</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Ignoring comments and DMs destroys community trust. Active human replies boost your engagement rank.</p>
            </ScrollReveal>
            <ScrollReveal delay={300} className="p-8 rounded-3xl bg-[#FFFDFE] border border-indigo-100 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-6">📈</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Vanity Metric Trap</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Counting empty likes instead of profile visits, saves, website clicks, and direct product sales.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: PLATFORMS HUB (BENTO GRID) */}
      <section id="platforms" className="w-full py-32 px-6 md:px-12 bg-[#FFF9FC] border-y border-pink-100/60">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-pink-600 font-black tracking-widest text-xs uppercase block mb-3">Platform Native Engine</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">Tailored For Every Feed</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="scale-up" delay={0} className="bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-xl hover:border-pink-200 transition-all">
              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6">📷</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">Instagram Growth</h3>
              <p className="text-sm text-gray-500 leading-relaxed">High-aesthetic Reels, carousel slide decks, and engaging story polls that convert casual scrollers into brand fans.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={150} className="bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-xl hover:border-purple-200 transition-all">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">🎬</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">TikTok Virality</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Trending audio integration, fast-paced native editing, and creator-led short videos designed for the For You Page (FYP).</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={300} className="bg-white border border-gray-100 rounded-3xl p-10 hover:shadow-xl hover:border-indigo-200 transition-all">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6">💼</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3">LinkedIn Authority</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Executive thought leadership posts, high-value PDF document slides, and B2B brand positioning that generates warm leads.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: WEEKLY CALENDAR UI SHOWCASE */}
      <section className="w-full py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up" className="mb-16">
            <span className="text-pink-600 font-black tracking-widest text-xs uppercase block mb-3">Structured Execution</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">30 Days Planned In Advance</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">No last-minute scrambling. You review and approve the full month's calendar before a single post goes live.</p>
          </ScrollReveal>

          <ScrollReveal animation="scale-up">
            <div className="bg-[#FAFBFF] border border-gray-200 rounded-[2.5rem] p-8 shadow-xl overflow-x-auto hide-scrollbar">
              <div className="grid grid-cols-7 gap-4 min-w-[800px]">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day, i) => (
                  <div key={day} className="flex flex-col gap-3 text-left">
                    <p className="text-[11px] font-black text-gray-400 text-center uppercase tracking-widest">{day}</p>
                    <div className={`rounded-2xl p-4 h-36 flex flex-col justify-between border ${i % 2 === 0 ? 'bg-pink-50/50 border-pink-100' : 'bg-purple-50/50 border-purple-100'}`}>
                      <span className="text-xs font-black text-gray-800">{i % 2 === 0 ? '🎬 Reel Post' : '📝 Carousel'}</span>
                      <p className="text-[10px] text-gray-500 leading-snug">Hook: "3 Mistakes Brands Make..."</p>
                      <span className="text-[9px] font-bold text-pink-600 bg-white px-2 py-0.5 rounded-md w-fit shadow-xs">06:00 PM</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SECTION 6: WORKFLOW TIMELINE */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FFF9FC] border-y border-pink-100/60">
        <div className="max-w-[1300px] mx-auto text-center">
          <ScrollReveal className="mb-24">
            <span className="text-pink-600 font-black tracking-widest text-[10px] uppercase block mb-4">The Content Machine</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">Four Steps To Virality</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {[
              { step: "01", title: "Brand Voice Audit", desc: "Aligning on visual aesthetics, audience tone, and core messaging pillars." },
              { step: "02", title: "Batch Production", desc: "Scripting, filming, and editing a full month's worth of short-form video." },
              { step: "03", title: "Scheduled Distribution", desc: "Publishing during peak activity hours with native captions and hashtags." },
              { step: "04", title: "Active Community", desc: "Replying to every comment and DM to build strong customer relationships." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 200} className="bg-white border border-gray-100 rounded-3xl p-10 relative hover:-translate-y-4 transition-transform duration-500 hover:shadow-xl">
                <div className="w-20 h-20 bg-pink-50 text-pink-600 font-black text-2xl rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">{item.step}</div>
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
            <h4 className="text-5xl md:text-6xl font-black text-pink-400 mb-3">12M+</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Organic Video Views</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-purple-400 mb-3">4.8x</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Avg. Engagement Lift</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black text-indigo-400 mb-3">100%</h4>
            <p className="text-sm font-bold tracking-widest uppercase text-gray-400">Platform Native Content</p>
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
              <h4 className="text-xl font-bold text-gray-900 mb-3">Do I need to film the videos myself?</h4>
              <p className="text-base text-gray-500 leading-relaxed">No. We can handle 100% of production in-house. However, if you or your founder want to be the face of the brand, we provide word-for-word scripts and recording guides.</p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={150} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Which social channels do you manage?</h4>
              <p className="text-base text-gray-500 leading-relaxed">We focus on Instagram, TikTok, LinkedIn, and YouTube Shorts as they currently yield the highest organic reach and conversion rates.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 9: WHITE CONTACT FORM SECTION */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 text-pink-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span> Free Social Audit
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to scale your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">brand presence?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Send us your social handles. We will analyze your engagement rates, content pillars, and competitor gaps.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xl">📞</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>🇮🇳 +91-6366666760</div>
              </div>
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">✉️</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Support</p>support@weoads.com</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Request Audit</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-pink-600">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-pink-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-pink-600">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-pink-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-pink-600">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-pink-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Social Handles</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="@yourbrand" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-pink-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Social Goals <span className="text-pink-600">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="What are your primary goals on social media?" rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-pink-500 transition-all resize-none placeholder-gray-400"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <input id="smm-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer accent-pink-600" />
                  <label htmlFor="smm-privacy" className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5">
                    I agree to the <span className="text-pink-600 font-bold hover:underline">Privacy Policy</span>.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
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