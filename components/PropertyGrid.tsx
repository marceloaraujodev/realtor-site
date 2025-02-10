'use client';

import { Card } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import type { Property } from '@/lib/properties';
// import { getAllPropertyIds, getProperty, properties } from '@/lib/properties';
import { IpropertyType } from '@/types/propertyType';


interface PropertyGridProps {
  properties: IpropertyType[]; // Expecting an array of properties
}

export default function PropertyGrid({ properties }: PropertyGridProps) {


  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Imóveis em Destaque
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* loops through all properties */}
          {properties.map((property, index) => {
            const urlpath = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/`;
            const imageUrl = property.images?.[0]
              ? `${urlpath}${property.images[0]}`
              : undefined;

            return (
              <Card key={property._id} className="overflow-hidden">
                <Link href={`/propriedades/${property._id}`} className="block">
                  <div className="aspect-video relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={property.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div> // Fallback for when there is no image
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-primary font-bold mb-4">
                      {formatCurrency(property.price)}
                    </p>
                    <Button className="w-full">Ver Detalhes</Button>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
