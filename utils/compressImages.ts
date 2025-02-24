import Sharp from 'sharp';

export async function compressImage(fileBuffer: Buffer): Promise<Buffer>{
  return await Sharp(fileBuffer)
        .resize({ width: 1200 }) // Resize to a max width (optional) move to .env
        .toFormat("webp", { quality: 80 }) // Convert to WebP with 80% quality
        .toBuffer();
 }