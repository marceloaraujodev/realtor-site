'use client';// fetch the property and pass to propertyForm

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import PropertyForm from '@/components/property/PropertyForm';
import { getProperty } from '@/utils/properties';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { siteUrl } from '@/config';
import { useProperty } from '@/app/context/PropertyContext';
import { useRouter } from 'next/navigation';
import { IpropertyType } from '@/types/propertyType';

// this just grabs the information so next builds the routes, it does not pass data to the component

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const [property, setProperty] = useState<IpropertyType | null>(null);
  const router = useRouter();
  const { propertyList, fetchProperties } = useProperty();
  // when this page loads we need to grab the props, figure it out a way to get it form the propertyHeader or fetch on page load.
  const session = await getServerSession(authOptions);

  useEffect(() => {
    // Fetch properties if not already fetched
    if (propertyList.length === 0) {
      fetchProperties();
    } else {
      // Look for the property by ID from the context's property list
      const foundProperty = propertyList.find((item) => item.propertyId === params.id);
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        // If the property isn't found, you can redirect or show a not found message
        router.push('/404'); // Redirecting to 404 page
      }
    }
  }, [propertyList, params.id, fetchProperties, router]);

  if (!session) {
    redirect('/'); // Redirect to home page if user is not logged in
  }

  // const property = await getProperty(params.id);
  // console.log(property);

  if (!property) {
    return <p>Propriedade não encontrada.</p>;
  }

  // console.log(session)
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyForm existingProperty={property} />
      </div>
    </div>
  );
}


