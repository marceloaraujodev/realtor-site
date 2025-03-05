import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";
import { S3Client, PutObjectCommand, ListBucketsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';
import { deletePropertyImages } from "@/utils/aws/deletePropertyImages";
import dotenv from 'dotenv'

dotenv.config()

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID!, // Replace with your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRETKEY!, // Replace with your AWS Secret Access Key
  }
});

export async function POST(req: NextRequest) {  

  await mongooseConnect();
  const bucketName: string = process.env.AWS_BUCKET_NAME!;
  const region: string = process.env.AWS_REGION!;

  const formData = await req.formData(); // react hook form default is json no formData

  // console.log("Raw FormData entries:", Array.from(formData.entries()));
  const formEntries = Object.fromEntries(formData.entries());
  // Prepare to capture all the images from the form data
  const imagesObjectsArr: { id: string; file: File | null }[] = [];
  const propertyId = uuidv4();



  // return NextResponse.json({
  //   message: "Success",

  // })

  try {
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
      totalArea,
      privateArea,
      cover,
      suites,
      listingType,
      condominio,
    } = formEntries;

      // loops throuth each features [] from formdata and creates an array of features objects
    const features: {name: string}[] = [];
      for (const [key, value] of Array.from(formData.entries())) {
      const match = key.match(/^features\[(\d+)\]$/);
      if (match) {
        features.push({name: value as string})
      }
    }

    // loops through all images
    for (const [key, value] of Array.from(formData.entries())) {
      const match = key.match(/images\[(\d+)\]\[(id|image)\]/);

      if (!match) continue;
      
      const index = Number(match[1]);
      const type = match[2];
      
      if (!imagesObjectsArr[index]) imagesObjectsArr[index] = { id: "", file: null };
      
      if (type === "id") imagesObjectsArr[index].id = value as string;
      if (type === "image" && value instanceof File) imagesObjectsArr[index].file = value;
    }

    // console.log("Extracted images:", imagesObjectsArr); // correct 
    
    // uploads all images and returns a array of objects ready for the database upload
    const images = await Promise.all(imagesObjectsArr.map( async (image) => {
      if (!image.file) return null;
      const arrayBuffer = await image.file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // const optimizedImage = await compressImage(buffer); 
      const s3Key = `propriedades/${propertyId}/${image.id}`; // generate 

      // image is passed as a buffer
      const uploadParams = {
        Bucket: bucketName,
        Key: s3Key,
        Body: buffer, 
        ContentType: image.file.type,
      };

      // // upload file to s3 bucket
      await s3Client.send(new PutObjectCommand(uploadParams));
      // console.log('image uploaded successfully', s3Key);

      // format for the database 
      return {
        id: image.id,
        url: s3Key,
        cover: image.id === cover ? s3Key : undefined,  // Mark cover image
      };
    }))

    // Check if there's no cover image, then set the default cover to the first image
    if (images.length > 0) {
      let firstValidImage = images[0];

      // Ensure the first valid image has a cover if no cover is found
      if (firstValidImage && !firstValidImage.cover) {
        firstValidImage.cover = firstValidImage.url;
      }

      // console.log("Images after cover logic:", images); // Check the updated images array
    }
    
        
    // Creates the propertyData to submit to db
    const propertyData = {
      title,
      propertyType,
      location,
      description,
      propertyId: propertyId,
      price: Number(price),
      cover: cover,
      bedrooms: Number(bedrooms),
      suites: Number(suites),
      bathrooms: Number(bathrooms),
      garage: Number(garage),
      totalArea: Number(totalArea),
      privateArea: Number(privateArea),
      condominio: Number(condominio),
      features,
      listingType,
      images,
    };

    if (!title || !location || !price || !propertyType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // creates database document for property
    const newProperty = await Property.create({
      ...propertyData,
    });

    // console.log("-- newProperty", newProperty)

    return NextResponse.json({
      message: "Success",
      newProperty,
      s3Key: images,
    },{
      status: 200,
    } );
  } catch (error) {
    console.error("Error creating property:", error);
    await Promise.all(imagesObjectsArr.map(async (image) => {
      if (image.id) {
        await deletePropertyImages(propertyId); // Ensure images are deleted
      }
    }));
    return NextResponse.json({ error: "Internal server error" }, {
      status: 500,
    });
  }
}



export const dynamic = 'force-dynamic'; // Prevent static rendering