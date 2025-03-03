'use client'
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { useProperty } from './context/PropertyContext';

export default function Home() {
  const { propertyList, fetchProperties, setPropertyList } = useProperty();

  useEffect(() => {
      console.log('Fetched properties:');
      fetchProperties();
  }, []); // This will log propertyList every time it updates


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