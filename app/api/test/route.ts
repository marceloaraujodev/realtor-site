import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {  
  console.log('API route hit');
  
 return NextResponse.json({test: Math.random() * 100})
}
export const dynamic = 'force-dynamic'; // Prevent static rendering


