'use client';
import { Suspense, useEffect } from 'react';
import SearchProperties from '@/components/SearchProperties';
import PropertyGridSearch from '@/components/PropertyGridSearch';
import PropertyGrid from '@/components/PropertyGrid';
import { useProperty } from '../context/PropertyContext';

// properties grid search is the one that actually searches for properties
// properties grid only displays all the properties

function PropertiesPageInner() {
  const { propertyList, fetchProperties } = useProperty();

  useEffect(() => {
    fetchProperties();
    console.log('fetching properties');
  }, [fetchProperties]);

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <SearchProperties />
        <div className="mt-8">
          {/* <PropertyGrid properties={propertyList} /> */}
          <PropertyGridSearch properties={propertyList} />
        </div>
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesPageInner />
    </Suspense>
  );
}
