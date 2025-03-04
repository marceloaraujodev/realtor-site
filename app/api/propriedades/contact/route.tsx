import { NextRequest, NextResponse } from "next/server";
import { PropertyContactForm } from '../../../../types/propertyContact';
import sendMail from "@/utils/sendEmail";

export async function POST(req: NextRequest){
  const {name, email, phone, message, propertyId} = (await req.json()) as PropertyContactForm

  console.log(name, email, phone, message, propertyId)

  if(!email || !phone){
    return NextResponse.json({
      success: false,
      message: "Please provide a valid email and phone number."
    })
  }

  const propertyMessage = {
    from: email,
    subject: 'Menssagem sobre propriedade',
    text: `${name} (${email}) sent you a message: ${message}`,
    html: `
    <h2>Mensagem sobre a propriedade ID: ${propertyId}</h2>
    <p><strong>Nome:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Tel:</strong> ${phone}</p>
    <p>${message}</p>
    <p><strong>Propriedade ID:</strong> ${propertyId}</p>
    `,
  }

  await sendMail(propertyMessage)

  return NextResponse.json({
    success: true,
    data: {
      name,
      email,
      phone,
      message,
      propertyId,
    },
    message: "Data received successfully"
  })
}
export const dynamic = 'force-dynamic'; // Prevent static rendering