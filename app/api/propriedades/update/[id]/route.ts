import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";


// re visit this route and code to make sure is working
export async function PATCH(req: NextRequest, {params}: {params: {id: string}}){
  try {
    await mongooseConnect();
    console.log(params)
    const { id } = params;
    const { price } = await req.json()
    
  
    const numericId = parseInt(id)
    console.log(numericId, typeof numericId)


    const propertyUpdated = await Property.findOneAndUpdate(
      {_id: numericId}, 
      {price: price},
      {new: true}
    )
  
    return NextResponse.json({
      message: 'propriedade atualizada com sucesso', 
      propertyUpdated
    });
    
  } catch (error) {
    
  }

}