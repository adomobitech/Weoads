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
      apiFormData.append('additional_text2', 'WeoAds Website Form');
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

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-purple-50/50 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* ================= PREMIUM SUCCESS POPUP ================= */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl animate-[scale-up_0.3s_ease-out] my-8 relative">
            
            <div className="w-24 h-24 bg-orange-50 border-[6px] border-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-[#0B0F19] mb-4 tracking-tight">Thank You!</h2>
            <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">Your request has been submitted successfully.</p>
            <p className="text-sm text-gray-500 mb-10">Our team is reviewing your details and will get back to you shortly.</p>

            <div className="bg-[#FFF9F5] border border-[#FFE8D6] rounded-2xl p-6 md:p-8 text-left mb-10">
              <h3 className="text-lg font-black text-[#0B0F19] mb-6">What happens next?</h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-sm shadow-sm mt-0.5">1</span>
                  <p className="text-gray-700 font-semibold leading-relaxed">Our expert will review your business requirements.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-sm shadow-sm mt-0.5">2</span>
                  <p className="text-gray-700 font-semibold leading-relaxed">You'll receive a confirmation email with a ticket ID.</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold shrink-0 text-sm shadow-sm mt-0.5">3</span>
                  <p className="text-gray-700 font-semibold leading-relaxed">Our team will contact you within 24 hours to discuss strategy.</p>
                </div>
              </div>
            </div>

            <div className="mb-10 border-t border-gray-100 pt-8">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">Need Immediate Assistance?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-bold text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  +1 (737) 305-6651
                </div>
                <div className="hidden sm:block w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  support@weoads.com
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link 
                href="/" 
                onClick={() => setShowPopup(false)}
                className="w-full sm:w-auto bg-[#0B0F19] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Back to Home
              </Link>
              <button 
                onClick={() => setShowPopup(false)}
                className="w-full sm:w-auto bg-white border-2 border-orange-100 text-[#F97316] px-8 py-3.5 rounded-xl font-bold hover:bg-orange-50 hover:border-orange-200 transition-colors flex items-center justify-center gap-2"
              >
                Explore Services &rarr;
              </button>
            </div>

            <p className="text-sm text-gray-500">Join <strong className="text-gray-900">10,000+</strong> businesses that trust WeoAds</p>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm border border-indigo-100/50">📞</div>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Phone Number</p>
                    <p className="text-sm font-bold text-gray-900 mb-1">+1 (737) 305-6651</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 shadow-sm border border-purple-100/50">✉️</div>
                  <div>
                    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1">Email Address</p>
                    <p className="text-sm font-bold text-gray-900 mb-1">support@weoads.com</p>
                    <p className="text-[10px] text-gray-500 font-medium">We reply within 24 hours</p>
                  </div>
                </div>

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
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 ..." required className="w-full bg-[#FAFBFF] border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium" />
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

        {/* ================= REAL GOOGLE MAPS IFRAME ================= */}
        <div className="w-full mt-12 bg-white rounded-[2rem] h-[400px] relative overflow-hidden border border-gray-100 shadow-sm animate-[fadeInUp_1.2s_ease-out]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.080186981884!2d-97.7533845!3d30.3484218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cb6d61081535%3A0x608e063ba806eb55!2s5900%20Balcones%20Dr%20STE%20100%2C%20Austin%2C%20TX%2078731%2C%20USA!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>

      </div>

      <Footer />
    </main>
  );
}