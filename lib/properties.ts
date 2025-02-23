import axios from 'axios';
import { IpropertyType } from '@/types/propertyType';
import { mockProperties } from '@/mockData';

// this is helpers for the frontend 
export async function getProperty(id: string){
  if (process.env.NODE_ENV === 'production') {
    // Use mock data during build
    return mockProperties.find(p => p.propertyId === id) || null;
  }

  try {
    const res = await axios.get(`http://localhost:3000/api/propriedades/${id}`)
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
    return mockProperties
  }
}

export async function getAllProperties(): Promise<IpropertyType[]>{
  if (process.env.NODE_ENV === 'production') {
    // Use mock data during build
    return mockProperties || null;
  }

  try {
    const res = await axios.get('http://localhost:3000/api/propriedades');
    // console.log('this is res for getAll properties:', res.data);
  
    return res.data;
  } catch (error) {
    console.log(error);
    // throw new Error('Failed to fetch properties');
    return mockProperties;
  }
}

