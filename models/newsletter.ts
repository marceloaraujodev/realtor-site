import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the User document
export interface INewsletter extends Document {
  email: string;
}

// Create a schema for the User model
const NewsletterSchema: Schema = new Schema<INewsletter>(
  {
    email: {
      type: String,
      required: true, // Mandatory
      unique: true, // Must be unique
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'], // Email regex
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the Newsletter model
const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;
