import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    // Compress image
    const compressedBuffer = await sharp(fileBuffer)
      .resize({ width: 1200 })
      .toFormat("webp", { quality: 80 })
      .toBuffer();

    return new NextResponse(compressedBuffer, {
      headers: { "Content-Type": "image/webp" },
    });
  } catch (error) {
    console.error("Image compression error:", error);
    return NextResponse.json({ error: "Compression failed" }, { status: 500 });
  }
}
