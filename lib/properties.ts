import axios from 'axios';
import { IpropertyType } from '@/types/propertyType';

export async function getProperty(id: string){
  const res = await axios.get(`http://localhost:3000/api/propriedades/${id}`)
  const property = res.data.data;
  // console.log('THIS IS RES.DATA', res.data.data.images)  
  // console.log('this is resdata property:', property) 
  // property.images.map((image: string) => console.log('image:', {id: image.split('/').pop(), url: image}))
  return {
    ...property,
    images: property.images.map((image: string) => ({
      id: image.split('/').pop() || '', // the last part of the string is the id of the images
      url: image // this is the full path of the url
    }))
  }
}

export async function getAllProperties(): Promise<IpropertyType[]>{
  try {
    const res = await axios.get('http://localhost:3000/api/propriedades/all');
    // console.log('this is res for getAll properties:', res.data);
  
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch properties');
  }
}

