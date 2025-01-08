import { NextRequest, NextResponse } from "next/server";
import { PropertyContactForm } from '../../../../types/propertyContact';

export async function POST(req: NextRequest){
  const {name, email, phone, message} = (await req.json()) as PropertyContactForm

  console.log(name, email, phone, message)




  return NextResponse.json({
    success: true,
    data: {
      // name,
      // email,
      // phone,
      // message,
    },
    message: "Data received successfully"
  })
}