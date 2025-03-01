import axios from 'axios';
import { IpropertyType } from '@/types/propertyType';
import { siteUrl } from '@/config';

// this is helpers for the frontend 
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

