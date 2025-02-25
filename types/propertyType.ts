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
  features?: { name: string }[];
  images?: { id: string; url: string }[];
  description?: string;
  cover?: string;
  createdAt?: Date;
  updatedAt?: Date;
  propertyType: 'Casa' | 'Apartamento' | 'Galpão' | 'Sala' | 'Loft' | 'Terreno';
  listingType: 'venda' | 'aluguel';
  condominion?: number;
  suites?: number;
}

// for single property
export interface PropertyProps {
  property: IpropertyType;
}

// for an array of properties
export interface PropertiesProps {
  properties: IpropertyType[]; // Expecting an array of properties
}

export interface PropertyFeatures {
  features?: { name: string }[];
}

export interface PropertyGalleryProps {
  images?: { id: string; url: string }[];
}

// props for the form
export interface PropertyFormProp {
  existingProperty?: IpropertyType;
}

export interface PropertyDetailsProps extends PropertyProps {
  features?: { name: string; }[];
}
