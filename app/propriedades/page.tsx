import SearchProperties from '@/components/SearchProperties';
import PropertyGridSearch from '@/components/PropertyGridSearch';
import PropertyGrid from '@/components/PropertyGrid';
import { getAllProperties } from '@/utils/properties';

// properties grid search is the one which actually searches for properties
// properties grid only displays all the properties

export default async function PropertiesPage() {
  const properties = await getAllProperties();
  //  console.log('this is all properties', properties);
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* <h1 className="text-3xl font-bold mb-11">Imóveis</h1> */}
        <SearchProperties properties={properties} />
        <div className="mt-8">
          {/* <PropertyGrid properties={properties} /> */}
          <PropertyGridSearch properties={properties} />
        </div>
      </div>
    </div>
  );
}
