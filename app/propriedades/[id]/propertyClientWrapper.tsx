// app/propriedades/[id]/PropertyClientWrapper.tsx
'use client';
import { useParams } from "next/navigation";
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyContact from '@/components/property/PropertyContact';
import { useProperty } from '@/app/context/PropertyContext';


export default function PropertyClientWrapper() {
  const { propertyList, fetchProperties } = useProperty();
  const { id } = useParams(); // Get the property ID from the URL
  // console.log('this is property at PropertyClientWrapper', property)  
  const property = propertyList.find((p) => p.propertyId === id);

  // const images = property.images?.map((image) => ({ id: image.id, url: image.url })) || [];

  // console.log('images', images);
  // const features = property.features?.map((feature, index) => ({name: feature, _id: feature + index.toString()}) ) 

    // // Transform features
    // const features = property.features?.map((feature) => ({
    //   name: feature.name, 
    //   // _id: feature._id,
    // })) ?? [];

    if (!property) {
      return <p>Loading property...</p>; // Handle loading state
    }

    const images = property.images?.map((image) => ({ id: image.id, url: image.url })) || [];
    const features = property.features?.map((feature) => ({
      name: feature.name,
    })) ?? [];

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
