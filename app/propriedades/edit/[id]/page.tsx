// 'use client'; fetch the property and pass to propertyForm

import { redirect } from 'next/navigation';
import PropertyForm from '@/components/property/PropertyForm';
import { PropertyProps } from '@/types/propertyType';
import { useParams } from 'next/navigation';
import { getProperty } from '@/lib/properties';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function EditPropertyPage({ searchParams }: { searchParams: {id?: string}}) {
  // when this page loads we need to grab the props, figure it out a way to get it form the propertyHeader or fetch on page load. 
  const session = await getServerSession(authOptions);

  const propertyId = searchParams?.id;


  if (!session) {
    redirect('/'); // Redirect to home page if user is not logged in
  }

  if (!propertyId) {
    redirect('/');
  }

  const property = await getProperty(propertyId);

  if (!property) {
    return <p>Propriedade não encontrada.</p>;
  }
 
    // Wait for session to load before making a redirect decision
    if (status === "loading") {
      // Show a loading message or spinner and make sure the page doesnt shrink vertically
      return <p>Carregando...</p>; 
    }



  // console.log(session)
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyForm />
      </div>
    </div>
  );
}