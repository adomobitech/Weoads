"use client";

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';

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
  else if (animation === "blur-in") baseClass += isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-12";

  return <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// Interactive Tabbed Hero for Mobile Marketing
const InteractiveMobileHero = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Push Notifications", sub: "Real-time Instant Triggers", desc: "Re-engage dormant users instantly with personalized, time-sensitive push triggers that boast 3x higher click-through rates.", metric: "42%", label: "Average Open Rate", badge: "Instant Reach" },
    { title: "App Install Campaigns", sub: "iOS & Android User Acquisition", desc: "Scale high-value app installs across Meta, Google, and TikTok with deep-linked campaigns optimized for in-app purchases.", metric: "3.2x", label: "ROAS on Installs", badge: "Scale UA" },
    { title: "SMS & MMS Marketing", sub: "98% Open Rate Messaging", desc: "Direct text message marketing campaigns featuring rich media, discount codes, and automated cart recovery.", metric: "98%", label: "Open Rate in 3 Mins", badge: "Direct SMS" },
    { title: "Location-Based Geofencing", sub: "Hyper-Local Footfall Triggers", desc: "Target users based on precise GPS perimeters, sending push alerts when they enter competitor locations or retail hubs.", metric: "+210%", label: "In-Store Footfall", badge: "Geofencing" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-12 text-left w-full max-w-[1300px] mx-auto">
      <div className="lg:col-span-7 bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10"></div>
        <div>
          <span className="bg-purple-100 text-purple-700 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-6">
            {tabs[activeTab].badge}
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">{tabs[activeTab].title}</h3>
          <p className="text-purple-700 font-bold text-sm mb-6">{tabs[activeTab].sub}</p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">{tabs[activeTab].desc}</p>
        </div>
        <div className="bg-[#FAFBFF] border border-gray-100 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Benchmark</p>
            <p className="text-3xl font-black text-purple-600 font-mono">{tabs[activeTab].metric}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-gray-700">{tabs[activeTab].label}</p>
            <span className="text-[10px] text-purple-500 font-bold">Verified Result ✓</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
        {tabs.map((tab, idx) => {
          const isSelected = activeTab === idx;
          return (
            <div key={idx} onClick={() => setActiveTab(idx)} className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border flex items-center justify-between ${isSelected ? 'bg-[#0B0F19] text-white border-[#0B0F19] shadow-xl scale-[1.02]' : 'bg-white hover:bg-[#FAFBFF] text-gray-900 border-gray-200 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 ${isSelected ? 'bg-purple-500 text-gray-900' : 'bg-purple-50 text-purple-600'}`}>0{idx + 1}</div>
                <div>
                  <h4 className={`text-base font-black tracking-tight mb-0.5 ${isSelected ? 'text-white' : 'text-gray-900'}`}>{tab.title}</h4>
                  <p className={`text-xs truncate max-w-[200px] sm:max-w-[260px] ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>{tab.sub}</p>
                </div>
              </div>
              <span className={`text-xl font-bold transition-transform ${isSelected ? 'text-purple-400 translate-x-1' : 'text-gray-300'}`}>→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function MobileMarketingPage() {
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
        additional_text2: 'Mobile Marketing Lead Request', receivedBy: 'WeoAds System'
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
        .bg-grid-light { background-image: radial-gradient(#9333ea 1.5px, transparent 1.5px); background-size: 32px 32px; opacity: 0.12; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 25s linear infinite; }
      `}} />

      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-purple-50 border-4 border-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Strategy Requested!</h2>
            <p className="text-base text-gray-600 leading-relaxed mb-8">Our mobile growth strategists will review your brief and connect with you shortly.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-purple-600 transition-colors shadow-lg">Close Window</button>
          </div>
        </div>
      )}

      {/* SECTION 1: HERO */}
      <section className="relative w-full pt-32 pb-24 px-6 md:px-12 text-center flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-grid-light -z-20"></div>
        <div className="max-w-[1300px] mx-auto z-10 w-full">
          <div className="inline-flex items-center gap-3 bg-purple-50 border border-purple-100 text-purple-700 px-5 py-2.5 rounded-full mb-8 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
            <span className="text-[10px] font-black tracking-widest uppercase">Mobile Growth Solutions</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
            Reach Consumers <br/> Directly On <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Their Mobile.</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            Engage your audience wherever they go through precision push notifications, SMS campaigns, geofencing triggers, and high-converting app install funnels.
          </p>

          <InteractiveMobileHero />
        </div>
      </section>

      {/* SECTION 2: MARQUEE */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-purple-600 transition-colors">PUSH NOTIFICATIONS</span><span>•</span>
            <span className="hover:text-pink-600 transition-colors">SMS & MMS FLOWS</span><span>•</span>
            <span className="hover:text-purple-600 transition-colors">APP INSTALLS</span><span>•</span>
            <span className="hover:text-pink-600 transition-colors">GEOFENCING</span>
          </div>
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-purple-600 transition-colors">PUSH NOTIFICATIONS</span><span>•</span>
            <span className="hover:text-pink-600 transition-colors">SMS & MMS FLOWS</span><span>•</span>
            <span className="hover:text-purple-600 transition-colors">APP INSTALLS</span><span>•</span>
            <span className="hover:text-pink-600 transition-colors">GEOFENCING</span>
          </div>
        </div>
      </div>

      {/* SECTION 3: WHY MOBILE MARKETING MATTERS */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Mobile-First Engagement Wins</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Consumers spend 4.8+ hours daily on mobile devices. If you aren't in their notifications, you don't exist.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl mb-6">⚡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Instant Attention</h4>
              <p className="text-gray-500 text-sm leading-relaxed">SMS and Push notifications are opened within 3 minutes of receipt, crushing standard email open benchmarks.</p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center text-xl mb-6">📍</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Contextual Relevance</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Using geofencing, target users right when they walk past your physical store or competitor locations.</p>
            </ScrollReveal>
            <ScrollReveal delay={300} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl mb-6">🔄</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Unmatched Retention</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Re-engage inactive app users with targeted rewards and personalized push triggers that prevent churn.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 4: WORKFLOW */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto text-center">
          <ScrollReveal className="mb-24">
            <span className="text-purple-600 font-black tracking-widest text-[10px] uppercase block mb-4">Methodology</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">The Mobile Growth Engine</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {[
              { step: "01", title: "Audience Segmentation", desc: "Dividing your mobile subscriber base by behavior, location, and purchase history." },
              { step: "02", title: "Trigger Setup", desc: "Configuring automated push and SMS flows for cart recovery and onboarding." },
              { step: "03", title: "A/B Message Testing", desc: "Testing emojis, hook variations, and send times to maximize CTR." },
              { step: "04", title: "Revenue Attribution", desc: "Tracking direct attributed sales and lifetime value growth through custom dashboards." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 200} className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm text-center">
                <div className="w-20 h-20 bg-purple-50 text-purple-600 font-black text-2xl rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">{item.step}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: METRICS */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-24 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-6 md:pt-0"><h4 className="text-5xl md:text-6xl font-black mb-3">98%</h4><p className="text-sm font-bold tracking-widest uppercase opacity-90">SMS Open Rates</p></div>
          <div className="pt-10 md:pt-0"><h4 className="text-5xl md:text-6xl font-black mb-3">5.4x</h4><p className="text-sm font-bold tracking-widest uppercase opacity-90">Push Engagement Lift</p></div>
          <div className="pt-10 md:pt-0"><h4 className="text-5xl md:text-6xl font-black mb-3">35%</h4><p className="text-sm font-bold tracking-widest uppercase opacity-90">Retention Boost</p></div>
        </div>
      </section>

      {/* SECTION 6: FAQS */}
      <section className="w-full py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="flex flex-col gap-6">
            <ScrollReveal animation="fade-up" delay={0} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-3">How do you prevent unsubscribes on SMS/Push?</h4>
              <p className="text-base text-gray-500 leading-relaxed">We strictly enforce frequency capping and deliver high-value discounts or personalized triggers rather than spamming users, ensuring high retention and low opt-out rates.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 7: CONTACT */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-purple-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span> Mobile Strategy
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to dominate <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">mobile channels?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Let's build high-converting mobile messaging and acquisition sequences for your brand.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xl">📞</div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>🇮🇳 +91-6366666760</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Get Mobile Strategy</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500" />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Work Email" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500" />
                  <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="App / Company Name" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500" />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your mobile marketing goals..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 rounded-xl px-5 py-4 resize-none focus:outline-none focus:border-purple-500"></textarea>
                <div className="flex items-start gap-3 mt-2">
                  <input id="mob-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-purple-600 accent-purple-600 cursor-pointer" />
                  <label htmlFor="mob-privacy" className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5">I agree to the <span className="text-purple-600 font-bold">Privacy Policy</span>.</label>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all">
                  {isSubmitting ? 'Sending...' : 'Request Strategy'}
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