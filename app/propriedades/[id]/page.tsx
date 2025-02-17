// app/propriedades/[id]/page.tsx (Server Component)
import { getProperty } from '@/lib/properties';
import PropertyClientWrapper from './propertyClientWrapper';

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);
  // console.log('this is property ', property)      
  return <PropertyClientWrapper property={property} />;
}
