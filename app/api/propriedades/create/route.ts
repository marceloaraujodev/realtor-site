import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { PropertyData, PropertyType } from '@/types/property';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const propertyData: PropertyData = await req.json();
    console.log(propertyData)
    const validPropertyTypes: PropertyType[] = ['Casa', 'Apartamento', 'Galpão', 'Sala', 'Loft', 'Terreno'];
  
  
    // Ensure the propertyType is valid (enum value)
    const propertyType = validPropertyTypes.includes(propertyData.propertyType)
    ? propertyData.propertyType
    : 'Apartamento'; // Or throw an error or handle appropriately
  
    const newProperty = await prisma.property.create({
      data: {
        title: propertyData.title,
        propertyType: propertyType,
        location: propertyData.location,
        price: propertyData.price,
        description: propertyData.description,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        area: propertyData.area,
        totalArea: propertyData.totalArea,
        garage: propertyData.garage,
        features: {
          create: propertyData.features.map((feature) => ({ name: feature.name })),
        },
        images: {
          create: propertyData.images.map((image) => ({ url: image.url })),
        }
      }
    })
  
    return NextResponse.json({
      message: 'success', 
      newProperty
    }, {status: 201})
    
  } catch (error: unknown) {
     // Type the error as an instance of Error (this gives us access to `message`)
     if (error instanceof Error) {
      return NextResponse.json({
        message: 'Internal server error',
        error: error.stack,
        errorMessage: error.message,
      }, {status: 500});
    }

    // Handle case where error is not an instance of Error (if necessary)
    return NextResponse.json({
      message: 'Internal server error',
      error: 'Unknown error occurred',
    }, {status: 500});
  }
}