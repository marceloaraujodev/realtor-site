"use client";
import { useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { useProperty } from "@/app/context/PropertyContext";
import { IpropertyType, PropertiesProps } from "@/types/propertyType";
import handleWhatsClick from "@/utils/whatsAppClick";
import CardIcons from "./ui/cardIcons";
import CardTitle from "./ui/cardTitle";
import CardDetails from "./ui/cardDetails";

// properties grid search is the one which actually searches for properties
// properties grid only displays all the properties

export default function PropertyGrid({ properties }: PropertiesProps) {
  const { propertyList, fetchProperties } = useProperty();
  // console.log('porpertyList', propertyList)
  const showProperties = propertyList.length > 6 ? propertyList.slice(0, 6) : propertyList;

  useEffect(() => {
    fetchProperties();
  }, []); // This will log propertyList every time it updates

  return (
    <section className="py-16 bg-gray-50">
      <div className="flex flex-col max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Imóveis em Destaque</h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto"
          data-name="propertyGrid card container">
          {showProperties.map((property: IpropertyType, index: number) => {
            const urlpath = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`;

            const cover = property.images?.filter((c) => c.cover)[0];
            const imageUrl = `${urlpath}${cover?.url}`;

            return (
              <Card key={property.propertyId + index} className="overflow-hidden">
                <Link href={`/propriedades/${property.propertyId}`} className="block">
                  <div className="aspect-video relative">
                    {imageUrl ? (
                      <img src={imageUrl} alt={property.title} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div> // Fallback for when there is no image
                    )}
                  </div>
                  <div className="p-4">
                    <CardTitle property={property} />
                    <CardIcons property={property} />
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
          })}
        </div>
        {propertyList.length > 6 ? (
          <div className="text-center mt-10">
            <Link href="/propriedades">Propriedades</Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
