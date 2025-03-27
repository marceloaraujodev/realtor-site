import React from "react";
import { PropertyProps } from "@/types/propertyType";
import { formatCurrency } from "@/lib/utils";

export default function CardDetails({property}: PropertyProps) {
  return (
    <>
      <p className="text-gray-600 mb-2">{property.location}</p>
      <p className="text-primary font-bold mb-4">{formatCurrency(property.price)}</p>
      <p className="text-sm">Condominío</p>
      <p className="text-xs font-bold mt-1 mb-4 min-h-[20px]">R${property.condominio}</p>
    </>
  );
}
