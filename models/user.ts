import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the User document
export interface IUser extends Document {
  name?: string;
  email: string;
  username: string;
  password: string;
}

// Create a schema for the User model
const UserSchema: Schema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true, // Mandatory
      unique: true, // Must be unique
    },
    username: {
      type: String,
      required: true, // Mandatory
      unique: true, // Must be unique
    },
    password: {
      type: String,
      required: true, // Mandatory
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
