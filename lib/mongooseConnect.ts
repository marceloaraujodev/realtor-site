import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// TypeScript function for connecting to MongoDB
export function mongooseConnect(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState === 1) {
    // The connection is already established, return the mongoose instance
    return Promise.resolve(mongoose);
  } else {
    const uri = process.env.MONGODB_URI as string;
    if (!uri) {
      throw new Error('MongoDB URI is not defined in the environment variables.');
    }
    // Connect to the database and return the mongoose instance
    return mongoose.connect(uri).then(() => mongoose);
  }
}
