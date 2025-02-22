// for the database 
export interface IpropertyType {
  _id: string;
  title: string;
  propertyId: string;
  location: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  garage?: number;
  totalArea?: number;
  privateArea?: number;
  propertyType: "Casa" | "Apartamento" | "Galpão" | "Sala" | "Loft" | "Terreno";
  features?: {name: string, _id: string}[];
  images?: { id: string; url: string }[];
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  listingType: "Venda" | "Aluguel"; 
  condominion?: number;
}

export interface PropertyGalleryProps {
  images?: { id: string; url: string }[];
}

export interface PropertyProps {
  property: IpropertyType;
}

export interface PropertyFeatures {
  features: {name: string, _id: string}[];
}

export interface PropertiesProps {
  properties: IpropertyType[]; // Expecting an array of properties
}
