import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";


// re visit this route and code to make sure is working
export async function PATCH(req: NextRequest, {params}: {params: {id: string}}){
  try {
    await mongooseConnect();
    const data = await req.json();
    const { id } = params;

    console.log(params)
    console.log(data)

    // will need to update this to get any fields that are being updated  and received
    const propertyUpdated = await Property.findOneAndUpdate(
      {propertyId: id}, 
      data,
      {new: true}
    )
  
    return NextResponse.json({
      message: 'propriedade atualizada com sucesso', 
      propertyUpdated
    });
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Falha ao atualizar a propriedade' }, {status: 500});
  }

}