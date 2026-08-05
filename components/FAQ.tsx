"use client";

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is WeoAds?", a: "WeoAds is a premium performance marketing network connecting advertisers with high-quality global traffic and publishers with top-tier monetization solutions." },
    { q: "How is traffic quality verified?", a: "We use advanced AI and proprietary algorithms to filter bot traffic, ensuring 99.9% clean, verified, and safe impressions for our advertisers." },
    { q: "How do publisher payouts work?", a: "Publishers receive payments on a net-7 or net-15 basis, depending on volume. We support wire transfer, PayPal, and crypto." },
    { q: "How do I get started?", a: "Simply sign up as an advertiser or publisher, complete the quick verification process, and your dedicated account manager will help you launch within 24 hours." },
    { q: "What ad formats do you support?", a: "We support Pop-Under, Interstitial, In-Page Push, Native, Banner, and smart AutoTag solutions." },
    { q: "Can I run campaigns worldwide?", a: "Yes! Our active network spans over 150+ countries, offering true global reach and localized targeting capabilities." },
  ];

  return (
    <section className="w-full bg-[#FAFBFF] py-20 px-6 md:px-12">
      <div className="max-w-[1000px] mx-auto">
        
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Got Questions? We've Got Answers.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer ${openIndex === idx ? 'border-indigo-200 shadow-md' : 'border-gray-100 hover:border-gray-200 shadow-sm'}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <div className="p-5 flex justify-between items-center">
                <h4 className="font-bold text-gray-800 text-sm">{faq.q}</h4>
                <span className={`text-xl font-light transition-transform duration-300 ${openIndex === idx ? 'rotate-45 text-indigo-600' : 'text-gray-400'}`}>+</span>
              </div>
              
              <div className={`px-5 transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}