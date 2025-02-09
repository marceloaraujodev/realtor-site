import { NextResponse } from "next/server";
import Property from '../../../../models/property';

export async function GET(req){

  const properties = await Property.find();

  return NextResponse.json({
    message: 'success',
    data: properties,
  })
}