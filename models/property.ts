import mongoose, { Schema, Document, Model } from 'mongoose';
import { IPropertyModel } from './interfaces';
// Define a TypeScript interface for the property model

// Define the Mongoose schema
const PropertySchema: Schema<IPropertyModel> = new Schema<IPropertyModel>(
  {
    title: {
      type: String,
      required: true,
    },
    propertyId: {
      type: String,
      required: true,
      unique: true,
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
    suites: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    garage: {
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
    features: [ String ],
    images: [ String ],
    cover: { type: String }, // Store the `id` of the cover image
    description: {
      type: String,
    },
    listingType: {
      type: String,
      enum: ["venda", "aluguel"],
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

// Export the model with type safety
const Property: Model<IPropertyModel> =
  mongoose.models.Property || mongoose.model<IPropertyModel>('Property', PropertySchema);

export default Property;
