import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv'

dotenv.config();

interface CreateUserForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

// need to fix error handling all errors will be at the internal server error 
export async function POST(req: NextRequest){
  try {
    
    const SECRET = process.env.JWT_SECRET; 
    if (!SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
  
    const prisma = new PrismaClient();
    const data: CreateUserForm = await req.json();
    console.log(data);
    console.log(SECRET)
  
    if(!data.name ||!data.email ||!data.username ||!data.password){
      return NextResponse.json({
        message: 'Missing required fields'
      }, { status: 400 });
    }
  
    // encrypt password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);
  
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
      }
    })
  
    // generate JWT token
    const token = jwt.sign(
      {id: newUser.id, email: newUser.email },
      SECRET,
      {expiresIn: '1h'}
    )

    const response = NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
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
      error: 'Internal server error',
    }, { status: 500 })
  }
}