// import Sharp from 'sharp';


// export async function compressImage(fileBuffer: Buffer): Promise<Buffer>{
//   return await Sharp(fileBuffer)
//         .resize({ width: 1200 }) // Resize to a max width (optional) move to .env
//         .toFormat("webp", { quality: 80 }) // Convert to WebP with 80% quality
//         .toBuffer();
//  }

// import * as Jimp from 'jimp';


// export async function compressImage(fileBuffer: Buffer) {
//   const image = await Jimp.default.read(fileBuffer);
//   const resizedImage = await image.resize(Jimp.default.AUTO, 500);
  
//   return resizedImage // Return the compressed image as a Buffer
// }

import imageCompression from 'browser-image-compression';

export const handleImageUpload = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error; // Re-throw the error to handle it upstream
  }
};