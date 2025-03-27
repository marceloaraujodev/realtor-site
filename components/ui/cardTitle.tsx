import React from "react";
import { PropertyProps } from '@/types/propertyType';

export default function CardTitle({property}: PropertyProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">{property.title}</h3>
      <p data-name="venda ou aluguel" className="text-xs">
        {property.listingType === "venda"
          ? `${property.propertyType} á ${property.listingType}`
          : `${property.propertyType} para ${property.listingType}`}
      </p>
    </div>
  );
}
