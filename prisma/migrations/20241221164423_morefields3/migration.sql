/*
  Warnings:

  - The `price` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bedrooms` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `bathrooms` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `garage` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `totalArea` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `privateArea` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER,
DROP COLUMN "bedrooms",
ADD COLUMN     "bedrooms" INTEGER,
DROP COLUMN "bathrooms",
ADD COLUMN     "bathrooms" INTEGER,
DROP COLUMN "garage",
ADD COLUMN     "garage" INTEGER,
DROP COLUMN "totalArea",
ADD COLUMN     "totalArea" INTEGER,
DROP COLUMN "privateArea",
ADD COLUMN     "privateArea" INTEGER;
