import { NextResponse, NextRequest } from "next/server";
import Property from '../../../../models/property';
import { mongooseConnect } from "@/lib/mongooseConnect";

export async function GET(req: NextRequest){
  await mongooseConnect();

  const properties = await Property.find();

  return NextResponse.json(properties) // returns the array of properties
}