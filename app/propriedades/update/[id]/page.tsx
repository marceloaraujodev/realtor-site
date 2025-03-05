'use client';// fetch the property and pass to propertyForm

import { redirect } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import PropertyForm from '@/components/property/PropertyForm';
import { useSession } from 'next-auth/react';
import { useProperty } from '@/app/context/PropertyContext';
import { useRouter } from 'next/navigation';
import { IpropertyType } from '@/types/propertyType';

// this just grabs the information so next builds the routes, it does not pass data to the component

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const [property, setProperty] = useState<IpropertyType | null>(null);
  const router = useRouter();
  const { propertyList, fetchProperties } = useProperty();
  // when this page loads we need to grab the props, figure it out a way to get it form the propertyHeader or fetch on page load.
  const { data: session, status } = useSession();
  const {id} = use(params)

  useEffect(() => {
    // Fetch properties if not already fetched
    if (propertyList.length === 0) {
      fetchProperties();
    } else {
      // Look for the property by ID from the context's property list
      const foundProperty = propertyList.find((item) => item.propertyId === id);
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        // If the property isn't found, you can redirect or show a not found message
        router.push('/404'); // Redirecting to 404 page
      }
    }
  }, [propertyList, id, fetchProperties, router]);

  if (!session) {
    redirect('/'); // Redirect to home page if user is not logged in
  }



  if (!property) {
    return <p>Propriedade não encontrada.</p>;
  }
  // console.log('this is proptery', property)
  // console.log(session)
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyForm existingProperty={property} />
      </div>
    </div>
  );
}


