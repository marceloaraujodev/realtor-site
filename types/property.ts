export interface Feature {
  name: string;
}

export interface Image {
  url: string;
}

export interface PropertyData {
  title: string;
  propertyType: PropertyType; // 'PropertyType' is a valid enum, so it's a better fit than string
  location: string;
  price: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  totalArea: number;
  privateArea: number;
  garage: number;
  features: Feature[];
  images: Image[];
}

export type PropertyType = 'Casa' | 'Apartamento' | 'Galpão' | 'Sala' | 'Loft' | 'Terreno';