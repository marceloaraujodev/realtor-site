"use client";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { IpropertyType, PropertiesProps } from '@/types/propertyType';
import { useProperty } from "@/app/context/PropertyContext";
import handleWhatsClick from "@/utils/whatsAppClick";

export default function PropertyGridSearch({ properties}: PropertiesProps) {
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
    const isBedroomsMatch = !bedrooms || 
    (bedrooms === '4' ? (property.bedrooms ?? 0) >= 4 : property.bedrooms === parseInt(bedrooms));

    // Check price range
    const isPriceMatch =
      !priceRange ||
      (priceRange === 'all') ||
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto"
        data-name='propertyGridSearch card container'>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => {
              const cover = property.images?.filter(c => c.cover)[0];
              const imageUrl = `${urlpath}${cover?.url}`;
             return (
             <Card key={property.propertyId} className="overflow-hidden md:max-w-[350px]">
                <Link href={`/propriedades/${property.propertyId}`} className="block">
                  <div className="aspect-video relative">
                    <img src={imageUrl} alt={property.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                      {property.title}
                    </h3>
                    <p data-name="venda ou aluguel" className='text-xs'>{property.listingType === 'venda' ? `${property.propertyType} á ${property.listingType}` : `${property.propertyType} para ${property.listingType}` }</p>
                    <div data-name="icons div" className='flex justify-start mt-6 mb-4 space-x-6'>
                      <div className='flex items-center'>
                        <svg data-name='bedrooms' className='h-5 w-5' version="1.1" id="Layer_1" 
                          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 99.94" enableBackground="new 0 0 122.88 99.94" xmlSpace="preserve"><g><path d="M4.22,67.36h114.31v-4.67c0-1.13-0.22-2.18-0.61-3.12c-0.42-1-1.04-1.89-1.81-2.66c-0.47-0.47-1-0.9-1.57-1.28 c-0.58-0.39-1.2-0.73-1.85-1.02c-1.75-0.38-3.49-0.74-5.22-1.08c-1.74-0.34-3.49-0.66-5.25-0.96c-0.08-0.01-0.14-0.02-0.22-0.04 c-0.89-0.15-1.74-0.29-2.55-0.42c-0.81-0.13-1.67-0.26-2.57-0.4l-0.02,0c-6.12-0.78-12.22-1.38-18.31-1.78 c-6.1-0.4-12.17-0.6-18.2-0.61c-3.58,0-7.15,0.06-10.72,0.2c-3.55,0.14-7.12,0.34-10.69,0.62l-0.02,0 c-3.34,0.31-6.67,0.7-10.01,1.15c-3.33,0.45-6.67,0.98-10.03,1.57l-0.37,0.09c-0.07,0.02-0.14,0.03-0.2,0.03 c-0.06,0.01-0.12,0.01-0.18,0.01c-1.57,0.28-3.18,0.59-4.84,0.92c-1.61,0.32-3.22,0.66-4.82,1.01c-0.4,0.22-0.78,0.47-1.14,0.73 c-0.36,0.27-0.71,0.56-1.02,0.87v0c-0.67,0.67-1.2,1.44-1.56,2.3c-0.34,0.81-0.53,1.71-0.53,2.69V67.36L4.22,67.36z M14.2,0h92.99 c1.21,0,2.37,0.24,3.43,0.68c1.1,0.46,2.09,1.13,2.92,1.95c0.83,0.83,1.5,1.82,1.95,2.92c0.44,1.06,0.68,2.22,0.68,3.43v42.69 c0.51,0.3,1.01,0.63,1.47,0.99c0.52,0.4,1.01,0.82,1.46,1.27c1.16,1.16,2.1,2.51,2.73,4.03c0.6,1.43,0.93,3.02,0.93,4.74v6.09 c0.03,0.1,0.06,0.2,0.08,0.3l0,0.02c0.02,0.13,0.03,0.25,0.03,0.37c0,0.13-0.01,0.26-0.04,0.39l0,0c-0.02,0.1-0.05,0.2-0.08,0.3 v27.66c0,0.58-0.24,1.11-0.62,1.49c-0.38,0.38-0.91,0.62-1.49,0.62h-4.35c-0.49,0-0.94-0.17-1.3-0.45 c-0.36-0.28-0.63-0.68-0.74-1.14c-0.8-2.3-1.61-4.12-2.48-5.54c-0.86-1.4-1.78-2.4-2.84-3.11c-1.07-0.71-2.35-1.16-3.9-1.43 c-1.58-0.28-3.42-0.37-5.61-0.36l-79.76,0.1l-0.04,0c-1.57-0.03-2.86,0.17-3.94,0.59c-1.07,0.42-1.94,1.05-2.66,1.86 c-0.81,0.9-1.49,2.05-2.11,3.39c-0.63,1.37-1.2,2.93-1.77,4.64l0,0c-0.14,0.44-0.42,0.79-0.77,1.04c-0.33,0.24-0.73,0.38-1.14,0.4 c-0.03,0.01-0.06,0.01-0.09,0.01H2.11c-0.58,0-1.11-0.24-1.49-0.62C0.24,98.94,0,98.41,0,97.83V61.52c0-1.57,0.3-3.01,0.84-4.31 c0.58-1.38,1.43-2.61,2.49-3.67c0.3-0.3,0.63-0.6,0.98-0.88c0.3-0.24,0.6-0.47,0.92-0.68V8.89c0-1.21,0.24-2.36,0.68-3.4 c0.46-1.09,1.13-2.07,1.96-2.89c0.83-0.82,1.82-1.47,2.91-1.92C11.84,0.24,12.99,0,14.2,0L14.2,0z M107.19,4.22H14.2 c-0.65,0-1.27,0.13-1.84,0.36c-0.59,0.24-1.11,0.59-1.55,1.02c-0.43,0.42-0.78,0.94-1.02,1.5C9.57,7.65,9.45,8.25,9.45,8.89v41.06 c0.3-0.1,0.6-0.18,0.91-0.26c0.49-0.13,0.98-0.24,1.47-0.32c0.68-0.12,1.42-0.25,2.22-0.39c0.6-0.1,1.24-0.21,1.9-0.31V38.19 c0-1.58,0.32-3.09,0.89-4.47c0.6-1.44,1.47-2.73,2.55-3.81c1.08-1.08,2.37-1.95,3.81-2.55c1.38-0.57,2.89-0.89,4.47-0.89h19.82 c1.58,0,3.09,0.32,4.47,0.89c1.44,0.6,2.73,1.47,3.81,2.55c1.08,1.08,1.95,2.37,2.55,3.81c0.57,1.38,0.89,2.89,0.89,4.47v6.69 c0.7-0.01,1.4-0.01,2.11-0.01v-6.68c0-1.58,0.32-3.09,0.89-4.47c0.6-1.44,1.47-2.73,2.55-3.81c1.08-1.08,2.37-1.95,3.81-2.55 c1.38-0.57,2.89-0.89,4.47-0.89h19.82c1.58,0,3.09,0.32,4.47,0.89c1.44,0.6,2.73,1.47,3.81,2.55c1.08,1.08,1.95,2.37,2.55,3.81 c0.57,1.38,0.89,2.89,0.89,4.47v10.34c0.75,0.11,1.55,0.24,2.41,0.38c0.95,0.15,1.86,0.3,2.74,0.45c0.45,0.08,0.91,0.17,1.37,0.28 c0.29,0.07,0.57,0.14,0.84,0.22V8.98c0-0.64-0.13-1.25-0.36-1.81c-0.24-0.58-0.6-1.1-1.04-1.55c-0.44-0.44-0.97-0.8-1.54-1.04 C108.44,4.35,107.83,4.22,107.19,4.22L107.19,4.22z M43.21,45.56c2.01-0.15,4.03-0.28,6.08-0.38c1.89-0.1,3.8-0.17,5.71-0.22v-6.77 c0-1.01-0.2-1.98-0.57-2.86c-0.38-0.92-0.94-1.74-1.64-2.44c-0.69-0.69-1.52-1.25-2.44-1.64c-0.88-0.37-1.85-0.57-2.86-0.57H27.67 c-1.01,0-1.98,0.2-2.86,0.57c-0.92,0.38-1.74,0.94-2.44,1.64c-0.69,0.69-1.25,1.52-1.64,2.44c-0.37,0.88-0.57,1.85-0.57,2.86V48 c1.62-0.24,3.26-0.46,4.94-0.68c1.81-0.23,3.61-0.44,5.39-0.64c0.69-0.08,1.43-0.17,2.2-0.25c0.72-0.08,1.47-0.15,2.27-0.23 c1.36-0.13,2.71-0.25,4.04-0.36C40.37,45.75,41.77,45.65,43.21,45.56L43.21,45.56z M65.54,44.9c1.21,0.02,2.42,0.05,3.63,0.09 c1.34,0.04,2.68,0.1,4.01,0.16l0.01,0c2.19,0.08,4.33,0.18,6.41,0.3c2.08,0.12,4.11,0.27,6.05,0.44c2.82,0.25,5.55,0.55,8.14,0.9 c2.32,0.32,4.52,0.68,6.58,1.08v-9.68c0-1.01-0.2-1.98-0.57-2.86c-0.38-0.92-0.94-1.74-1.64-2.44c-0.69-0.69-1.52-1.25-2.44-1.64 c-0.88-0.37-1.85-0.57-2.86-0.57H73.05c-1.01,0-1.98,0.2-2.86,0.57c-0.92,0.38-1.74,0.94-2.44,1.64c-0.69,0.69-1.25,1.52-1.64,2.44 c-0.37,0.88-0.57,1.85-0.57,2.86V44.9L65.54,44.9z M118.54,71.59H4.22v24.13h1.43c0.56-1.58,1.14-3.05,1.79-4.36 c0.7-1.4,1.49-2.64,2.45-3.71c1.14-1.28,2.48-2.27,4.09-2.93c1.61-0.65,3.49-0.98,5.75-0.93l79.69-0.1c2.57,0,4.77,0.12,6.69,0.49 c1.95,0.37,3.63,1,5.14,2c1.4,0.93,2.6,2.16,3.68,3.77c1.03,1.54,1.95,3.43,2.83,5.76h0.76V71.59L118.54,71.59z"/> </g>
                        </svg>
                        <span className='ml-2 text-sm'>{property.bedrooms}</span>
                      </div>
                      <div className='flex items-center'>
                        <svg id="Layer_1" data-name='area' className='h-5 w-5' 
                          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 82.26"><title>measurement</title><path d="M122.88,39.45V79.56a2.7,2.7,0,0,1-.76,1.87l-.08.08a2.67,2.67,0,0,1-1.86.75H2.7A2.74,2.74,0,0,1,.83,81.5l-.12-.13A2.72,2.72,0,0,1,0,79.56V39.45a2.74,2.74,0,0,1,.76-1.87l.13-.12a2.72,2.72,0,0,1,1.81-.71H120.18a2.68,2.68,0,0,1,1.87.76l.07.07a2.68,2.68,0,0,1,.76,1.87ZM107.07,77.2V58.13h5.06V77.2h5.69V41.81H5.06V77.2h5.69V66.69h5.06V77.2h5.64V58.13h5.06V77.2h5.65V66.69h5.05V77.2h5.65V58.13h5V77.2h5.65V66.69h5V77.2h5.65V58.13h5.06V77.2H75V66.69H80V77.2h5.64V58.13h5.06V77.2h5.65V66.69h5V77.2ZM122.31,24a3.2,3.2,0,1,1-6.4-.08l.32-20.74a3.21,3.21,0,0,1,6.41.07L122.31,24ZM6.65,24a3.21,3.21,0,1,1-6.41-.08L.56,3.17A3.21,3.21,0,1,1,7,3.24L6.65,24Zm94.12.27a3.21,3.21,0,0,1-4.2-4.85l3-2.61H23.28l3,2.61a3.21,3.21,0,0,1-4.2,4.85L12.57,16a3.2,3.2,0,0,1-.33-4.52l.3-.3,9.27-8.26a3.22,3.22,0,1,1,4.28,4.8l-3,2.64H99.77l-3-2.64a3.22,3.22,0,0,1,4.28-4.8l9.28,8.26.29.3a3.2,3.2,0,0,1-.33,4.52l-9.54,8.26Z"/>
                        </svg>
                        <span className='ml-2 text-sm'>{property.totalArea} m²</span>
                      </div>
                      <div className='flex items-center'>
                        <svg data-name='bathrooms' className='h-5 w-5' version="1.1" id="Layer_1" 
                          xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 127.9 95.25" enableBackground="new 0 0 127.9 95.25" xmlSpace="preserve"><g><path d="M98.97,22.32l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37l0.06,0.08 c0.31,0.45,0.93,0.55,1.37,0.24l7.6-5.32C99.17,23.38,99.28,22.76,98.97,22.32L98.97,22.32L98.97,22.32z M119.01,52.32l-4.12,19.22 c-1.02,4.78-3.33,8.43-6.61,10.93c-2.27,1.73-4.98,2.88-8.03,3.45l2.7,5.78c0.58,1.25,0.04,2.74-1.21,3.32 c-1.25,0.58-2.74,0.04-3.32-1.21l-3.5-7.48H35.1l-3.5,7.48c-0.58,1.25-2.07,1.79-3.32,1.21c-1.25-0.58-1.79-2.07-1.21-3.32 l2.55-5.46c-3.9-0.34-7.1-1.59-9.68-3.73c-3.01-2.5-5.07-6.13-6.3-10.86L8.57,52.32H4.61c-1.26,0-2.41-0.52-3.25-1.35l0-0.01 l-0.01,0.01C0.52,50.13,0,48.98,0,47.71v-4.19c0-1.27,0.52-2.42,1.35-3.26c0.06-0.06,0.13-0.13,0.2-0.18 c0.81-0.73,1.88-1.17,3.05-1.17h0.61c0.17-1.82,0.87-3.54,1.95-5.04c1.1-1.54,2.62-2.85,4.35-3.75c1.74-0.91,3.71-1.42,5.7-1.36 c1.75,0.06,3.49,0.54,5.1,1.56c0.7-1.02,1.57-1.93,2.57-2.68c1.96-1.47,4.41-2.35,7.06-2.35c2.2,0,4.26,0.6,6.01,1.64 c1.37,0.81,2.55,1.9,3.47,3.18c2.79,0.22,5.31,1.41,7.2,3.23c1.55,1.5,2.67,3.42,3.16,5.56h67.25V14.1 c-1.46-7.17-5.6-9.12-11.13-8.33c2.49,4.34,2.17,8.75-1.36,13.25c0.45,0.73,0.41,1.53-0.08,2.38l-1.1,1.27 c-0.44,0.45-0.99,0.49-1.7-0.08L86.76,5.52c-0.46-0.55-0.37-1.03,0.17-1.45c1.2-1.47,1.35-1.72,3.48-1.36 c4.74-3.08,9.25-3.63,13.5-1.19c10.67-4.38,19.75,1.12,20.98,12.32l0,0V39.2c0.63,0.23,1.19,0.6,1.65,1.06 c0.83,0.83,1.35,1.99,1.35,3.26v4.19c0,1.27-0.52,2.42-1.35,3.26c-0.83,0.83-1.99,1.35-3.25,1.35H119.01L119.01,52.32z M89.4,14.1 l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37l0.06,0.08c0.31,0.45,0.93,0.55,1.37,0.24 l7.6-5.32C89.61,15.16,89.71,14.54,89.4,14.1L89.4,14.1L89.4,14.1z M85.03,9.7l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24 l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37l0.06,0.08c0.31,0.45,0.93,0.55,1.37,0.24l7.6-5.32C85.23,10.76,85.34,10.14,85.03,9.7 L85.03,9.7L85.03,9.7z M93.76,18.35l-0.06-0.08c-0.31-0.45-0.93-0.55-1.37-0.24l-7.6,5.32c-0.45,0.31-0.55,0.93-0.24,1.37 l0.06,0.08c0.31,0.45,0.93,0.55,1.37,0.24l7.61-5.32C93.96,19.41,94.07,18.8,93.76,18.35L93.76,18.35L93.76,18.35z M10.29,38.91 h36.25c-0.32-0.74-0.79-1.4-1.37-1.95c-1.19-1.15-2.84-1.86-4.67-1.86c-0.28,0,0.02-0.01-0.17-0.01l-0.17,0.01 c-0.94,0.04-1.87-0.45-2.33-1.34c-0.54-1.03-1.38-1.9-2.41-2.51c-1-0.59-2.19-0.94-3.46-0.94c-1.54,0-2.95,0.5-4.06,1.33 c-1.11,0.84-1.94,2.01-2.3,3.35c-0.12,0.51-0.41,0.99-0.85,1.35c-1.07,0.87-2.65,0.71-3.52-0.36c-1.23-1.51-2.71-2.17-4.16-2.22 c-1.1-0.04-2.22,0.26-3.23,0.79c-1.02,0.54-1.92,1.32-2.59,2.24C10.78,37.45,10.44,38.17,10.29,38.91L10.29,38.91z M8.5,43.93 c-0.4,0.1-0.8,0.09-1.18,0h-2.3v3.36h117.86v-3.36H8.5L8.5,43.93z M13.74,52.32l4.74,18.07c0.96,3.68,2.48,6.45,4.66,8.25 c2.13,1.77,5,2.67,8.73,2.67h63.75c3.86,0,7.15-0.95,9.61-2.82c2.34-1.78,3.99-4.45,4.75-7.99l3.9-18.18H13.74L13.74,52.32z"/></g>
                        </svg>
                        <span className='ml-2 text-sm'>{property.bathrooms}</span>
                      </div>

                      <div className='flex items-center justify-start'>
                        <svg className="h-5 w-5 text-gray-600 fill-current" data-name="garage"
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          x="0px"
                          y="0px"
                          viewBox="0 0 122.88 103.26"
                          xmlSpace="preserve"
                         >
                          <style type="text/css">{".st0{fill-rule:evenodd;clip-rule:evenodd;}"}</style>
                          <g>
                            <path
                              className="st0"
                              d="M117.95,42.04v61.22h-14.31V93.8h-84.4v9.46l-14.31,0V42.04H0v-9.41h12.04l6.71-20.88 
                              C20.73,5.59,24.03,0,30.49,0h64.39c6.46,0,10.18,5.48,11.74,11.74l5.19,20.88h11.06v9.41H117.95L117.95,42.04L117.95,42.04z 
                              M40.01,74.91h42.27v9.97l-42.27,0V74.91L40.01,74.91L40.01,74.91z M9.72,51.69c10.77,0.34,17.36,4.85,19.05,14.26H9.72V51.69 
                              L9.72,51.69z M111.8,51.69c-10.77,0.34-17.36,4.85-19.05,14.26h19.05V51.69L111.8,51.69z M17.18,32.62h88.52l-3.79-17.51 
                              c-1.04-4.8-4.03-8.95-8.95-8.95H31.74c-4.92,0-7.44,4.26-8.95,8.95L17.18,32.62L17.18,32.62L17.18,32.62z"
                            />
                          </g>
                        </svg>
                        <span className='ml-2 text-sm'>{property.garage}</span>
                      </div>

                    </div>

                    <p className="text-gray-600 mb-2">{property.location}</p>
                    <p className="text-primary font-bold mb-4">{formatCurrency(property.price)}</p>
                    <p className='text-sm'>Condominío</p>
                    <p className='text-xs font-bold mt-1 mb-4 min-h-[20px]'>R${property.condominio}</p>
                  </div>
                </Link>
                <div className='w-full flex justify-center gap-5 mb-5'>
                  <div className="">
                    <Link href={`/propriedades/${property.propertyId}`} >
                      <Button className="px-8">Ver Detalhes</Button>
                    </Link>

                    </div>
                    <Button className="px-5" onClick={handleWhatsClick}>WhatsApp</Button>
                </div>
              </Card>
              )
            })
          ) : (
            <p className="col-span-full text-center">Nenhum imóvel encontrado</p>
          )}
        </div>
      </div>
    </section>
  );
}
