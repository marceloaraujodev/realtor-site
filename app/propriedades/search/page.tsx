'use client'
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import PropertyGridSearch from '@/components/PropertyGridSearch';
import { useProperty } from "@/app/context/PropertyContext";

export default function SearchResults() {
    const { propertyList, fetchProperties } = useProperty();
  
  const searchParams = useSearchParams();
  const propertyType = searchParams.get('propertyType');
  const bedrooms = searchParams.get('bedrooms');
  const priceRange = searchParams.get('priceRange');
  const location = searchParams.get('location');

  return (
    <div>
      <PropertyGridSearch properties={propertyList} />
    </div>
  );
}
