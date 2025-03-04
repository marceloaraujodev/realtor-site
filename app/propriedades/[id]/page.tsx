'use client'; // Ensure client-side execution

import { useEffect, useState, use } from 'react';
import { useProperty } from '@/app/context/PropertyContext';
import PropertyClientWrapper from './propertyClientWrapper';


export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { propertyList, fetchProperties } = useProperty();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {id: propertyId} = use(params)

  // const propertyId: string = params.id;
  const property = propertyList.find((p) => p.propertyId === propertyId);
  // console.log('property',property)

  // Fetch properties on page load if not already available
  useEffect(() => {
    if (!propertyList.length) {
      fetchProperties();
    } else {
      setLoading(false);
    }
  }, [fetchProperties, propertyList]);

  // If the property isn't found, show an error message
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  return <PropertyClientWrapper />;
}

