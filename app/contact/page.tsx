"use client";

import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  // Custom Dropdown State
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    "Advertiser (Buying Traffic)",
    "Publisher (Monetization)",
    "Performance Marketing",
    "Other"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (service: string) => {
    setFormData({ ...formData, service });
    setIsServiceOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-[#0B0F19] overflow-x-hidden flex flex-col">
      <Navbar />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-12 md:pt-20 pb-24 flex-1">
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="xl:col-span-6 flex flex-col gap-12 animate-[fadeInUp_0.8s_ease-out]">
            
            {/* Header Area */}
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full mb-6">
                <span className="text-sm">🚀</span>
                <span className="text-[10px] font-bold tracking-widest uppercase">Let's Connect</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-[#111827] leading-[1.1] tracking-tight mb-6">
                Let's Build Something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Amazing Together!
                </span>
              </h1>
              
              <p className="text-base text-gray-500 font-medium leading-relaxed max-w-lg mb-10">
                Have a project in mind or need expert advice? We're here to help you grow your business and achieve digital success.
              </p>

              {/* 3 Features */}
              <div className="flex flex-wrap md:flex-nowrap items-start gap-6 border-b border-gray-100 pb-12">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">⚡</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Quick Response</h4>
                    <p className="text-[10px] text-gray-500 font-medium leading-snug">We reply within<br/>24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">👥</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Expert Team</h4>
                    <p className="text-[10px] text-gray-500 font-medium leading-snug">Talk to our digital<br/>marketing experts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">🛡️</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">100% Confidential</h4>
                    <p className="text-[10px] text-gray-500 font-medium leading-snug">Your information is<br/>safe with us</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Get In Touch Info */}
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                Get In <span className="text-blue-600">Touch</span>
                <div className="flex-1 h-px bg-gray-100 ml-4"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-100/50">📞</div>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Phone Number</p>
                    <p className="text-sm font-bold text-gray-900 mb-1">+1 (737) 305-6651</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-sm border border-purple-100/50">✉️</div>
                  <div>
                    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-sm font-bold text-gray-900 mb-1">support@weoads.com</p>
                    <p className="text-[10px] text-gray-500 font-medium">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 shadow-sm border border-pink-100/50">📍</div>
                  <div>
                    <p className="text-[10px] font-bold text-pink-600 uppercase tracking-widest mb-1">Office Address</p>
                    <p className="text-sm font-bold text-gray-900 mb-1 leading-snug">5900 Balcones Drive STE 100</p>
                    <p className="text-[10px] text-gray-500 font-medium">Austin, TX 78731 USA</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN (FORM) ================= */}
          <div className="xl:col-span-6 animate-[fadeInUp_1s_ease-out]">
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Send Us a Message</h3>
              <p className="text-sm text-gray-500 font-medium mb-8">Fill out the form below and we'll get back to you soon.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium" />
                  </div>
                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="youremail@example.com" required className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" required className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium" />
                  </div>
                  {/* Company */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-gray-700">Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company name" className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium" />
                  </div>
                </div>

                {/* ================= CUSTOM DROPDOWN (Perfected UI) ================= */}
                <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                  <label className="text-[11px] font-bold text-gray-700">Service Interested In <span className="text-red-500">*</span></label>
                  
                  {/* Dropdown Toggle */}
                  <div 
                    onClick={() => setIsServiceOpen(!isServiceOpen)}
                    className={`w-full bg-white border text-sm rounded-xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all ${
                      isServiceOpen 
                        ? 'border-blue-500 ring-2 ring-blue-500/20 rounded-b-none' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={formData.service ? 'text-gray-900 font-medium' : 'text-gray-900 font-medium'}>
                      {formData.service || 'Select a service'}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isServiceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {/* Dropdown Menu (Matches Screenshot exactly) */}
                  {isServiceOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-md rounded-b-md z-50 overflow-hidden mt-[-1px]">
                      {/* Grey First Option */}
                      <div className="px-4 py-2.5 bg-[#C5C5C5] text-white text-sm font-medium border-b border-gray-300">
                        Select a service
                      </div>
                      {/* Selectable Options */}
                      {servicesList.map((srv, idx) => (
                        <div 
                          key={idx}
                          onClick={() => handleServiceSelect(srv)}
                          className="px-4 py-2.5 text-sm text-gray-800 bg-white hover:bg-[#808080] hover:text-white cursor-pointer transition-colors"
                        >
                          {srv}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold text-gray-700">Your Message <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project or requirements..." rows={4} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400 font-medium resize-none"></textarea>
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                  <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 shrink-0">
                    Send Message <span>&rarr;</span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <p className="text-[10px] font-semibold leading-tight">We respect your privacy.<br/>No spam, ever.</p>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM MAP SECTION (Real Map iframe + UI) ================= */}
        <div className="w-full mt-12 rounded-[2rem] h-[400px] relative overflow-hidden border border-gray-200 animate-[fadeInUp_1.2s_ease-out] bg-gray-100">
          
          {/* REAL GOOGLE MAPS IFRAME (Aesthetic Filter applied) */}
          <iframe 
            src="https://maps.google.com/maps?q=5900%20Balcones%20Drive%20Austin&t=&z=14&ie=UTF8&iwloc=&output=embed" 
            className="absolute inset-0 w-full h-full border-0 pointer-events-none opacity-60 grayscale-[80%]" 
            allowFullScreen={false} 
            loading="lazy"
          ></iframe>
          
          {/* Custom Map Pin (Matches exactly with image_d25c3a.jpg) */}
          <div className="absolute top-1/2 left-1/2 md:left-[65%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center animate-[bounce_2s_infinite]">
            <div className="relative flex flex-col items-center">
              {/* Purple Circle */}
              <div className="w-10 h-10 bg-[#4F46E5] rounded-full flex items-center justify-center shadow-md relative z-10">
                <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
              </div>
              {/* Triangle Tail */}
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#4F46E5] -mt-1 relative z-0"></div>
            </div>
            {/* Shadow under the pin */}
            <div className="w-6 h-1.5 bg-black/20 rounded-full blur-[2px] mt-1"></div>
          </div>

          {/* Map Information Card (Left Aligned) */}
          <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 w-[300px] bg-white rounded-[1.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col z-20 hidden sm:flex">
            <h3 className="text-xl font-black text-gray-900 mb-2">Our <span className="text-blue-600">Location</span></h3>
            <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed">
              Visit our office or drop us a mail.<br/>We'd love to meet you!
            </p>
            <a 
              href="https://maps.google.com/?q=5900+Balcones+Drive+STE+100+Austin,+TX+78731" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center border border-gray-200 text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:border-blue-600 transition-colors w-max gap-3"
            >
              Get Directions <span>&rarr;</span>
            </a>
          </div>

        </div>

      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}