import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { getAllProperties } from '@/utils/properties';


export default async function Home() {
  const properties = await getAllProperties(); // Fetch properties
  console.log('Here')
  return (
    <div className="pt-16">
      <Hero />
      <SearchProperties properties={properties} />
      <PropertyGrid />
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}