import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { mongooseConnect } from "@/lib/mongooseConnect";
import User from "@/models/user";

import dotenv from 'dotenv'

dotenv.config();

interface LoginForm {
  email: string;
  password: string;
}

class AppError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}


// need to fix error handling all errors will be at the internal server error 
export async function POST(req: NextRequest){
  await mongooseConnect();
  try {
    const SECRET = process.env.JWT_SECRET; 
    if (!SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
  
    const data: LoginForm = await req.json();
  
    if(!data.email ||!data.password){
      return NextResponse.json({
        message: 'Missing required fields'
      }, { status: 400 });
    }
  
    const user = await User.findOne({
      email: data.email
    })

    if(!user) throw new AppError("User not found", 404);

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if(!isPasswordValid) throw new Error("Invalid password");

    // generate JWT token
    const token = jwt.sign(
      {id: user.id, email: user.email },
      SECRET,
      {expiresIn: '1h'}
    )

    const response = NextResponse.json({
      message: 'User logged in successfully',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    })

    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60, // 1hr
    })
  
    return response
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: error
    })
  }
}