export interface IpropertyType {
  _id: string;
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
  images?: string[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}