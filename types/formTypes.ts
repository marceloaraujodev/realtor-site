import { UseFormRegister, FieldErrors, Control, UseFormSetValue } from "react-hook-form";

// for the form validation
export interface FormData {
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: "Casa" | "Apartamento" | "Galpão" | "Sala" | "Loft" | "Terreno";
  listingType: "venda" | "aluguel"; 
  bedrooms: string;
  suites?: number;
  bathrooms: string;
  garage: string;
  totalArea: string;
  privateArea: string;
  features?: { name: string }[];
  images: { imgId: string; file?: File; url?: string }[];
  cover: string;
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
