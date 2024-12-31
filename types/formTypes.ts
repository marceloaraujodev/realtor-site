import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { PropertyType } from './property';

export interface FormData {
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: PropertyType;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  area: string;
  totalArea: string;
  privateArea: string;
  features?: { value: string }[];
  images: { url: string }[];
}

export interface PropertyBasicInfoProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export interface PropertyDetailsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export interface PropertyFeaturesProps {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
}

export interface PropertyImagesProps {
  register: UseFormRegister<FormData>;
  control: Control<FormData>;
}

