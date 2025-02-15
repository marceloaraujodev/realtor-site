import { notFound } from 'next/navigation';
import PropertyHeader from '@/components/property/PropertyHeader';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyDetails from '@/components/property/PropertyDetails';
import PropertyContact from '@/components/property/PropertyContact';
import { getProperty } from '@/lib/properties';


// export async function generateStaticParams() {
//   const propertyIds = getAllPropertyIds();
//   return propertyIds.map((id) => ({
//     id: id.toString(),
//   }));
// }

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const res = await getProperty(params.id);
  const property = res.data;
  // console.log('this is res in property page', res);
  // console.log('images', res.data.images);


  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PropertyHeader property={property} />
        <PropertyGallery images={property.images} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <PropertyDetails property={property} />
          </div>
          <div>
            <PropertyContact property={property} />
          </div>
        </div>
      </div>
    </div>
  );
}