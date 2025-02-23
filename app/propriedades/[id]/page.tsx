// app/propriedades/[id]/page.tsx (Server Component)
import { getProperty } from '@/lib/properties';
import PropertyClientWrapper from './propertyClientWrapper';
import { redirect } from 'next/navigation';
import PropertyForm from '@/components/property/PropertyForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { mockProperties } from '@/mockData';


// Generate static paths for all properties to be pre-rendered
export async function generateStaticParams() {
  if (process.env.NODE_ENV === 'production') {
    return mockProperties.map((property) => ({
      id: property.propertyId,
    }));
  }

  try {
    const res = await fetch(`http://localhost:3000/api/propriedades`);
    const properties = await res.json();
    return properties.map((property: { propertyId: string }) => ({
      id: property.propertyId,
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  // const property = await getProperty(params.id);
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const propertyId: string = params.id;
  const property = await getProperty(propertyId);

  if (!property) {
    return <p>Property not found.</p>;
  }     
  return <PropertyClientWrapper property={property} />;
}

// 🚀 Forces Next.js to fetch fresh data on every request (SSR)
export const dynamic = 'force-dynamic';