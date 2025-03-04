import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/property";
import { mongooseConnect } from "@/lib/mongooseConnect";

// gets a property by propertyId to populate the editing property form
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await mongooseConnect();

  // new in nextjs 15
  const { id } = await context.params;

  try {
    const property = await Property.findOne({propertyId: id})
  
    if(!property){
      return NextResponse.json({success: false, message: 'Property not found'}, {status: 404})
    }
    // console.log('PROPERTY IN THE BACKEND', property);
  
    return NextResponse.json(property)
    
  } catch (error) {
    console.log(error);
    throw new Error('Could not find property')
  }
}
export const dynamic = 'force-dynamic'; // Prevent static rendering