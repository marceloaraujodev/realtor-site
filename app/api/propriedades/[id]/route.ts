import { NextRequest, NextResponse } from "next/server";
import Property from "@/models/property";
import { mongooseConnect } from "@/lib/mongooseConnect";

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
  await mongooseConnect();
  // console.log(params);
  const { id } = params;
  const property = await Property.findById({_id: id})
  if(!property){
    return NextResponse.json({success: false, message: 'Property not found'}, {status: 404})
  }
  // console.log(property);

return NextResponse.json({
  success: true,
  data:property, 
})
}