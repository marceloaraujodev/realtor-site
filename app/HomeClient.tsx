'use client'
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { useProperty } from './context/PropertyContext';
import { PropertiesProps } from '@/types/propertyType';


export default function Home({properties}: PropertiesProps) {
  const { propertyList, fetchProperties } = useProperty();
  
  useEffect(() => {
    // ✅ Ensure latest data after navigation
    fetchProperties();
  }, []); // Re-fetch when the user navigates to the page

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