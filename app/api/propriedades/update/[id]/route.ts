import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "@/utils/errorResponse";

export async function PATCH(req: Request, {params}: {params: {id: string}}){
  try {
    console.log(params)
    const { id } = params;
  
    const prisma = new PrismaClient();
  
    const numericId = parseInt(id)
    console.log(numericId, typeof numericId)
  
    const propertyUpdated = await prisma.property.update({
     where: {id: numericId},
      data: {
        price: 250000
      },
    })
  
    return NextResponse.json({message: 'propriedade atualizada com sucesso', propertyUpdated});
    
  } catch (error) {
    
  }

}