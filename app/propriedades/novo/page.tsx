'use client';
import { redirect } from 'next/navigation';
import PropertyForm from '@/components/property/PropertyForm';
import { useSession } from 'next-auth/react';


export default function NewPropertyPage() {
  const { data: session, status } = useSession();

    // Wait for session to load before making a redirect decision
    if (status === "loading") {
      // Show a loading message or spinner and make sure the page doesnt shrink vertically
      return <p>Carregando...</p>; 
    }

  if (!session) {
    redirect('/'); // Redirect to home page if user is not logged in
  }

  // console.log(session)
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Adicionar Nova Propriedade</h1>
        <PropertyForm />
      </div>
    </div>
  );
}