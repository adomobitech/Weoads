import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustLogos from '../components/TrustLogos';
import FeaturesGrid from '../components/FeaturesGrid';
import AdFormats from '../components/AdFormats';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans overflow-x-hidden text-[#0B0F19]">
      <Navbar />
      <Hero />
      <TrustLogos />
      <FeaturesGrid />
      <AdFormats />
      <FAQ />
      <Footer />
    </main>
  );
}