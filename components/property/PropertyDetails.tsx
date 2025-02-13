import { Bed, Bath, Maximize2, Car } from 'lucide-react';
import { PropertyProps } from '@/types/propertyType';


export default function PropertyDetails({ property }: PropertyProps){

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
        {property.area && (
          <div className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Área</p>
              <p className="font-medium">{property.area}m²</p>
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
          {property.features?.map((feature) => (
            <li key={feature.name} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"/>
              {feature.name}
              
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}