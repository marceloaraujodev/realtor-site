import axios from 'axios';
import { IpropertyType } from '@/types/propertyType';

export async function getProperty(id: string): Promise<IpropertyType>{
  const res = await axios.get(`http://localhost:3000/api/propriedades/${id}`)
  const property = res.data;
  // console.log('this is resdata property:', property)
  return property
}

export async function getAllProperties(): Promise<IpropertyType[]>{
  try {
    const res = await axios.get('http://localhost:3000/api/propriedades/all');
    console.log('this is res for getAll properties:', res.data);
  
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch properties');
  }
}

