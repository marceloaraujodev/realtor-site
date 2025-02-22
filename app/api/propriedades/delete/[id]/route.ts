import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";
import { deletePropertyImages } from "@/utils/aws/deletePropertyImages";

export async function DELETE(req: NextRequest, { params }:{params: { id: string}}){
  try {
    await mongooseConnect();
    console.log(params)
    const { id } = params;
    console.log(id);
  
   // propertyId is used here
   if (!id) {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }
  
    // delete database property record
    const deletedProperty = await Property.deleteOne({propertyId: id});

    // deletes images from s3 bucket
    await deletePropertyImages(id)

    return NextResponse.json({
      message: 'Property item deleted successfully',
      deletedProperty,
    })
    
  } catch (error) {
    return NextResponse.json({message: 'Error deleting property item', error})
  }

}