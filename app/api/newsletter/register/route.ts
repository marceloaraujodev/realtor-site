import { NextRequest, NextResponse } from "next/server";
import Newsletter from "@/models/newsletter";
import { mongooseConnect } from "@/lib/mongooseConnect";
import * as EmailValidator from 'email-validator';

// gets a property by propertyId to populate the editing property form
export async function POST(req: NextRequest){
  await mongooseConnect();
  const {email} = await req.json();
 console.log(email);
  try {

    const isEmail = EmailValidator.validate(email);

    if(!isEmail) {
      return NextResponse.json({success: false, message: 'Invalid email'}, {status: 400})
    }
  
    // Create and save the email to the database
    const newSubscription = await Newsletter.create({ email });
  
    return NextResponse.json({message: 'success', data: newSubscription})
    
  } catch (error) {
    console.log(error);
    throw new Error('Could not save email')
  }
}