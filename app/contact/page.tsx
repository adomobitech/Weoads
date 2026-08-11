"use client";

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
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
  
  // State for toggling map
  const [activeMap, setActiveMap] = useState<'india' | 'us'>('india');

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
        additional_text2: 'WeoAds Website Contact Form',
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
        // Reset form
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
    <main className="min-h-screen bg-[#FAFBFF] font-sans text-[#0B0F19] overflow-x-hidden flex flex-col relative">
      <Navbar />

      {/* Hide Scrollbar & Wiggle Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}} />

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* ================= DUAL FLOATING CONTACT BUTTONS (SPECIFIC FOR /CONTACT) ================= */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[99] flex flex-col gap-3 items-end">
        
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/916366666760" 
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-[#25D366] text-white rounded-full p-3.5 md:p-4 shadow-[0_10px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_rgba(37,211,102,0.6)] transition-all duration-300 hover:-translate-y-1 hover:pr-6 md:hover:pr-8"
          aria-label="WhatsApp Us"
        >
          <div className="relative z-10 flex items-center justify-center bg-white/20 rounded-full p-1.5 md:p-2">
            <svg className="w-5 h-5 md:w-6 md:h-6 animate-[wiggle_1s_ease-in-out_infinite] group-hover:animate-none" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 md:group-hover:ml-4 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm md:text-base tracking-wide text-white">
            WhatsApp Us
          </span>
        </a>

        {/* Call Button */}
        <a 
          href="tel:+91-6366666760" 
          className="group relative flex items-center bg-[#4F46E5] text-white rounded-full p-3.5 md:p-4 shadow-[0_10px_25px_rgba(79,70,229,0.4)] hover:shadow-[0_15px_35px_rgba(79,70,229,0.6)] transition-all duration-300 hover:-translate-y-1 hover:pr-6 md:hover:pr-8"
          aria-label="Call Us"
        >
          <div className="absolute inset-0 rounded-full border-2 border-[#4F46E5]/60 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] group-hover:animate-none"></div>
          <div className="relative z-10 flex items-center justify-center bg-white/20 rounded-full p-1.5 md:p-2">
            <svg className="w-5 h-5 md:w-6 md:h-6 animate-[wiggle_1s_ease-in-out_infinite] group-hover:animate-none text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 md:group-hover:ml-4 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm md:text-base tracking-wide text-white">
            +91-6366666760
          </span>
        </a>

      </div>

      {/* ================= PREMIUM SUCCESS POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
          <div className="bg-white rounded-[2rem] p-6 sm:p-10 max-w-2xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out] max-h-[90vh] overflow-y-auto hide-scrollbar">
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-50 border-[4px] sm:border-[6px] border-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-5 shrink-0">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black text-[#0B0F19] mb-2 tracking-tight">Thank You!</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium mb-1">Your request has been submitted successfully.</p>
            <p className="text-sm text-gray-500 mb-8">Our team is reviewing your details and will get back to you shortly.</p>

            <div className="bg-[#FFF9F5] border border-[#FFE8D6] rounded-2xl p-5 sm:p-6 text-left mb-8">
              <h3 className="text-base font-black text-[#0B0F19] mb-4">What happens next?</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm mt-0.5">1</span>
                  <p className="text-gray-700 text-sm font-semibold leading-relaxed">Our expert will review your business requirements.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm mt-0.5">2</span>
                  <p className="text-gray-700 text-sm font-semibold leading-relaxed">You'll receive a confirmation email with a ticket ID.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-xs shadow-sm mt-0.5">3</span>
                  <p className="text-gray-700 text-sm font-semibold leading-relaxed">Our team will contact you within 24 hours to discuss strategy.</p>
                </div>
              </div>
            </div>

            <div className="mb-6 border-t border-gray-100 pt-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Need Immediate Assistance?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +91-6366666760
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  support@weoads.com
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Link 
                href="/" 
                onClick={() => setShowPopup(false)}
                className="w-full sm:w-auto bg-[#0B0F19] text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Back to Home
              </Link>
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full sm:w-auto bg-white border-2 border-orange-100 text-[#F97316] px-8 py-3 rounded-xl font-bold hover:bg-orange-50 hover:border-orange-200 transition-colors flex items-center justify-center gap-2"
              >
                Explore Services &rarr;
              </button>
            </div>

            <p className="text-xs text-gray-400">Join <strong className="text-gray-700">10,000+</strong> businesses that trust WeoAds</p>
          </div>
        </div>
      )}

      {/* ================= CUSTOM ERROR POPUP ================= */}
      {errorMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out]">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              !
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Oops!</h3>
            <p className="text-sm text-gray-500 font-medium mb-8">{errorMsg}</p>
            <button 
              onClick={() => setErrorMsg("")}
              className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pt-12 md:pt-20 pb-24 flex-1">
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="xl:col-span-6 flex flex-col gap-12 animate-[fadeInUp_0.8s_ease-out]">
            
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
                Expect a response within 2 business hours. We're here to help you grow your business and achieve digital success.
              </p>

              <div className="flex flex-wrap md:flex-nowrap items-start gap-6 border-b border-gray-100 pb-12">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">⚡</div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 mb-1">Quick Response</h4>
                    <p className="text-[10px] text-gray-500 font-medium leading-snug">We reply within<br/>2 hours</p>
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

            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
                Get In <span className="text-blue-600">Touch</span>
                <div className="flex-1 h-px bg-gray-100 ml-4"></div>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                
                {/* Phones (Both US and India) */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-100/50">📞</div>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Phone Numbers</p>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">🇮🇳 +91-6366666760</p>
                    <p className="text-sm font-bold text-gray-900">🇺🇸 +1 (737) 305-6651</p>
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

                {/* India Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 shadow-sm border border-pink-100/50">📍</div>
                  <div>
                    <p className="text-[10px] font-bold text-pink-600 uppercase tracking-widest mb-1">India Office</p>
                    <p className="text-sm font-bold text-gray-900 mb-1 leading-snug">5th Floor, DLF Two Horizon Centre</p>
                    <p className="text-[10px] text-gray-500 font-medium">DLF Phase 5, Gurugram, 122002</p>
                  </div>
                </div>

                {/* US Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-sm border border-blue-100/50">🏢</div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">US Office</p>
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
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@agency.com" required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Country</label>
                    <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="e.g. India" className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">How Can We Help? <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Briefly describe your requirements..." rows={5} required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium resize-none"></textarea>
                </div>

                {/* Privacy Policy Checkbox */}
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input 
                      id="privacy" 
                      type="checkbox" 
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="w-4 h-4 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                  <label htmlFor="privacy" className="text-[11px] font-bold text-gray-600 uppercase tracking-wider cursor-pointer mt-[2px]">
                    I agree to the <span className="underline decoration-2 underline-offset-2 text-black cursor-pointer">Privacy Policy</span> and consent to being contacted.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full bg-[#0B0F19] text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 hover:-translate-y-0.5 transition-all duration-300 shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

              </form>
            </div>
          </div>

        </div>

        {/* ================= MULTIPLE MAPS TOGGLE SECTION ================= */}
        <div className="w-full mt-16 animate-[fadeInUp_1.2s_ease-out]">
          
          {/* Custom Tabs */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveMap('india')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeMap === 'india' ? 'bg-[#0B0F19] text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
            >
              🇮🇳 India Office
            </button>
            <button 
              onClick={() => setActiveMap('us')}
              className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${activeMap === 'us' ? 'bg-blue-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
            >
              🇺🇸 US Office
            </button>
          </div>

          <div className="bg-white rounded-[2rem] h-[450px] relative overflow-hidden border border-gray-100 shadow-sm transition-all duration-500">
            {activeMap === 'india' ? (
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.318898198642!2d77.0911762!3d28.4398188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18b4566f1fc9%3A0xc3f5fb4eb37a0eb5!2sTwo%20Horizon%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 animate-[fadeIn_0.5s_ease-out]"
              ></iframe>
            ) : (
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.080186981884!2d-97.7533845!3d30.3484218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cb6d61081535%3A0x608e063ba806eb55!2s5900%20Balcones%20Dr%20STE%20100%2C%20Austin%2C%20TX%2078731%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 animate-[fadeIn_0.5s_ease-out]"
              ></iframe>
            )}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}