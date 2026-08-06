import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';

// Below-the-fold components ko lazy load kar rahe hain taaki initial load pe load na padé
const AdFormats = dynamic(() => import('../components/AdFormats'), {
  ssr: true,
});
const FAQ = dynamic(() => import('../components/FAQ'), {
  ssr: true,
});
const Footer = dynamic(() => import('../components/Footer'), {
  ssr: true,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFBFF] font-sans overflow-x-hidden text-[#0B0F19]">
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <AdFormats />
      <FAQ />
      <Footer />
    </main>
  );
}