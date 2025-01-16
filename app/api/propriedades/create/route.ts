import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/types/formTypes";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";

export async function POST(req: NextRequest) {
  await mongooseConnect();
  try {
    const propertyData: FormData = await req.json();

    const {
      title,
      propertyType,
      location,
      price,
      description,
      bedrooms,
      bathrooms,
      area,
      garage,
      features,
      images,
      totalArea,
      privateArea,
    } = propertyData;

    if (!title || !location || !price || !propertyType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newProperty = await Property.create({
      title,
      location,
      price,
      bedrooms,
      bathrooms,
      garage,
      area,
      totalArea,
      privateArea,
      propertyType,
      features,
      images,
      description,
    });

    return NextResponse.json({
      message: "Success",
      newProperty,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
