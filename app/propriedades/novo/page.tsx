'use client';

import { PropertyForm } from '@/components/property/PropertyForm';

export default function NewPropertyPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Adicionar Nova Propriedade</h1>
        <PropertyForm />
      </div>
    </div>
  );
}