import { UseFormRegister, FieldErrors, Control, UseFormSetValue } from "react-hook-form";
import { IpropertyType } from "./propertyType";

export interface FormData {
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: IpropertyType["propertyType"];
  bedrooms: string;
  suites: string;
  bathrooms: string;
  garage: string;
  totalArea: string;
  privateArea: string;
  features?: { name: string }[];
  images: { imgId: string, file: File }[];
  cover: number;
}

export interface PropertyBasicInfoProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  setValue: UseFormSetValue<FormData>;
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
