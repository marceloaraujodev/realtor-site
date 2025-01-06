import PropertyGrid from '@/components/PropertyGrid';
import SearchProperties from '@/components/SearchProperties';
import PropertyGridSearch from '@/components/PropertyGridSearch';

export default function PropertiesPage() {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-11">Imóveis</h1>
        <SearchProperties />
        <div className="mt-8">
          {/* <PropertyGrid /> */}
          <PropertyGridSearch />
        </div>
      </div>
    </div>
  );
}