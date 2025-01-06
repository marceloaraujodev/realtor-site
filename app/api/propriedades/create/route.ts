import { NextResponse } from "next/server";
import { PrismaClient, PropertyType } from '@prisma/client';
import { FormData } from "@/types/formTypes";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  // try {
    const propertyData: FormData = await req.json();
    console.log(propertyData);
    // console.log(propertyData.features)
 
    const propertyType = propertyData.propertyType; // Default to 'Apartamento' if no value is provided


    // // Upload images to storage and get their URLs
    // const uploadedImages = await Promise.all(
    //   propertyData.images.map(async (image) => {
    //     const url = await uploadFileToStorage(image.file); // Implement this utility to upload files and return their URLs
    //     return { url };
    //   })
    // );

    // Start a transaction
    // const result = await prisma.$transaction(async (prisma) => {
    //   // Create the property
    //   const newProperty = await prisma.property.create({
    //     data: {
    //       title: propertyData.title,
    //       location: propertyData.location,
    //       price: +propertyData.price,
    //       description: propertyData.description,
    //       propertyType: propertyType,
    //       bedrooms: +propertyData.bedrooms,
    //       bathrooms: +propertyData.bathrooms,
    //       garage: +propertyData.garage,
    //       area: +propertyData.area,
    //       totalArea: +propertyData.totalArea,
    //       privateArea: +propertyData.privateArea,
    //       images: {
    //         create: [], // use uploadedImages here
    //       }
    //     }
    //   });

    //   // console.log('this is propertyData:', propertyData);
    //   // console.log('this is propertyData.features:', propertyData.features)

    //   const features = propertyData.features?.map((feature) => {
    //     return {
    //       name: feature.name, 
    //       propertyId: newProperty.id, 
    //     };
    //   }) || [];
    //   // console.log('this is features inside the map -----', features);

    //   // Create the features in the database
    //   if (features.length > 0) {
    //     await prisma.feature.createMany({
    //       data: features,
    //     });
    //   }
    //   return newProperty; // Return the newly created property
    // });

    return NextResponse.json({
      message: 'success',
      // newProperty: result,
    }, { status: 201 });

  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     return NextResponse.json({
  //       message: 'Internal server error',
  //       error: error.stack,
  //       errorMessage: error.message,
  //     }, { status: 500 });
  //   }

  //   return NextResponse.json({
  //     message: 'Internal server error',
  //     error: 'Unknown error occurred',
  //   }, { status: 500 });
  // }
}