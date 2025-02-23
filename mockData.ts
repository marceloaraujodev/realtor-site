// mockData.ts
import { IpropertyType } from "./types/propertyType";

export const mockProperties: IpropertyType[] = [
  {
    _id: "1",
    title: "Modern Downtown Apartment",
    propertyId: "APT-001",
    location: "Downtown",
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    garage: 1,
    totalArea: 120,
    privateArea: 90,
    propertyType: "Apartamento",
    listingType: "venda",
    condominion: 500,
    features: [
      { name: "Swimming Pool", _id: "f1" },
      { name: "Gym", _id: "f2" }
    ],
    images: [
      { id: "img1", url: "/mock-apartment-1.jpg" },
      { id: "img2", url: "/mock-apartment-2.jpg" }
    ],
    description: "Luxurious downtown apartment with premium finishes"
  },
  {
    _id: "2",
    title: "Suburban Family Home",
    propertyId: "HOME-002",
    location: "Suburbs",
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    garage: 2,
    totalArea: 300,
    privateArea: 250,
    propertyType: "Casa",
    listingType: "venda",
    features: [
      { name: "Backyard", _id: "f3" },
      { name: "Fireplace", _id: "f4" }
    ],
    images: [
      { id: "img3", url: "/mock-house-1.jpg" }
    ]
  }
];

