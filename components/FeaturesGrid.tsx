export default function FeaturesGrid() {
  const features = [
    {
      icon: "📣", iconBg: "bg-purple-50", iconText: "text-purple-500",
      title: "Performance Media Buying",
      desc: "Run high-performing campaigns across multiple formats and channels."
    },
    {
      icon: "⚖️", iconBg: "bg-blue-50", iconText: "text-blue-500",
      title: "Programmatic RTB",
      desc: "Access premium inventory in real-time with our advanced bidding system."
    },
    {
      icon: "🛡️", iconBg: "bg-emerald-50", iconText: "text-emerald-500",
      title: "Fraud & Fill Protection",
      desc: "Advanced algorithms to ensure quality traffic and protect your budget."
    },
    {
      icon: "📊", iconBg: "bg-yellow-50", iconText: "text-yellow-500",
      title: "Real-Time Analytics",
      desc: "Monitor performance, ROI, and spend with a live, easy-to-use dashboard."
    },
    {
      icon: "💰", iconBg: "bg-green-50", iconText: "text-green-500",
      title: "Publisher Monetization",
      desc: "Maximize eCPM with smart optimization and weekly payouts."
    },
    {
      icon: "👤", iconBg: "bg-pink-50", iconText: "text-pink-500",
      title: "Dedicated Account Managers",
      desc: "Get expert support and strategy from our 24/7 account managers."
    }
  ];

  return (
    <section className="w-full bg-[#FAFBFF] py-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Powerful Solutions To Scale Your Business</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">
            From traffic acquisition to fraud protection, we provide everything you need to scale performance marketing with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-start gap-5">
              <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center text-2xl ${feature.iconBg} ${feature.iconText}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}