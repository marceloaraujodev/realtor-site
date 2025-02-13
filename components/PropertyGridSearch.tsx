"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { PropertiesProps } from '@/types/propertyType';

export default function PropertyGridSearch({ properties}: PropertiesProps) {
  console.log('properties on grid search', properties)
  const [propertiesSearchDisplay, setPropertiesSearchDisplay] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log(searchParams);

  // Get query parameters
  const propertyType = searchParams.get("propertyType");
  const bedrooms = searchParams.get("bedrooms");
  const priceRange = searchParams.get("priceRange");
  const location = searchParams.get("location");

  console.log(propertyType);

  // Filter properties based on query params
  const filteredProperties = properties.filter((property) => {
    // Check propertyType
    const isPropertyTypeMatch = !propertyType || property.propertyType === propertyType;

    // Check bedrooms === 4 is the same as the 4+ in the selection box
    const isBedroomsMatch = !bedrooms || 
    (bedrooms === '4' ? (property.bedrooms ?? 0) >= 4 : property.bedrooms === parseInt(bedrooms));

    // Check price range
    const isPriceMatch =
      !priceRange ||
      (priceRange === "0-500000" && property.price <= 500000) ||
      (priceRange === "500000-1000000" && property.price > 500000 && property.price <= 1000000) ||
      (priceRange === "1000000-2000000" && property.price > 1000000 && property.price <= 2000000) ||
      (priceRange === "2000000+" && property.price > 2000000);

    // Check location
    const isLocationMatch = !location || property.location.toLowerCase().includes(location.toLowerCase());

    return isPropertyTypeMatch && isBedroomsMatch && isPriceMatch && isLocationMatch;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Imóveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Card key={property._id} className="overflow-hidden">
                <Link href={`/propriedades/${property._id}`} className="block">
                  <div className="aspect-video relative">
                    <img src={property.images?.[0]} alt={property.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-primary font-bold mb-4">{formatCurrency(property.price)}</p>
                    <Button className="w-full">Ver Detalhes</Button>
                  </div>
                </Link>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center">Nenhum imóvel encontrado</p>
          )}
        </div>
      </div>
    </section>
  );
}
