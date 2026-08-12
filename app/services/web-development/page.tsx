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
  else if (animation === "blur-in") baseClass += isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-xl translate-y-12";

  return <div ref={ref} className={`${baseClass} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// ==========================================
// 2. UNIQUE ANIMATION: LIGHT MODE IDE
// ==========================================
const LightCodeEditor = () => {
  const [code, setCode] = useState('');
  const fullCode = `// Enterprise Web Application Initiated\nimport { MernStack, FlaskAPI } from '@weoads/core';\nimport { AWS_Cloud } from '@aws/infrastructure';\n\nconst buildPlatform = async (clientReqs) => {\n  console.log('Booting up frontend...');\n  const secureVault = await MernStack.deployReactUI();\n  \n  console.log('Initializing Python ML Models...');\n  const aiEngine = await FlaskAPI.initModels({ \n    accuracy: '92%+', \n    type: 'deepfake-detection' \n  });\n  \n  return AWS_Cloud.scale({\n    secureVault,\n    aiEngine,\n    uptime: '99.9%'\n  });\n};\n\nbuildPlatform().then(() => {\n  console.log('System Live 🚀');\n});`;
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setCode(fullCode.slice(0, i));
      i++;
      if (i > fullCode.length + 30) { i = 0; } 
    }, 35);
    return () => clearInterval(typingInterval);
  }, [fullCode]);

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.15)] overflow-hidden w-full text-left h-[450px] flex flex-col hover:border-blue-200 transition-colors duration-500 relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="bg-[#FAFBFF] px-6 py-4 flex items-center justify-between border-b border-gray-100 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <span className="text-xs text-gray-500 font-mono tracking-widest uppercase">system_architecture.tsx</span>
      </div>
      <div className="p-8 font-mono text-sm md:text-base text-gray-800 whitespace-pre-wrap overflow-hidden relative flex-1 z-10 leading-relaxed">
        <span className="text-blue-600 font-semibold">{code}</span>
        <span className="animate-pulse bg-blue-600 w-2 h-5 inline-block align-middle ml-1"></span>
      </div>
    </div>
  );
};

// ==========================================
// 3. ANIMATED COUNTER
// ==========================================
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

