import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function DELETE(req: Request, { params }:{params: { id: string}}){
  try {
    console.log(params)
    const { id } = params;
    console.log(id);
  
    const prisma = new PrismaClient();
  
    const numericId: number = parseInt(id);
  
    if(isNaN(numericId)){
      return NextResponse.json({error: 'Invalid id format'}, {status: 400})
    }
  
    await prisma.property.delete({
      where: { id: numericId }
    });
  
    return NextResponse.json({message: 'Property item deleted successfully'})
    
  } catch (error) {
    return NextResponse.json({message: 'Error deleting property item', error})
  }

}