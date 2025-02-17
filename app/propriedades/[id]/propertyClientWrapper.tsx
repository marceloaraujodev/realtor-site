// app/propriedades/[id]/PropertyClientWrapper.tsx
'use client';

import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyContact from '@/components/property/PropertyContact';
import { IpropertyType } from '@/types/propertyType';

interface Props {
  property: IpropertyType;
}

export default function PropertyClientWrapper({ property }: Props) {
  // console.log('this is property at PropertyClientWrapper', property)  

  const images = property.images?.map((image) => ({ id: image.id, url: image.url })) || [];
  // const features = property.features?.map((feature, index) => ({name: feature, _id: feature + index.toString()}) ) 

    // Transform features
    const features =
    // Check if `property.features` is an array and if all items in the array are strings.
    // If either condition fails, return `undefined`.
    Array.isArray(property.features) && property.features.every((f) => typeof f === 'string')
      ? property.features.map((feature, index) => ({
          name: feature,
          _id: `${feature}-${index}`,
        }))
      : undefined;

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyHeader property={property} />
        <PropertyGallery images={images} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <PropertyDetails property={property} features={features}/>
          </div>
          <div>
            <PropertyContact property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}