export default function WebDevelopmentPage() {
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
        additional_text2: 'Web Development Page Form', receivedBy: 'WeoAds System'
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
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-gray-900 overflow-x-hidden flex flex-col relative selection:bg-blue-500 selection:text-white">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .bg-grid-light { background-image: radial-gradient(#3b82f6 1px, transparent 1px); background-size: 30px 30px; opacity: 0.1; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        @keyframes float-fast { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(12px); } }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 5s ease-in-out infinite; }
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marqueeScroll 25s linear infinite; }
      `}} />

      {/* Popups */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-blue-50 border-4 border-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Project Initialized!</h2>
            <p className="text-base text-gray-600 mb-8">Our engineering team has received your logic requirements and will connect with you shortly.</p>
            <button onClick={() => setShowPopup(false)} className="w-full bg-[#0B0F19] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors">Close Window</button>
          </div>
        </div>
      )}
      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">!</div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Error!</h3>
            <p className="text-sm text-gray-500 mb-8">{errorMsg}</p>
            <button onClick={() => setErrorMsg("")} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-400">Try Again</button>
          </div>
        </div>
      )}

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full pt-32 pb-24 px-6 md:px-12 text-center flex flex-col justify-center min-h-[90vh]">
        <div className="absolute inset-0 bg-grid-light -z-20"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-300/30 rounded-full blur-[120px] -z-10 animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-300/30 rounded-full blur-[120px] -z-10 animate-float-fast"></div>

        <ScrollReveal animation="blur-in" className="max-w-[1300px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left mt-10">
          <div>
            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 text-blue-600 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] font-black tracking-widest uppercase">Full-Stack Engineering</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
              We Write <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Raw Code.</span><br/> We Build Empires.
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl mb-10">
              Stop relying on bloated page builders. We engineer high-performance MERN stack apps, Python-based AI integrations, and scalable platforms natively on AWS.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#contact" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-[0_10px_20px_rgba(59,130,246,0.2)] hover:bg-blue-500 transition-all hover:-translate-y-1 text-center">
                Initialize Project
              </a>
              <a href="#expertise" className="w-full sm:w-auto bg-white border border-gray-200 text-gray-800 px-10 py-4.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all hover:-translate-y-1 text-center shadow-sm">
                Explore Architecture &rarr;
              </a>
            </div>
          </div>
          <div className="relative w-full"><LightCodeEditor /></div>
        </ScrollReveal>
      </section>

      {/* ================= 2. TECH STACK MARQUEE ================= */}
      <div className="w-full bg-white py-8 border-y border-gray-100 overflow-hidden relative shadow-sm z-10">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex whitespace-nowrap animate-marquee w-max">
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-blue-500 transition-colors">REACT.JS</span><span className="text-gray-200">•</span>
            <span className="hover:text-gray-900 transition-colors">NEXT.JS</span><span className="text-gray-200">•</span>
            <span className="hover:text-green-500 transition-colors">NODE.JS</span><span className="text-gray-200">•</span>
            <span className="hover:text-indigo-500 transition-colors">MERN STACK</span><span className="text-gray-200">•</span>
            <span className="hover:text-orange-500 transition-colors">AWS CLOUD</span><span className="text-gray-200">•</span>
            <span className="hover:text-yellow-500 transition-colors">PYTHON / FLASK</span>
          </div>
          <div className="flex items-center gap-16 pr-16 text-3xl font-black text-gray-300 uppercase tracking-widest">
            <span className="hover:text-blue-500 transition-colors">REACT.JS</span><span className="text-gray-200">•</span>
            <span className="hover:text-gray-900 transition-colors">NEXT.JS</span><span className="text-gray-200">•</span>
            <span className="hover:text-green-500 transition-colors">NODE.JS</span><span className="text-gray-200">•</span>
            <span className="hover:text-indigo-500 transition-colors">MERN STACK</span><span className="text-gray-200">•</span>
            <span className="hover:text-orange-500 transition-colors">AWS CLOUD</span><span className="text-gray-200">•</span>
            <span className="hover:text-yellow-500 transition-colors">PYTHON / FLASK</span>
          </div>
        </div>
      </div>

      {/* ================= 3. NEW SECTION: WHY CHOOSE CUSTOM CODE ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Templates Fail Enterprises</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Off-the-shelf solutions break under pressure. Here is why we write raw code.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl mb-6">⚡</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Lightning Speed</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Templates are bloated with unused scripts. Custom React/Next.js code ensures sub-second load times and perfect Core Web Vitals.</p>
            </ScrollReveal>
            <ScrollReveal delay={150} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl mb-6">🔒</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Military-Grade Security</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Plugins have vulnerabilities. We build secure REST APIs, use JWT authentication, and deploy safe databases to protect user data.</p>
            </ScrollReveal>
            <ScrollReveal delay={300} className="p-8 rounded-3xl bg-[#FAFBFF] border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl mb-6">📈</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Infinite Scalability</h4>
              <p className="text-gray-500 text-sm leading-relaxed">When your traffic spikes from 1k to 100k, our AWS infrastructure auto-scales perfectly. No crashes, no downtime.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 4. BENTO GRID (SERVICES) ================= */}
      <section id="expertise" className="w-full py-32 px-6 md:px-12 relative bg-[#FAFBFF] border-y border-gray-100">
        <div className="max-w-[1300px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-20">
            <span className="text-blue-600 font-black tracking-widest text-xs uppercase block mb-4">Core Capabilities</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">Engineered For Scale</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal animation="scale-up" delay={0} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🏢</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Enterprise Systems (EMS)</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Industry-focused management tools built with React. Empower administrators to flawlessly allot work and track real-time progress.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={150} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">AI & Media Detection</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Integrating Python/Flask APIs hosting highly accurate ML models specifically designed for media processing and forgery detection.</p>
            </ScrollReveal>

            <ScrollReveal animation="scale-up" delay={300} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">Secure Data Vaults</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Impenetrable web applications built for developers and businesses to store, organize, and retrieve sensitive notes and code snippets.</p>
            </ScrollReveal>

            <ScrollReveal animation="fade-right" delay={0} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-[2.5rem] p-10 group lg:col-span-2 flex flex-col justify-center">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform">☁️</div>
              <h3 className="text-3xl font-black text-gray-900 mb-4">Cloud Infrastructure & AWS</h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">We do not just write code; we deploy it flawlessly. Utilizing AWS CLI, EC2 instances, and S3 buckets, we ensure your application stays online, scales automatically, and maintains a strict 99.9% uptime SLA.</p>
            </ScrollReveal>

            <ScrollReveal animation="fade-left" delay={150} className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">REST API Routing</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Scalable backend routing using Node.js and Express to ensure flawless, high-speed communication between your database and UI.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 5. NEW SECTION: INDUSTRIES WE SERVE ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Industries We Engineer For</h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['SaaS Platforms', 'FinTech & Banking', 'E-Commerce', 'Healthcare IT', 'EdTech Systems', 'Real Estate Portals', 'Logistics & Supply', 'Media & Entertainment'].map((ind, i) => (
              <ScrollReveal key={i} delay={i*50} animation="scale-up" className="bg-[#FAFBFF] border border-gray-100 p-6 rounded-2xl flex items-center justify-center hover:border-blue-300 transition-colors">
                <span className="font-bold text-gray-700 text-sm">{ind}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. DEEP TECH STACK BREAKDOWN ================= */}
      <section className="w-full py-24 px-6 md:px-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-400/20 rounded-full blur-[100px]"></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Technology Arsenal</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal animation="fade-up" delay={0} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-black text-cyan-300 mb-4">Frontend</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>• React.js</li><li>• Next.js</li><li>• Tailwind CSS</li><li>• Redux Toolkit</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={100} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-black text-green-300 mb-4">Backend</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>• Node.js</li><li>• Express.js</li><li>• Python</li><li>• Flask APIs</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-black text-yellow-300 mb-4">Database</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>• MongoDB</li><li>• PostgreSQL</li><li>• Redis</li><li>• Prisma</li>
              </ul>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={300} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-colors">
              <h3 className="text-xl font-black text-orange-300 mb-4">Cloud & DevOps</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>• AWS CLI</li><li>• EC2 & S3</li><li>• Docker</li><li>• CI/CD Pipelines</li>
              </ul>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 7. DEVELOPMENT WORKFLOW ================= */}
      <section className="w-full py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1300px] mx-auto text-center">
          <ScrollReveal animation="fade-up" className="mb-24">
            <span className="text-blue-600 font-black tracking-widest text-[10px] uppercase block mb-4">Methodology</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">The Development Lifecycle</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[3.5rem] left-[10%] right-[10%] h-1 bg-gray-100 -z-10"></div>
            {[
              { step: "01", title: "Logic & Planning", desc: "Defining schemas, auth flows, and core business logic." },
              { step: "02", title: "UI Architecture", desc: "Drafting high-fidelity, modern interfaces with TailwindCSS." },
              { step: "03", title: "MERN Coding", desc: "Writing clean, scalable code for frontend and backend." },
              { step: "04", title: "AWS Deployment", desc: "Rigorous QA and pushing your app live on secure cloud servers." }
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 200} className="bg-[#FAFBFF] border border-gray-100 rounded-3xl p-10 hover:-translate-y-4 transition-transform duration-500 hover:shadow-xl">
                <div className="w-20 h-20 bg-white border-2 border-blue-100 text-blue-600 font-black text-2xl rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. METRICS STRIP ================= */}
      <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-24 text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative z-10 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-6 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">99.9%</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">Uptime Guarantee (AWS)</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3">&lt; 1s</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">Average Load Time</p>
          </div>
          <div className="pt-10 md:pt-0">
            <h4 className="text-5xl md:text-6xl font-black mb-3"><AnimatedCounter end={100} duration={2000} />%</h4>
            <p className="text-sm font-bold tracking-widest uppercase opacity-80">Custom Built Code</p>
          </div>
        </div>
      </section>

      {/* ================= 9. FAQs ================= */}
      <section className="w-full py-32 px-6 md:px-12 bg-[#FAFBFF]">
        <div className="max-w-[900px] mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Frequently Asked Questions</h2>
          </ScrollReveal>
          <div className="flex flex-col gap-6">
            <ScrollReveal animation="fade-up" delay={0} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Do you use templates or custom code?</h4>
              <p className="text-base text-gray-500 leading-relaxed">We write custom code from scratch using React, Next.js, and Node.js. We completely avoid bloated CMS templates to ensure maximum security and speed.</p>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={150} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-shadow">
              <h4 className="text-xl font-bold text-gray-900 mb-3">Can you integrate Machine Learning models?</h4>
              <p className="text-base text-gray-500 leading-relaxed">Absolutely. We specialize in integrating Python and Flask backends to connect sophisticated AI models (such as media processing or deepfake forgery detection) seamlessly with your frontend UI.</p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================= 10. CONTACT FORM (WHITE/LIGHT THEME) ================= */}
      <section id="contact" className="w-full py-32 px-6 md:px-12 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <ScrollReveal animation="fade-right">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 px-5 py-2 rounded-full mb-8 text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Project Estimation
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 leading-[1.1]">
              Ready to engineer your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">next big idea?</span>
            </h2>
            
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-lg">
              Whether it's a sleek corporate site, an industry-level EMS, or a complex SaaS vault, our team is ready to write the code.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">📞</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Direct Line</p>
                  🇮🇳 +91-6366666760
                </div>
              </div>
              <div className="flex items-center gap-5 text-base font-bold text-gray-700 bg-[#FAFBFF] p-5 rounded-2xl border border-gray-100 w-fit pr-10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">✉️</div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Support</p>
                  support@weoads.com
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-left" delay={200}>
            <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl border border-gray-200 relative">
              <h3 className="text-3xl font-black text-gray-900 mb-8">Request Technical Audit</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-blue-600">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-blue-600">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@company.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-blue-600">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all placeholder-gray-400" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Project Requirements <span className="text-blue-600">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about the features, logic, or tech stack you need..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all resize-none placeholder-gray-400"></textarea>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <div className="flex items-center h-5">
                    <input id="dev-privacy" type="checkbox" checked={privacyAgreed} onChange={(e) => setPrivacyAgreed(e.target.checked)} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600" />
                  </div>
                  <label htmlFor="dev-privacy" className="text-xs font-medium text-gray-500 cursor-pointer mt-0.5">
                    I agree to the <span className="text-blue-600 font-bold hover:underline">Privacy Policy</span>.
                  </label>
                </div>

                <button type="submit" disabled={isSubmitting} className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 mt-4 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                  {isSubmitting ? 'Initializing Request...' : 'Get Development Quote'}
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