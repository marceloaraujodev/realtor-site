import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/property";
import { mongooseConnect } from "@/lib/mongooseConnect";

// gets a property by propertyId to populate the editing property form
export async function GET(req: NextRequest, { params }: { params: { id: string } }){
  await mongooseConnect();
  console.log('params on api', params);
  const { id } = params;
  console.log('id', id);
  try {
    const property = await Property.findOne({propertyId: id})
  
    if(!property){
      return NextResponse.json({success: false, message: 'Property not found'}, {status: 404})
    }
    // console.log(property);
  
    return NextResponse.json({
    success: true,
    data:property, 
  })
    
  } catch (error) {
    console.log(error);
    throw new Error('Could not find property')
  }
}