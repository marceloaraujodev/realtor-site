import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";


// re visit this route and code to make sure is working
export async function PATCH(req: NextRequest, {params}: {params: {id: string}}){
  try {
    await mongooseConnect();
    const formData = await req.formData(); // react hook form default is json no formData

    console.log("Raw FormData entries:", Array.from(formData.entries()));
    // const { id } = params;
    console.log('TESTING')
    // console.log(params)


    // // will need to update this to get any fields that are being updated  and received
    // const propertyUpdated = await Property.findOneAndUpdate(
    //   {propertyId: id}, 
    //   data,
    //   {new: true}
    // )
  
    return NextResponse.json({
      message: 'propriedade atualizada com sucesso', 
      // propertyUpdated
    });
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Falha ao atualizar a propriedade' }, {status: 500});
  }

}