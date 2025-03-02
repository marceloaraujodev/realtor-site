'use client'
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { useProperty } from './context/PropertyContext';
// import { getAllProperties } from '@/utils/properties';


export default async function Home() {
  const { propertyList } = useProperty();
  // const properties = await getAllProperties(); // Fetch properties
  console.log('Here')
  return (
    <div className="pt-16">
      <Hero />
      <SearchProperties />
      <PropertyGrid properties={propertyList}/>
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}