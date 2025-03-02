'use client';

import { SessionProvider } from "next-auth/react";
import { PropertyProvider } from "@/app/context/PropertyContext";

export default function SessionProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <SessionProvider>
    <PropertyProvider>
      {children}
    </PropertyProvider>
  </SessionProvider>

  )
}