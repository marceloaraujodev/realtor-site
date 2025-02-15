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

  const formData = await req.formData(); // react hook form default is json no formData



  try {
    // console.log("Raw FormData entries:", Array.from(formData.entries()));
    const formEntries = Object.fromEntries(formData.entries());
    
    // // extract values from formData
    const {
      title,
      propertyType,
      location,
      price,
      description,
      bedrooms,
      bathrooms,
      garage,
      area,
      totalArea,
      privateArea,
      cover,
    } = formEntries;

  

     // Extract images array
    const images: string[] = [];
    const imageEntries = Array.from(formData.entries()).filter(([key]) =>
      key.startsWith('images[') || key === 'cover'
    );

    console.log('this is image entries----', imageEntries)


    // // Group images by their index
    // const groupedImages: Record<string, { id?: string; image?: File }> = {};
    // for (const [key, value] of imageEntries) {
    //   const match = key.match(/images\[(\d+)\]\[(id|image)\]/);
    //   if (match) {
    //     const index = match[1];
    //     const field = match[2];

    //     if (!groupedImages[index]) {
    //       groupedImages[index] = {};
    //     }

    //     if (field === 'id') {
    //       groupedImages[index].id = value as string; // id is always a string
    //     } else if (field === 'image' && value instanceof File) {
    //       groupedImages[index].image = value; // Ensure value is a File
    //     }
    //   }
    // }

    // // Convert grouped images into the [id: string, file: File] format
    // for (const index in groupedImages) {
    //   const { id, image } = groupedImages[index];
    //   if (id && image instanceof File) {
    //     images.push({ id, image });
    //   }
    // }

    // console.log('Parsed Images:----', images);  
    // // creates unique id for the property folder
    // const propertyId = uuidv4(); 
    
    // // Convert numeric fields to numbers if needed
    // const propertyData = {
    //   ...formEntries,
    //   cover: cover,
    //   propertyId: propertyId,
    //   price: Number(price),
    //   bedrooms: Number(bedrooms),
    //   bathrooms: Number(bathrooms),
    //   garage: Number(garage),
    //   area: Number(area),
    //   totalArea: Number(totalArea),
    //   privateArea: Number(privateArea),
    //   features: formData.getAll('features').map((feature) => ({ name: feature })),
    // };

    // console.log('this is porperty data', propertyData)
    // console.log('propertyData.cover', propertyData.cover)

    // if (!title || !location || !price || !propertyType) {
    //   return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    // }

    
    // // add images to s3
    // const uploadedImages = await Promise.all(
    //   images.map(async (file: {id: string, image: File}) => {
    //     // reads content of the file into a array of bytes
    //     const arrayBuffer = await file.image.arrayBuffer();
    //     // converts array buffer into a buffer object
    //     const buffer = Buffer.from(arrayBuffer); 

    //     const compressedBuffer = await compressImage(buffer)

    //     // Upload to S3
    //     const s3Key = `propriedades/${propertyId}/${file.id}`;
    //     const uploadParams = {
    //       Bucket: bucketName,
    //       Key: s3Key,
    //       Body: compressedBuffer,
    //       ContentType: file.image.type,
    //     };
    //     //   // upload file to s3 bucket
    //     // await s3Client.send(new PutObjectCommand(uploadParams));
    //     // console.log('image uploaded successfully', s3Key);

    //     return s3Key
    //   })
    // );
    // console.log('uploaded images', uploadedImages)
    // if(uploadedImages.length === 0) throw new Error("No images uploaded");

    // // creates database document for property
    // const newProperty = await Property.create({
    //   ...propertyData,
    //   propertyId: propertyId,
    //   images: uploadedImages,
    // });

    // console.log('this should be new property:', newProperty);

    // console.log('property uploaded successfully')
    // console.log(uploadedImages);

    return NextResponse.json({
      message: "Success",
      // newProperty,
      // s3Key: uploadedImages,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Function to upload an image to a specific S3 bucket
// Function to get all S3 buckets
async function getAllBuckets() {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("Buckets:", data.Buckets);
    return data.Buckets; // Returns the list of buckets
  } catch (err) {
    console.error("Error listing buckets:", err);
    throw err;
  }
}

// Function to upload an image to a specific S3 bucket
async function uploadImageToBucket(bucketName: string, fileName: string, fileContent: Buffer) {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName, // Name of the file to upload
      Body: fileContent, // The file content (can be a buffer, string, or stream)
      ContentType: "image/jpeg" // MIME type (can be changed depending on the file type)
    };

    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Upload Success:", data);
    return data; // Returns the response from S3
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }
}

// Example usage of the functions
async function exampleUsage() {
  // Get all buckets
  const buckets = await getAllBuckets();
  console.log("All Buckets:", buckets);

  // Upload an image (replace with actual file data)
  const bucketName = process.env.AWS_BUCKET_NAME!; 
  const fileName = "image.jpg"; // Name of the file to upload
  const fileContent = Buffer.from("image-file-content"); // Replace with actual file content (Buffer, stream, etc.)

  await uploadImageToBucket(bucketName, fileName, fileContent);
}

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

