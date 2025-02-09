import mongoose, { Schema, Document, Model } from 'mongoose';

// Define a TypeScript interface for the property model
export interface IProperty extends Document {
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

// Define the Mongoose schema
const PropertySchema: Schema<IProperty> = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    garage: {
      type: Number,
    },
    area: {
      type: Number,
    },
    totalArea: {
      type: Number,
    },
    privateArea: {
      type: Number,
    },
    propertyType: {
      type: String,
      enum: ["Casa", "Apartamento", "Galpão", "Sala", "Loft", "Terreno"],
      required: true,
    },
    features: {
      type: [String],
    },
    images: {
      type: [String],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Export the model with type safety
const Property: Model<IProperty> =
  mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);

export default Property;
