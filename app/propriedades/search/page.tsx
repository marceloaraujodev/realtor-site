'use client'
import { Suspense, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import PropertyGridSearch from '@/components/PropertyGridSearch';
import { useProperty } from "@/app/context/PropertyContext";

function SearchResultsInner() {
    const { propertyList, fetchProperties } = useProperty();
 
    return (
        <div>
            <PropertyGridSearch properties={propertyList} />
        </div>
    );
}

export default function SearchResults() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <SearchResultsInner />
      </Suspense>
  );
}