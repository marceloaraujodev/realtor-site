import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";
import { deletePropertyImages } from "@/utils/aws/deletePropertyImages";

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }){
  try {
    console.log('delete request in')
    await mongooseConnect();

    const {id} = await context.params;

    console.log(id);
  
   // propertyId is used here
   if (!id) {
    return NextResponse.json({ error: "Invalid id format" }, { status: 400 });
  }
  
    // // delete database property record
    const deletedProperty = await Property.deleteOne({propertyId: id});
    // const property = await Property.findOne({ propertyId: id }); test
    // console.log(property)

    // Check if the property was actually deleted before proceeding
    if (deletedProperty.deletedCount === 0) {
      return NextResponse.json({ error: "Property not found or already deleted" }, { status: 404 });
    }

    // deletes images from s3 bucket
    await deletePropertyImages(id)

    return NextResponse.json({
      message: 'Property item deleted successfully',
      deleteCount: deletedProperty.deletedCount
    })
    
  } catch (error) {
    return NextResponse.json({message: 'Error deleting property item', error})
  }

}
export const dynamic = 'force-dynamic'; // Prevent static rendering