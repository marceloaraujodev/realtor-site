'use client'; // Ensure client-side execution

import { useEffect, useState } from 'react';
import { useProperty } from '@/app/context/PropertyContext';
import PropertyClientWrapper from './propertyClientWrapper';
import { IpropertyType } from '@/types/propertyType';
import axios from 'axios';
import { siteUrl } from '@/config';


export default function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const { propertyList, fetchProperties, setPropertyList } = useProperty();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const propertyId: string = params.id;
  const property = propertyList.find((p) => p.propertyId === propertyId);

  // // Fetch properties on page load if not already available
  // useEffect(() => {
  //   if (propertyList.length === 0) {
  //     fetchProperties();
  //   } else {
  //     setLoading(false);
  //   }
  // }, [fetchProperties, propertyList]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching properties')
        const response = await axios.get(`${siteUrl}/properties/${propertyId}`);
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

