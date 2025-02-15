
export interface IPropertyModel {
  title: string;
  propertyId: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  garage?: number;
  area?: number;
  totalArea?: number;
  privateArea?: number;
  propertyType: "Casa" | "Apartamento" | "Galpão" | "Sala" | "Loft" | "Terreno";
  features?: string[];
  images?: { id: string; url: string }[]; // frontend only  backend is a rray of strings
  cover?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}