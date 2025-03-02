// import Sharp from 'sharp';


// export async function compressImage(fileBuffer: Buffer): Promise<Buffer>{
//   return await Sharp(fileBuffer)
//         .resize({ width: 1200 }) // Resize to a max width (optional) move to .env
//         .toFormat("webp", { quality: 80 }) // Convert to WebP with 80% quality
//         .toBuffer();
//  }

// import * as Jimp from 'jimp';


// export async function compressImage(fileBuffer: Buffer) {
//   const image = await Jimp.read(fileBuffer); // Read the image from the buffer
//   await image
//     .resize(1200, Jimp.AUTO) // Resize to 1200px wide, keeping aspect ratio
//     .quality(80); // Set JPEG quality to 80%

//   return image.getBufferAsync(Jimp.MIME_JPEG); // Return the compressed image as a Buffer
// }

