import Hero from '@/components/Hero';
import PropertyGrid from '@/components/PropertyGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import SearchProperties from '@/components/SearchProperties';
import axios from 'axios';

async function getProperties(){
  const res = await fetch('http://localhost:3000/api/propriedades/all', {
    cache: "no-store", // Prevent caching if data updates frequently
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export default async function Home() {
  const properties = await getProperties(); // Fetch properties
  console.log(properties);
  return (
    <div className="pt-16">
      <Hero />
      <SearchProperties properties={properties} />
      <PropertyGrid properties={properties}/>
      <AboutSection />
      <Testimonials />
      <Newsletter />
    </div>
  );
}