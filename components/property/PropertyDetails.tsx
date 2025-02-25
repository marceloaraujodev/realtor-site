import { Bed, Bath, Maximize2, Car } from 'lucide-react';
import { PropertyProps } from '@/types/propertyType';
// import { PropertyDetailsProps } from '@/types/formTypes';
interface PropertyDetailsProps extends PropertyProps {
  features?: { name: string; }[];
}

export default function PropertyDetails({ property, features }: PropertyDetailsProps) {
  console.log('property details ', property); 
  // Transform backend features (array of strings) into frontend format (array of objects)

  // const features: { name: string; _id: string }[] | undefined =
  // (property.features as string[])?.map((feature, index) => ({
  //   name: feature,
  //   _id: `${feature}-${index}`,
  // })) || undefined;

  console.log('features', features);
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {property.bedrooms && (
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Quartos</p>
              <p className="font-medium">{property.bedrooms}</p>
            </div>
          </div>
        )}
        {property.bathrooms && (
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Banheiros</p>
              <p className="font-medium">{property.bathrooms}</p>
            </div>
          </div>
        )}
        {property.totalArea && (
          <div className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Área Total</p>
              <p className="font-medium">{property.totalArea}m²</p>
            </div>
          </div>
        )}
        {property.totalArea && (
          <div className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Suite</p>
              <p className="font-medium">{property.totalArea}m²</p>
            </div>
          </div>
        )}
        {property.garage && (
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Vagas</p>
              <p className="font-medium">{property.garage}</p>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Descrição</h2>
        <p className="text-muted-foreground whitespace-pre-line">
          {property.description}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Características</h2>
        <ul className="grid grid-cols-2 gap-2">
          {features?.map((feature: { name: string; }, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{feature.name}</span> {/* Render the feature name */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}