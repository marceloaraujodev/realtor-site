import axios from 'axios';
import { IpropertyType } from '@/types/propertyType';
import { siteUrl } from '@/config';

// // this is helpers for the frontend 
export async function getProperty(id: string){
  console.log('ENTERING GET PROPERTY');
  try {
    const res = await axios.get(`${siteUrl}/api/propriedades/${id}`)
    const property = res.data;

    // property.images.map((image: string) => console.log('image:', {id: image.split('/').pop(), url: image}))
    return {
      ...property,
      images: property.images.map((image: {id: string, url: string}) => ({
        id: image.id, // the last part of the string is the id of the images
        url: image.url // this is the full path of the url
      }))
    }
    
  } catch (error) {
    console.log(error);
    throw new Error('could not fetch property');
  }
}

export async function getAllProperties(): Promise<IpropertyType[]>{
  console.log('ENTERING GET ALL PROPERTIES')
  try {
    const res = await axios.get(`${siteUrl}/api/propriedades`);
  
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch properties');

  }
}

// // mock data below for building -
// export async function getProperty(id: string): Promise<IpropertyType> {
//   console.log('ENTERING GET PROPERTY');

//   // Check if we're in the build process
//   if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build") {
//     console.log("Using mock data for property");
//     return {
//       _id: "mock-id",
//       title: "Mock Property",
//       propertyId: id,
//       location: "Mock Location",
//       price: 100000,
//       bedrooms: 2,
//       suites: 1,
//       bathrooms: 2,
//       garage: 1,
//       totalArea: 200,
//       privateArea: 150,
//       propertyType: "Casa", // Ensure this matches the allowed values
//       images: [
//         { id: "mock-img-1", url: "/mock-image-1.jpg" },
//         { id: "mock-img-2", url: "/mock-image-2.jpg" },
//       ],
//       cover: "mock-img-1",
//       description: "This is a mock property.",
//       listingType: "venda",
//       features: [{ name: "piscina" }, { name: "sauna" }],
//       condominio: 500,
//     };
//   }

//   try {
//     const res = await axios.get(`${siteUrl}/api/propriedades/${id}`);
//     const property = res.data;

//     // Validate propertyType
//     const validPropertyTypes = ["Casa", "Apartamento", "Galpão", "Sala", "Loft", "Terreno"];
//     if (!validPropertyTypes.includes(property.propertyType)) {
//       throw new Error(`Invalid propertyType: ${property.propertyType}`);
//     }

//     return property;
//   } catch (error) {
//     console.error("Error fetching property:", error);
//     throw new Error(`Failed to fetch property`);
//   }
// }

// export async function getAllProperties(): Promise<IpropertyType[]> {
//   console.log('ENTERING GET ALL PROPERTIES');

//   // Check if we're in the build process
//   if (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE === "phase-production-build") {
//     console.log("Using mock data for all properties");
//     return [
//       {
//         _id: "mock-id-1",
//         title: "Mock Property 1",
//         propertyId: "mock-property-id-1",
//         location: "Mock Location 1",
//         price: 100000,
//         bedrooms: 2,
//         suites: 1,
//         bathrooms: 2,
//         garage: 1,
//         totalArea: 200,
//         privateArea: 150,
//         propertyType: "Casa", // Ensure this matches the allowed values
//         images: [
//           { id: "mock-img-1", url: "/mock-image-1.jpg" },
//           { id: "mock-img-2", url: "/mock-image-2.jpg" },
//         ],
//         cover: "mock-img-1",
//         description: "This is a mock property.",
//         listingType: "venda",
//         features: [{ name: "piscina" }, { name: "sauna" }],
//         condominio: 500,
//       },
//       {
//         _id: "mock-id-2",
//         title: "Mock Property 2",
//         propertyId: "mock-property-id-2",
//         location: "Mock Location 2",
//         price: 200000,
//         bedrooms: 3,
//         suites: 2,
//         bathrooms: 3,
//         garage: 2,
//         totalArea: 300,
//         privateArea: 250,
//         propertyType: "Apartamento", // Ensure this matches the allowed values
//         images: [
//           { id: "mock-img-3", url: "/mock-image-3.jpg" },
//           { id: "mock-img-4", url: "/mock-image-4.jpg" },
//         ],
//         cover: "mock-img-3",
//         description: "This is another mock property.",
//         listingType: "aluguel",
//         features: [{ name: "academia" }, { name: "churrasqueira" }],
//         condominio: 800,
//       },
//     ];
//   }

//   try {
//     const res = await axios.get(`${siteUrl}/api/propriedades`);
//     const properties = res.data;

//     // Validate propertyType for each property
//     const validPropertyTypes = ["Casa", "Apartamento", "Galpão", "Sala", "Loft", "Terreno"];
//     const validatedProperties = properties.map((property: any) => {
//       if (!validPropertyTypes.includes(property.propertyType)) {
//         throw new Error(`Invalid propertyType: ${property.propertyType}`);
//       }
//       return {
//         ...property,
//         propertyType: property.propertyType as "Casa" | "Apartamento" | "Galpão" | "Sala" | "Loft" | "Terreno",
//       };
//     });

//     return validatedProperties;
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     throw new Error('Failed to fetch properties');
//   }
// }