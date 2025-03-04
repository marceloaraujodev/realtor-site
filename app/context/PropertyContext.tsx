"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { IpropertyType } from "@/types/propertyType";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

interface PropertyContextType {
  propertyList: IpropertyType[];
  fetchProperties: () => Promise<void>;
  addProperty: (newProperty: IpropertyType) => void;
  setPropertyList: React.Dispatch<React.SetStateAction<IpropertyType[]>>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [propertyList, setPropertyList] = useState<IpropertyType[]>([]);

  // Fetch properties from the API
  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${siteUrl}/api/propriedades`);

      setPropertyList(res.data);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    }
  };
  
  // Function to add a new property
  const addProperty = (newProperty: IpropertyType) => {
    setPropertyList((prev) => [...prev, newProperty]);
  };
  
  // Load properties when the app starts
  useEffect(() => {
    fetchProperties();
  }, []);


  return (
    <PropertyContext.Provider value={{propertyList, fetchProperties, addProperty, setPropertyList }}>
      {children}
    </PropertyContext.Provider>
  );
}

// Custom hook to use the context
export function useProperty() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
}
