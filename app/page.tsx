'use client'
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import { useProperty } from './context/PropertyContext';
import axios from 'axios';

export default function Home() {
  const { propertyList, fetchProperties, setPropertyList } = useProperty();

  useEffect(() => {
      console.log('Fetched properties:');
      fetchProperties();
      const fetchData = async () => {
        const res = await axios.get('api/test')
        if (res.status === 200) {
          console.log('this should be the math.random value', res.data.test)
        }
      }
      fetchData()
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