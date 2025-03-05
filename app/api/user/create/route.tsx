import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { mongooseConnect } from "@/lib/mongooseConnect";
import User from "@/models/user";
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
  await mongooseConnect();

  try {
    
    const SECRET = process.env.JWT_SECRET; 
    if (!SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    const data: CreateUserForm = await req.json();
  
    if(!data.name ||!data.email ||!data.username ||!data.password){
      return NextResponse.json({
        message: 'Missing required fields'
      }, { status: 400 });
    }

    const existingUser = await User.findOne({
      email: data.email
    });

    if(existingUser){
      return NextResponse.json({
        message: 'Email already in use'
      }, { status: 400 });
    }
  
    // encrypt password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);
  
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        username: data.username,
        password: hashedPassword,
    })
  
    // generate JWT token
    const token = jwt.sign(
      {id: newUser.id, email: newUser.email },
      SECRET,
      {expiresIn: '1h'}
    )

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error: 'Internal server error',
    }, { status: 500 })
  }
}