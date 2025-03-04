import { NextResponse, NextRequest } from "next/server";
import sendMail from "@/utils/sendEmail";
import { IemailMessage } from "@/types/emailTypes";

export async function POST(req: NextRequest) {
  const {name, email, phone, message} = await req.json();

  const emailMessage: IemailMessage = {
    from: email,
    subject: 'Nova mensagem do site.',
    text: `${name} (${email}) enviou uma mensagem: ${message}`,
    html: `
    <h3>${name} enviou uma requisição.</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Tel:</strong>${phone}</p>
    <p>${message}</p>`,
  }

  await sendMail(emailMessage)

  return NextResponse.json({ 
    message: "Message sent successfully", 
  });
}