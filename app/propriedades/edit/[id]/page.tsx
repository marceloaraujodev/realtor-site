// 'use client'; fetch the property and pass to propertyForm

import { redirect } from 'next/navigation';
import PropertyForm from '@/components/property/PropertyForm';
import { getProperty } from '@/lib/properties';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { mockProperties } from '@/mockData';
import { siteUrl } from '@/config';


// this just grabs the information so next builds the routes, it does not pass data to the component
export async function generateStaticParams() {
  try {
    const res = await fetch(`${siteUrl}/api/propriedades`);
    const properties = await res.json();
    return properties.map((property: { propertyId: string }) => ({
      id: property.propertyId,
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

}


export default async function EditPropertyPage({params} : {params: {id: string}}) {
  // when this page loads we need to grab the props, figure it out a way to get it form the propertyHeader or fetch on page load. 
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/'); // Redirect to home page if user is not logged in
  }

  const property = await getProperty(params.id);
  console.log(property);

  if (!property) {
    return <p>Propriedade não encontrada.</p>;
  }


  // console.log(session)
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyForm property={property} />
      </div>
    </div>
  );
}

// 🚀 Forces Next.js to fetch fresh data on every request (SSR)
export const dynamic = 'force-dynamic';