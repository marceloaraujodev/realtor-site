"use client";
import { useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PropertiesProps } from "@/types/propertyType";
import { useProperty } from "@/app/context/PropertyContext";
import handleWhatsClick from "@/utils/whatsAppClick";
import CardIcons from "./ui/cardIcons";
import CardTitle from "./ui/cardTitle";
import CardDetails from "./ui/cardDetails";

export default function PropertyGridSearch({ properties }: PropertiesProps) {
  const { propertyList, fetchProperties } = useProperty();

  useEffect(() => {
    fetchProperties();
  }, []); // This will log propertyList every time it updates

  const searchParams = useSearchParams();

  // Get query parameters
  const propertyType = searchParams.get("propertyType");
  const bedrooms = searchParams.get("bedrooms");
  const priceRange = searchParams.get("priceRange");
  const location = searchParams.get("location");

  // console.log(propertyType);

  // Filter properties based on query params
  const filteredProperties = properties.filter((property) => {
    // Check propertyType
    const isPropertyTypeMatch = !propertyType || property.propertyType === propertyType;

    // Check bedrooms === 4 is the same as the 4+ in the selection box
    const isBedroomsMatch =
      !bedrooms || (bedrooms === "4" ? (property.bedrooms ?? 0) >= 4 : property.bedrooms === parseInt(bedrooms));

    // Check price range
    const isPriceMatch =
      !priceRange ||
      priceRange === "all" ||
      (priceRange === "0-500000" && property.price <= 500000) ||
      (priceRange === "500000-1000000" && property.price > 500000 && property.price <= 1000000) ||
      (priceRange === "1000000-2000000" && property.price > 1000000 && property.price <= 2000000) ||
      (priceRange === "2000000+" && property.price > 2000000);

    // Check location
    const isLocationMatch = !location || property.location.toLowerCase().includes(location.toLowerCase());

    return isPropertyTypeMatch && isBedroomsMatch && isPriceMatch && isLocationMatch;
  });

  const urlpath = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`;
  // propriedades/184b3122-7338-44f5-a3c0-ce1f7d2f8a21/7357b71f-3014-480a-93b9-3d7f48583908

  return (
    <section className="py-16 bg-gray-50">
      <div className="flex flex-col max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Imóveis</h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto"
          data-name="propertyGridSearch card container">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => {
              const cover = property.images?.filter((c) => c.cover)[0];
              const imageUrl = `${urlpath}${cover?.url}`;
              return (
                <Card key={property.propertyId} className="overflow-hidden md:max-w-[350px]">
                  <Link href={`/propriedades/${property.propertyId}`} className="block">
                    <div className="aspect-video relative">
                      <img src={imageUrl} alt={property.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="p-4">
                      <CardTitle property={property} />
                      <CardIcons property={property} />
                      {/* cidade, price condominio */}
                      <CardDetails property={property} /> 

                    </div>
                  </Link>
                  <div className="w-full flex justify-center gap-5 mb-5">
                    <div className="">
                      <Link href={`/propriedades/${property.propertyId}`}>
                        <Button className="px-8">Ver Detalhes</Button>
                      </Link>
                    </div>
                    <Button className="px-5" onClick={handleWhatsClick}>
                      WhatsApp
                    </Button>
                  </div>
                </Card>
              );
            })
          ) : (
            <p className="col-span-full text-center">Nenhum imóvel encontrado</p>
          )}
        </div>
      </div>
    </section>
  );
}
