import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <SearchProperties />
      <PropertyGrid />
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}