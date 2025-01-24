import { NextResponse } from "next/server";
import mongoose from "mongoose";

type AppError = {
  message: string;
  status?: number;
};

export function errorResponse(error: AppError, status: number, message: string) {
  if (status === 500) {
    console.error("Internal Server Error:", error.message);
  }
  if (status === 404) {
    console.error("Not Found Error:", error.message);
  }
  if (status === 400) {
    console.error("Bad Request Error:", error.message);
  }

  return NextResponse.json({ error, message, status });
}

export function handleError(
  error: any,
  defaultStatus: number = 500,
  defaultMessage: string = "An unexpected error occurred"
) {
  if (error instanceof mongoose.Error.ValidationError) {
    // Handle validation errors (e.g., required fields, incorrect data types)
    return errorResponse(
      { message: "Validation error", status: 400 },
      400,
      "Invalid data provided"
    );
  } else if (error instanceof mongoose.Error.CastError) {
    // Handle invalid ObjectId or casting errors
    return errorResponse(
      { message: "Invalid ID format", status: 400 },
      400,
      "Invalid ID or data format"
    );
  } else if (error instanceof mongoose.mongo.MongoServerError) {
    // Handle MongoDB server errors (e.g., duplicate key errors)
    if (error.code === 11000) {
      return errorResponse(
        { message: "Duplicate key error", status: 400 },
        400,
        "Duplicate value for unique field"
      );
    }
    return errorResponse(
      { message: "Database server error", status: 500 },
      500,
      "Database operation failed"
    );
  } else {
    // Handle other errors (fallback)
    return errorResponse(
      { message: error.message || defaultMessage, status: defaultStatus },
      defaultStatus,
      defaultMessage
    );
  }
}
