import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";

export async function DELETE(req: NextRequest, { params }:{params: { id: string}}){
  try {
    await mongooseConnect();
    console.log(params)
    const { id } = params;
    console.log(id);
  
   // Validate if id is a valid MongoDB ObjectId mdb _id is always a 24 digit string
   if (!id || id.length !== 24) {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }
  
    const deletedProperty = await Property.findByIdAndDelete(id);
  
    return NextResponse.json({
      message: 'Property item deleted successfully',
      deletedProperty,
    })
    
  } catch (error) {
    return NextResponse.json({message: 'Error deleting property item', error})
  }

}