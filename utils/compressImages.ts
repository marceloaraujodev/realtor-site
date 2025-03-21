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
    maxSizeMB: 5,
    useWebWorker: true,
  };

    // Check if the file size exceeds the limit before attempting compression
    const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
    if (fileSizeInMB > options.maxSizeMB) {
      throw new Error(`Image size is larger than ${options.maxSizeMB}MB, only images smaller then 5MB.`);
    }

  try {
    return await imageCompression(file, options);
  } catch (error) {
      // Check if the error is caused by exceeding the max size
      if (error instanceof Error && error.message.includes('file is too large')) {
        throw new Error('Image size is larger than 5MB, compression failed');
      } else {
        console.error('Error compressing image:', error);
        throw error; // Re-throw the error to handle it upstream
      }
  }
};