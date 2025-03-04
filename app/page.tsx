'use client'
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { useProperty } from './context/PropertyContext';


export default function Home() {
  const { propertyList } = useProperty();

  return (
    <div className="pt-16">
      <Hero />
      <SearchProperties />
      <PropertyGrid key={propertyList.length} properties={propertyList}/>
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}