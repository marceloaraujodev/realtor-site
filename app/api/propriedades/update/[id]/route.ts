import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { errorResponse } from "@/utils/errorResponse";

export async function PATCH(req: NextRequest, {params}: {params: {id: string}}){
  try {
    console.log(params)
    const { id } = params;
    const { price } = await req.json()
    console.log(price) 

    const prisma = new PrismaClient();
  
    const numericId = parseInt(id)
    console.log(numericId, typeof numericId)
  
    const propertyUpdated = await prisma.property.update({
     where: {id: numericId},
      data: {
        price: price
      },
    })
  
    return NextResponse.json({
      message: 'propriedade atualizada com sucesso', 
      propertyUpdated
    });
    
  } catch (error) {
    
  }

}