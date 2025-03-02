'use client'
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { useProperty } from './context/PropertyContext';
// import { getAllProperties } from '@/utils/properties';


export default function Home() {
  const { propertyList, fetchProperties } = useProperty();
  // const properties = await getAllProperties(); // Fetch properties
  console.log('Here', propertyList)
  useEffect(() => {
    console.log(propertyList)

    fetchProperties();
    console.log('fetching properties')
  }, []); // Empty dependency array will ensure it runs once when the component mounts
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