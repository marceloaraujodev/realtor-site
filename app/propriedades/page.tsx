'use client'
import { useEffect } from 'react';
import SearchProperties from '@/components/SearchProperties';
import PropertyGridSearch from '@/components/PropertyGridSearch';
import PropertyGrid from '@/components/PropertyGrid';
import { useProperty } from '../context/PropertyContext';

// properties grid search is the one which actually searches for properties
// properties grid only displays all the properties

export default function PropertiesPage() {

  const { propertyList, fetchProperties } = useProperty(); //if I need to pass the property list to those components
  //  console.log('this is PropertiesPage');

  useEffect(() => {
    fetchProperties();
    console.log('fetching properties')
  }, []); 

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* <h1 className="text-3xl font-bold mb-11">Imóveis</h1> */}
        <SearchProperties />
        <div className="mt-8">
          <PropertyGrid properties={propertyList} />
          {/* <PropertyGridSearch properties={propertyList} /> */}
        </div>
      </div>
    </div>
  );
}
