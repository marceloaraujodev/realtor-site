import axios from 'axios';

export interface Property {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  price: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  privateArea?: number;
  garage?: number;
  features?: string[];
  images: string[];
}

const properties: Property[] = [
  {
    id: '1',
    title: 'Apartamento de Luxo',
    propertyType: 'Apartamento',
    location: 'Centro, Balneário Camboriú',
    price: 1200000,
    description: `Luxuoso apartamento com vista para o mar, localizado no coração de Balneário Camboriú.

    Este imóvel excepcional oferece acabamento de alto padrão e uma vista deslumbrante para o mar. Ambientes amplos e integrados, perfeitos para família e entretenimento.

    O apartamento conta com varanda gourmet, área de serviço e depósito privativo.`,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    garage: 2,
    features: [
      'Vista para o mar',
      'Varanda gourmet',
      'Ar condicionado',
      'Depósito privativo',
      'Academia',
      'Piscina',
      'Área de lazer completa',
      'Segurança 24h',
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ],
  },
  {
    id: '2',
    title: 'Cobertura Duplex',
    propertyType: 'Apartamento',
    location: 'Barra Sul, Balneário Camboriú',
    price: 2500000,
    description: `Magnífica cobertura duplex com vista panorâmica para o mar e a cidade.

    Primeiro piso com living amplo, cozinha gourmet integrada, 3 suítes. Segundo piso com área de lazer privativa, piscina e espaço gourmet.

    Acabamento premium em todos os ambientes.`,
    bedrooms: 3,
    bathrooms: 4,
    area: 280,
    garage: 3,
    features: [
      'Vista panorâmica',
      'Piscina privativa',
      'Espaço gourmet',
      'Home theater',
      'Closet',
      'Ar condicionado',
      'Automação',
      'Gerador próprio',
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ],
  },
  {
    id: '3',
    title: 'Casa com Vista para o Mar',
    propertyType: 'Casa',
    location: 'Pioneiros, Balneário Camboriú',
    price: 3100000,
    description: `Exclusiva residência com vista privilegiada para o mar em localização nobre.

    Casa com projeto arquitetônico moderno, integração total com a natureza e acabamento de altíssimo padrão. Ambientes amplos e iluminados.

    Área externa com piscina, jardim e espaço gourmet completo.`,
    bedrooms: 4,
    bathrooms: 5,
    area: 450,
    garage: 4,
    features: [
      'Vista para o mar',
      'Piscina',
      'Jardim',
      'Espaço gourmet',
      'Energia solar',
      'Sistema de segurança',
      'Home office',
      'Área de lazer',
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    ],
  },
];

export function getProperty(id: string): Property | undefined {
  // const res = await axios.get('/api/property/[id])
  // const property = res.data;
  return properties.find((property) => property.id === id);
}

export function getAllPropertyIds(): string[] {
  // const res = await axios.get('/api/property)
  // const properties = res.data;
  return properties.map((property) => property.id);
}
