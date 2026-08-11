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

function SEOPage() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-[#0B0F19] overflow-x-hidden flex flex-col">
      <Navbar />

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full pt-16 pb-24 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -z-10 animate-[blobMove_14s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -z-10 animate-[blobMove_18s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute top-1/3 left-1/2 w-[250px] h-[250px] bg-purple-100/30 rounded-full blur-[90px] pointer-events-none -z-10 animate-[blobMove_11s_ease-in-out_infinite]"></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text */}
          <ScrollReveal animation="fade-right" className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full mb-6 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default">
              <span className="text-sm animate-[wiggle_2.5s_ease-in-out_infinite]">⚡</span>
              <span className="text-[10px] font-bold tracking-widest uppercase">Top Ranked SEO Agency</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-[#111827] leading-[1.1] tracking-tight mb-6">
              <span className="inline-block animate-[fadeSlideIn_0.8s_ease-out_both]">Smarter SEO Agency</span> <br />
              <span
                className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 animate-[gradientShift_4s_linear_infinite] inline-block"
                style={{ animationDelay: '0.2s' }}
              >
                Grow Visibility & Revenue
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-xl mb-8">
              In today's fast-moving digital landscape, visibility isn't optional — it's the launchpad. Landing on page one now means winning the fight for attention and trust. At <strong className="text-gray-900">WeoAds</strong>, we fuse data, bold creative strategy, and modern methods to deliver momentum you can measure.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-md hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 text-center"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></span>
                <span className="relative inline-flex items-center gap-1">
                  Explore SEO
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-50 hover:border-indigo-200 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 text-center"
              >
                See Results
              </Link>
            </div>
          </ScrollReveal>

          {/* Right Visual Card with Smooth Floating Animations */}
          <ScrollReveal animation="fade-left" delay={200} className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-[580px] bg-gradient-to-br from-[#0B0F19] to-[#1E1B4B] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-indigo-900/50 text-white relative overflow-hidden hover:shadow-indigo-500/20 hover:shadow-2xl transition-shadow duration-500 group">

              {/* Animated sheen sweeping across the card */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>

              {/* Slowly drifting glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-3xl animate-[blobMove_9s_ease-in-out_infinite]"></div>

              <div className="absolute top-4 right-6 flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 animate-[glowPulse_2s_ease-in-out_infinite]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 animate-[glowPulse_2s_ease-in-out_infinite_0.3s]"></div>
              </div>

              {/* Floating Badge Top Left */}
              <div className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl mb-12 shadow-lg animate-[float_5s_ease-in-out_infinite] hover:scale-105 transition-transform">
                <span className="text-indigo-400 animate-[wiggle_3s_ease-in-out_infinite]">🔍</span>
                <span className="text-xs font-bold">RANKINGS: #1 Position</span>
              </div>

              {/* Center Diamond Graphic with Continuous Pulse + Spin Glow */}
              <div className="relative flex flex-col items-center justify-center py-6 text-center">
                <div className="absolute w-32 h-32 rounded-full bg-indigo-500/20 blur-2xl animate-[glowPulse_3s_ease-in-out_infinite]"></div>
                <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/50 mb-6 rotate-45 animate-[pulse_3s_ease-in-out_infinite] hover:rotate-[225deg] transition-transform duration-700">
                  <span className="text-3xl text-white -rotate-45">↗</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-wider uppercase">WEOADS SEO</h3>
                <p className="text-[10px] text-indigo-300 tracking-widest uppercase mt-1">Nest. Nurture. Ascend.</p>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="relative inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl shadow-lg mt-6 animate-[float_6s_ease-in-out_infinite_reverse] hover:scale-105 transition-transform">
                <span className="text-emerald-400 animate-[wiggle_2.8s_ease-in-out_infinite]">📈</span>
                <span className="text-xs font-bold">GROWTH RATE: +145% YoY</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ================= 2. PRIORITY STATS (Animated Counters) ================= */}
      <ScrollReveal animation="fade-up">
        {(isVisible: boolean) => (
          <section className="w-full py-16 px-6 md:px-12 bg-white border-y border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-50 rounded-full blur-[100px] -z-0 animate-[blobMove_16s_ease-in-out_infinite]"></div>

            <div className="max-w-[1400px] mx-auto text-center relative">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-12">
                Your Growth is our <span className="text-blue-600 relative inline-block">
                  Priority
                  <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full scale-x-0 origin-left animate-[growLine_1.2s_ease-out_0.4s_forwards]"></span>
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-[#FAFBFF] border border-gray-100 p-8 rounded-3xl text-center shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">📈</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">
                    <Counter value={213456} isVisible={isVisible} />
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Organic Sessions Growth</p>
                </div>

                <div className="group bg-[#FAFBFF] border border-gray-100 p-8 rounded-3xl text-center shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🔍</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">
                    <Counter value={13200} isVisible={isVisible} suffix="+" />
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Keyword Positions</p>
                </div>

                <div className="group bg-[#FAFBFF] border border-gray-100 p-8 rounded-3xl text-center shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-purple-200 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">⚡</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">98/100</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Speed & UX Score</p>
                </div>

                <div className="group bg-[#FAFBFF] border border-gray-100 p-8 rounded-3xl text-center shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-emerald-200 transition-all duration-300">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-4 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">📊</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">
                    <Counter value={231580} isVisible={isVisible} suffix="+" />
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Qualified Leads</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </ScrollReveal>

      {/* ================= 3. CORE SEO SOLUTIONS ================= */}
      <section className="w-full py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Core <span className="text-blue-600">SEO Solutions</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1">
                <span className="absolute top-4 right-6 text-6xl font-black text-gray-50 select-none group-hover:text-blue-50 group-hover:scale-110 transition-all duration-500">01</span>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-6 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">💻</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">On-Page SEO</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Refine the structure and copy of your website to attract more visitors and rank with confidence. Our on-page SEO focuses on internal links, URL structure, and meta tags that support growth.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="group bg-white border border-indigo-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl relative overflow-hidden bg-gradient-to-br from-white to-indigo-50/25 h-full transition-all duration-300 hover:-translate-y-1">
                <span className="absolute top-4 right-6 text-6xl font-black text-gray-50 select-none group-hover:text-indigo-50 group-hover:scale-110 transition-all duration-500">02</span>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-6 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">🌐</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Off-Page SEO</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Strengthen your website with relevant backlinks and a broader online presence. We create proven strategies that earn quality mentions and build authority across the web.</p>
                <div className="w-full bg-indigo-100 h-1 mt-6 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full w-0 rounded-full group-hover:animate-[fillBar_1.2s_ease-out_forwards]"></div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="group bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1">
                <span className="absolute top-4 right-6 text-6xl font-black text-gray-50 select-none group-hover:text-purple-50 group-hover:scale-110 transition-all duration-500">03</span>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-6 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300">⚙️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Technical SEO</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Improve your site's technical health for faster load times and cleaner crawl paths. Our team optimizes speed, mobile usability, error handling, structured data, and secure HTTPS setup.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={450}>
              <div className="group bg-white border border-gray-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl relative overflow-hidden h-full transition-all duration-300 hover:-translate-y-1">
                <span className="absolute top-4 right-6 text-6xl font-black text-gray-50 select-none group-hover:text-emerald-50 group-hover:scale-110 transition-all duration-500">04</span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-6 group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">📍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Local SEO</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Increase local visibility with optimized listings, precise local keywords, and a stronger presence in regional search results. We help you win local searches through Google Business Profile optimization.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 4. SEARCH HAS CHANGED ================= */}
      <section className="w-full py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Search Has Changed.</h2>
              <p className="text-gray-500 font-medium">Old SEO chased shortcuts. Modern SEO is about delivering the clearest, most useful answer online.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal animation="fade-up" delay={0}>
              <div className="group border border-gray-100 bg-[#FAFBFF] p-8 rounded-3xl h-full hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 transition-all duration-300">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block group-hover:animate-[wiggle_1s_ease-in-out]">Beyond Single Keywords</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Intent Mapping</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">We don't stop at keywords; we translate intent. We shape your content structure so search engines clearly read your expertise.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="group border border-gray-100 bg-[#FAFBFF] p-8 rounded-3xl h-full hover:shadow-lg hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full inline-block group-hover:animate-[wiggle_1s_ease-in-out]">Technical SEO</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Core Infrastructure</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Search rewards speed. We refine your sitemaps, schema markup, and core web vitals so crawlers move through your site without friction.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={300}>
              <div className="group border border-gray-100 bg-[#FAFBFF] p-8 rounded-3xl h-full hover:shadow-lg hover:-translate-y-1 hover:border-purple-200 transition-all duration-300">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full inline-block group-hover:animate-[wiggle_1s_ease-in-out]">Off-Page Growth</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Ecosystem Authority</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">We build a trusted backlink profile through digital PR and strategic partnerships that signals credibility to search systems.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={450}>
              <div className="group border border-gray-100 bg-[#FAFBFF] p-8 rounded-3xl h-full hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full inline-block group-hover:animate-[wiggle_1s_ease-in-out]">UX & Engagement</span>
                <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">Conversion Signals</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">Rankings matter most when they convert. We improve dwell rates to create a stronger feedback loop.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. THE FLYWHEEL EFFECT ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#0B0F19] text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] animate-[blobMove_15s_ease-in-out_infinite]"></div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">

          <ScrollReveal animation="fade-right" className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-black mb-4">The Flywheel Effect</h2>
            <p className="text-gray-400 font-medium max-w-lg mb-10">SEO isn't a one-time task; it's a compounding system. Our process builds a reinforcing cycle of relevance, authority, and traffic that keeps spinning long after launch.</p>

            <div className="flex flex-col gap-4">
              <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-indigo-400/40 hover:translate-x-2 transition-all duration-300">
                <div>
                  <h4 className="font-bold text-white mb-1">Foundation</h4>
                  <p className="text-xs text-gray-400">Site audits and crawl readiness.</p>
                </div>
                <span className="text-indigo-400 font-bold text-lg group-hover:scale-125 transition-transform duration-300">01</span>
              </div>

              <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-indigo-400/40 hover:translate-x-2 transition-all duration-300">
                <div>
                  <h4 className="font-bold text-white mb-1">Relevance</h4>
                  <p className="text-xs text-gray-400">Topic clusters and semantic content.</p>
                </div>
                <span className="text-indigo-400 font-bold text-lg group-hover:scale-125 transition-transform duration-300">02</span>
              </div>

              <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-indigo-400/40 hover:translate-x-2 transition-all duration-300">
                <div>
                  <h4 className="font-bold text-white mb-1">Authority</h4>
                  <p className="text-xs text-gray-400">Earned links from trusted sources.</p>
                </div>
                <span className="text-indigo-400 font-bold text-lg group-hover:scale-125 transition-transform duration-300">03</span>
              </div>

              <div className="group bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between hover:bg-white/10 hover:border-indigo-400/40 hover:translate-x-2 transition-all duration-300">
                <div>
                  <h4 className="font-bold text-white mb-1">Optimization</h4>
                  <p className="text-xs text-gray-400">Continuous improvements from data.</p>
                </div>
                <span className="text-indigo-400 font-bold text-lg group-hover:scale-125 transition-transform duration-300">04</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" className="lg:col-span-5 flex justify-center">
            <div className="w-72 h-72 rounded-full border border-white/10 relative flex items-center justify-center animate-[spinSlow_20s_linear_infinite]">
              <div className="absolute -top-4 w-12 h-12 bg-indigo-900 border border-indigo-500 rounded-xl flex items-center justify-center text-xs animate-[float_4s_ease-in-out_infinite]">📊</div>
              <div className="absolute -right-4 w-12 h-12 bg-indigo-900 border border-indigo-500 rounded-xl flex items-center justify-center text-xs animate-[float_5s_ease-in-out_infinite_reverse]">🔍</div>
              <div className="absolute -bottom-4 w-12 h-12 bg-indigo-900 border border-indigo-500 rounded-xl flex items-center justify-center text-xs animate-[float_4.5s_ease-in-out_infinite]">&lt;/&gt;</div>
              <div className="absolute -left-4 w-12 h-12 bg-indigo-900 border border-indigo-500 rounded-xl flex items-center justify-center text-xs animate-[float_5.5s_ease-in-out_infinite_reverse]">📱</div>

              <div className="w-36 h-36 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/50 animate-[pulse_4s_infinite] [animation-direction:reverse]">
                <span className="text-xl font-black tracking-widest">ROI</span>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ================= 6. PRICING PLANS ================= */}
      <section className="w-full py-24 px-6 md:px-12">
        <ScrollReveal animation="fade-up">
          <div className="max-w-[1400px] mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Transparent SEO Pricing</h2>
            <p className="text-gray-500 font-medium">Choose the growth plan that fits your business stage.</p>
          </div>
        </ScrollReveal>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Beginner */}
          <ScrollReveal animation="fade-up" delay={0}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm h-full hover:shadow-xl hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Beginner</h3>
                <p className="text-xs text-gray-500 font-medium mb-6">Best for smaller businesses building local visibility.</p>
                <div className="text-3xl font-black text-gray-900 mb-6">$225<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-b border-gray-100 py-3 mb-6">Up to 30 Keywords</p>

                <ul className="space-y-3 text-xs font-medium text-gray-600 mb-8">
                  <li className="flex items-center gap-2">✓ Initial Review & Analysis</li>
                  <li className="flex items-center gap-2">✓ On Page Optimization</li>
                  <li className="flex items-center gap-2 text-gray-300">✕ AI/AEO/GEO Optimization</li>
                  <li className="flex items-center gap-2 text-gray-300">✕ Voice Search Optimization</li>
                  <li className="flex items-center gap-2">✓ Content Writing</li>
                  <li className="flex items-center gap-2">✓ Link Building</li>
                </ul>
              </div>
              <Link href="/contact" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:scale-[1.03] active:scale-95 transition-all duration-300 text-center block">
                Get Started
              </Link>
            </div>
          </ScrollReveal>

          {/* Advanced */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm h-full hover:shadow-xl hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Advanced</h3>
                <p className="text-xs text-gray-500 font-medium mb-6">Best for businesses expanding in focused local markets.</p>
                <div className="text-3xl font-black text-gray-900 mb-6">$449<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-b border-gray-100 py-3 mb-6">Up to 70 Keywords</p>

                <ul className="space-y-3 text-xs font-medium text-gray-600 mb-8">
                  <li className="flex items-center gap-2">✓ Initial Review & Analysis</li>
                  <li className="flex items-center gap-2">✓ On Page Optimization</li>
                  <li className="flex items-center gap-2 text-gray-300">✕ AI/AEO/GEO Optimization</li>
                  <li className="flex items-center gap-2 text-gray-300">✕ Voice Search Optimization</li>
                  <li className="flex items-center gap-2">✓ Content Writing</li>
                  <li className="flex items-center gap-2">✓ Link Building</li>
                </ul>
              </div>
              <Link href="/contact" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:scale-[1.03] active:scale-95 transition-all duration-300 text-center block">
                Get Started
              </Link>
            </div>
          </ScrollReveal>

          {/* Premium */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="bg-white border-2 border-indigo-600 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/40 animate-[glowPulse_2.5s_ease-in-out_infinite]">
                Most Popular
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2 mt-2">Premium</h3>
                <p className="text-xs text-gray-500 font-medium mb-6">Best for brands competing in demanding niches.</p>
                <div className="text-3xl font-black text-indigo-600 mb-6">$1,499<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest border-t border-b border-indigo-100 py-3 mb-6">Up to 250 Keywords</p>

                <ul className="space-y-3 text-xs font-medium text-gray-700 mb-8">
                  <li className="flex items-center gap-2">✓ Initial Review & Analysis</li>
                  <li className="flex items-center gap-2">✓ On Page Optimization</li>
                  <li className="flex items-center gap-2">✓ AI/AEO/GEO Optimization</li>
                  <li className="flex items-center gap-2">✓ Voice Search Optimization</li>
                  <li className="flex items-center gap-2">✓ Content Writing</li>
                  <li className="flex items-center gap-2">✓ Link Building</li>
                </ul>
              </div>
              <Link href="/contact" className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-xs hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 transition-all duration-300 text-center block shadow-md">
                Get Started
              </Link>
            </div>
          </ScrollReveal>

          {/* Supreme */}
          <ScrollReveal animation="fade-up" delay={450}>
            <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm h-full hover:shadow-xl hover:-translate-y-2 hover:border-indigo-200 transition-all duration-300">
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Supreme</h3>
                <p className="text-xs text-gray-500 font-medium mb-6">Best for brands in highly competitive industries.</p>
                <div className="text-3xl font-black text-gray-900 mb-6">$2,999<span className="text-xs text-gray-400 font-normal">/mo</span></div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-t border-b border-gray-100 py-3 mb-6">Keywords Unlimited</p>

                <ul className="space-y-3 text-xs font-medium text-gray-600 mb-8">
                  <li className="flex items-center gap-2">✓ Initial Review & Analysis</li>
                  <li className="flex items-center gap-2">✓ On Page Optimization</li>
                  <li className="flex items-center gap-2 text-gray-300">✕ AI/AEO/GEO Optimization</li>
                  <li className="flex items-center gap-2 text-gray-300">✕ Voice Search Optimization</li>
                  <li className="flex items-center gap-2">✓ Content Writing</li>
                  <li className="flex items-center gap-2">✓ Link Building</li>
                </ul>
              </div>
              <Link href="/contact" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:scale-[1.03] active:scale-95 transition-all duration-300 text-center block">
                Get Started
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ================= 7. CTA BANNER ================= */}
      <ScrollReveal animation="scale-up">
        <section className="w-full py-16 px-6 md:px-12">
          <div className="max-w-[1400px] mx-auto bg-gradient-to-br from-[#0B0F19] to-[#1E1B4B] rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] animate-[blobMove_12s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-[blobMove_14s_ease-in-out_infinite_reverse]"></div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 text-[10px] font-bold tracking-widest uppercase hover:scale-105 transition-transform duration-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[glowPulse_1.5s_ease-in-out_infinite]"></span>
                Let's Build Together
              </div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                Ready to win your <br />
                <span className="text-transparent bg-clip-text bg-[length:200%_auto] bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 animate-[gradientShift_4s_linear_infinite] inline-block">
                  search space?
                </span>
              </h2>

              <p className="text-gray-400 font-medium max-w-lg mx-auto mb-10 text-sm md:text-base">
                We partner with businesses ready to scale with intent. Get a complimentary audit and a custom growth roadmap.
              </p>

              <Link href="/contact" className="group relative inline-flex items-center gap-2 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all duration-300">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></span>
                <span className="relative">Start Your SEO Plan</span>
                <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

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

export default SEOPage;