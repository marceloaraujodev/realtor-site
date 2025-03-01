import { NextResponse, NextRequest } from "next/server";
import Property from '../../../models/property';
import { mongooseConnect } from "@/lib/mongooseConnect";

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();
    // const properties = await Property.find();
    // return NextResponse.json(properties);

    const properties = [
      {
        _id: "67bd4004c4fda1d414aea5d0",
        title: "test",
        propertyId: "d8e1b8b8-2ae7-42ab-8555-995ef6a51a42",
        location: "Centro, Balneário Camboriú",
        price: 3274,
        bedrooms: 1,
        suites: 1,
        bathrooms: 1,
        garage: 2,
        totalArea: 111,
        privateArea: 1111,
        propertyType: "Casa", // Ensure this matches the allowed values
        images: [
          {
            id: "5b86bf1a-55a8-45f1-89cb-c0830616a64a",
            url: "propriedades/d8e1b8b8-2ae7-42ab-8555-995ef6a51a42/5b86bf1a-55a8-45f1-89cb-c0830616a64a",
          },
          {
            id: "4c7c80f2-4537-4cb1-b4e3-80629ea8e55f",
            url: "propriedades/d8e1b8b8-2ae7-42ab-8555-995ef6a51a42/4c7c80f2-4537-4cb1-b4e3-80629ea8e55f",
          },
        ],
        cover: "5b86bf1a-55a8-45f1-89cb-c0830616a64a",
        description: "ttt",
        listingType: "venda",
        features: [
          { name: "piscina" },
          { name: "sauna" },
        ],
        condominio: 1000,
      },
    ];
    return NextResponse.json(properties);
  } catch (error) {
    const err = error as Error;  // Type assertion
      console.error(err.message); 
    return NextResponse.json({ success: false, message: 'Server error', err: err.message }, { status: 500 });
  }
}
