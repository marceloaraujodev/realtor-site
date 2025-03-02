
import { IpropertyType } from '@/types/propertyType';
import { siteUrl } from '@/config';

// // this is helpers for the frontend 
export async function getProperty(id: string) {
  console.log('ENTERING GET PROPERTY');
  
  try {
    const res = await fetch(`${siteUrl}/api/propriedades/${id}`, {
      method: "GET",
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch property: ${res.statusText}`);
    }

    const property = await res.json();

    return {
      ...property,
      images: property.images.map((image: { id: string; url: string }) => ({
        id: image.id, // Assuming `id` is present in the API response
        url: image.url // Full image URL
      })),
    };

  } catch (error) {
    console.error("Error fetching property:", error);
    throw new Error('Could not fetch property');
  }
}

export async function getAllProperties(): Promise<IpropertyType[]> {
  console.log('ENTERING GET ALL PROPERTIES');
  try {
    const res = await fetch(`${siteUrl}/api/propriedades`, {
      method: "GET",
      cache: "no-store", // Always get fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch properties");
    }

    return await res.json(); // Works just like `axios.get().data`
  } catch (error) {
    console.error("Error fetching properties", error);
    throw new Error("Failed to fetch properties");
  }
}

