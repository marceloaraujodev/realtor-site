import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/types/formTypes";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";
import { S3Client, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import Sharp from 'sharp';


const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!, // Replace with your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRET_KEY!, // Replace with your AWS Secret Access Key
  }
});

export async function POST(req: NextRequest) {  
  await mongooseConnect();
  const bucketName: string = process.env.AWS_BUCKET_NAME!;
  const region: string = process.env.AWS_REGION!;
  const formData = await req.formData();
  console.log(formData);

  // try {
  //   const formData = await req.formData();

  //   const formEntries = Object.fromEntries(formData.entries());

  //   // extract values from formData
  //   const {
  //     title,
  //     propertyType,
  //     location,
  //     price,
  //     description,
  //     bedrooms,
  //     bathrooms,
  //     garage,
  //     area,
  //     totalArea,
  //     privateArea,
  //   } = formEntries;

  //   // need to seriealize this to see in the postman response
  //   const images = formData.getAll("images").filter((value): value is File => value instanceof File);

  //   // Convert numeric fields to numbers if needed
  //   const propertyData = {
  //     ...formEntries,
  //     price: Number(price),
  //     bedrooms: Number(bedrooms),
  //     bathrooms: Number(bathrooms),
  //     garage: Number(garage),
  //     area: Number(area),
  //     totalArea: Number(totalArea),
  //     privateArea: Number(privateArea),
  //     features: formData.getAll('features').map((feature) => ({ name: feature })),
  //   };

  //   if (!title || !location || !price || !propertyType) {
  //     return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  //   }

  //   // add images to s3
  //   const propertyId = uuidv4(); // creates unique id for the entire property folder
  //   const uploadedImages = await Promise.all(
  //     images.map(async (file: File) => {
  //       const arrayBuffer = await file.arrayBuffer();
  //       const buffer = Buffer.from(arrayBuffer); // Convert to Node.js Buffer

  //       const compressedBuffer = await compressImage(buffer)

  //       // Upload to S3
  //       const uniqueId = uuidv4(); // creates unique id for the file
  //       const s3Key = `propriedades/${propertyId}/${uniqueId}`;
  //       const uploadParams = {
  //         Bucket: bucketName,
  //         Key: s3Key,
  //         Body: compressedBuffer,
  //         ContentType: file.type,
  //       };
  //         // upload file to s3 bucket
  //       await s3Client.send(new PutObjectCommand(uploadParams));
  //       console.log('image uploaded successfully', s3Key);

  //       return s3Key
  //     })
  //   );

  //   if(uploadedImages.length === 0) throw new Error("No images uploaded");

  //   // creates database document for property
  //   const newProperty = await Property.create({
  //     ...propertyData,
  //     propertyId: propertyId,
  //     images: uploadedImages,
  //   });

  //   console.log('property uploaded successfully')

  //   return NextResponse.json({
  //     message: "Success",
  //     newProperty,
  //     s3Key: uploadedImages
  //   });
  // } catch (error) {
  //   console.error("Error creating property:", error);
  //   return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  // }
}

// Function to upload an image to a specific S3 bucket
// Function to get all S3 buckets
// async function getAllBuckets() {
//   try {
//     const data = await s3Client.send(new ListBucketsCommand({}));
//     console.log("Buckets:", data.Buckets);
//     return data.Buckets; // Returns the list of buckets
//   } catch (err) {
//     console.error("Error listing buckets:", err);
//     throw err;
//   }
// }

// // Function to upload an image to a specific S3 bucket
// async function uploadImageToBucket(bucketName: string, fileName: string, fileContent: Buffer) {
//   try {
//     const uploadParams = {
//       Bucket: bucketName,
//       Key: fileName, // Name of the file to upload
//       Body: fileContent, // The file content (can be a buffer, string, or stream)
//       ContentType: "image/jpeg" // MIME type (can be changed depending on the file type)
//     };

//     const data = await s3Client.send(new PutObjectCommand(uploadParams));
//     console.log("Upload Success:", data);
//     return data; // Returns the response from S3
//   } catch (err) {
//     console.error("Error uploading image:", err);
//     throw err;
//   }
// }

// // Example usage of the functions
// async function exampleUsage() {
//   // Get all buckets
//   const buckets = await getAllBuckets();
//   console.log("All Buckets:", buckets);

//   // Upload an image (replace with actual file data)
//   const bucketName = process.env.AWS_BUCKET_NAME!; 
//   const fileName = "image.jpg"; // Name of the file to upload
//   const fileContent = Buffer.from("image-file-content"); // Replace with actual file content (Buffer, stream, etc.)

//   await uploadImageToBucket(bucketName, fileName, fileContent);
// }



 async function compressImage(fileBuffer: Buffer): Promise<Buffer>{
  return await Sharp(fileBuffer)
        .resize({ width: 1200 }) // Resize to a max width (optional) move to .env
        .toFormat("webp", { quality: 80 }) // Convert to WebP with 80% quality
        .toBuffer();
 }

 async function listObjects(bucketName: string) {
  const command = new ListObjectsV2Command({ Bucket: bucketName });
  const data = await s3Client.send(command);
  return data.Contents;
}
