import { mongooseConnect } from "@/lib/mongooseConnect";
import ErrorLog from "@/models/errorLogger";

export async function logError(error: Error, route?: string) {
  try {
    await mongooseConnect(); // Ensure the database is connected

    await ErrorLog.create({
      message: error.message,
      stack: error.stack,
      route: route || "Unknown Route",
    });

    console.error("Error logged to database:", error.message);
  } catch (dbError) {
    console.error("Failed to log error to database:", dbError);
  }
}