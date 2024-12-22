import { NextResponse } from "next/server";
import { Prisma } from '@prisma/client';

type AppError = {
  message: string;
  status?: number;
}

export function errorResponse(error: AppError, status: number, message: string){

  if(status === 500){
    console.error("Internal Server Error", error);
  }
  if(status === 404){
    console.error("Not Found Error", error);
  }
  if(status === 400){
    console.error("Bad Request Error", error);
  }

  return NextResponse.json({ error, message, status});
}

export function handleError(error: any, defaultStatus: number = 500, defaultMessage: string = 'An unexpected error occurred') {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return errorResponse({ message: 'Database error', status: 500 }, 500, 'Database operation failed');
  } else {
    return errorResponse(error, defaultStatus, defaultMessage);
  }
}