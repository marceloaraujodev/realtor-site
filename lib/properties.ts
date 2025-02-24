import axios from 'axios';
import { IpropertyType } from '@/types/propertyType';
import { mockProperties } from '@/mockData';
import { siteUrl } from '@/config';

// this is helpers for the frontend 
export async function getProperty(id: string){

  try {
    const res = await axios.get(`${siteUrl}/api/propriedades/${id}`)
    const property = res.data.data;

    // property.images.map((image: string) => console.log('image:', {id: image.split('/').pop(), url: image}))
    return {
      ...property,
      images: property.images.map((image: string) => ({
        id: image.split('/').pop() || '', // the last part of the string is the id of the images
        url: image // this is the full path of the url
      }))
    }
    
  } catch (error) {
    console.log(error);
    throw new Error('could not fetch property');
  }
}

export async function getAllProperties(): Promise<IpropertyType[]>{

  try {
    const res = await axios.get(`${siteUrl}/api/propriedades`);
    // console.log('this is res for getAll properties:', res.data);
  
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch properties');
    // return mockProperties;
  }
}

