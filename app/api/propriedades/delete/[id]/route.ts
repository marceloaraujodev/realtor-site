import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";

export async function DELETE(req: NextRequest, { params }:{params: { id: string}}){
  try {
    await mongooseConnect();
    console.log(params)
    const { id } = params;
    console.log(id);
  
    const numericId: number = parseInt(id);
  
    if(isNaN(numericId)){
      return NextResponse.json({error: 'Invalid id format'}, {status: 400})
    }
  
    await Property.findByIdAndDelete({_id: numericId})
  
    return NextResponse.json({message: 'Property item deleted successfully'})
    
  } catch (error) {
    return NextResponse.json({message: 'Error deleting property item', error})
  }

}