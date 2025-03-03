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
import { siteUrl } from '@/config';

export default function Home() {
  const { propertyList, fetchProperties, setPropertyList } = useProperty();
  // useEffect(() => {
  //   fetchProperties();
  //   console.log('fetching properties')
  // }, []); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching properties')
        const response = await axios.get(`${siteUrl}/properties`);
        if(response.status === 200) {
          setPropertyList(response.data);
          return response.data;
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  },[])

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