import { NextResponse, NextRequest } from "next/server";
import Property from '../../../models/property';
import { mongooseConnect } from "@/lib/mongooseConnect";

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();
    const properties = await Property.find();
    // console.log(properties);
    return NextResponse.json(properties);
  } catch (error) {
    const err = error as Error;  // Type assertion
      console.error(err.message); 
    return NextResponse.json({ success: false, message: 'Server error', err: err.message }, { status: 500 });
  }
}
