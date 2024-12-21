-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Casa', 'Apartamento', 'Galpão', 'Sala', 'Loft', 'Terreno');

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "location" TEXT,
    "price" TEXT,
    "image" TEXT,
    "bedrooms" TEXT,
    "bathrooms" TEXT,
    "garage" TEXT,
    "totalArea" TEXT,
    "privateArea" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
