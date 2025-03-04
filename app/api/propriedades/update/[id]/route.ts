import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { compressImage } from "@/utils/compressImages";
import { deletePropertyImages } from "@/utils/aws/deletePropertyImages";
import { IpropertyType } from "@/types/propertyType";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID!, // Replace with your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRETKEY!, // Replace with your AWS Secret Access Key
  }
});


// re visit this route and code to make sure is working
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }){
  await mongooseConnect();
  const bucketName: string = process.env.AWS_BUCKET_NAME!;
  const region: string = process.env.AWS_REGION!;

  const formData = await req.formData(); // react hook form default is json no formData

  console.log("Raw FormData entries:", Array.from(formData.entries()));

  const formEntries = Object.fromEntries(formData.entries());
  
  // Prepare to capture all the images from the form data
  const imagesObjectsArr: { id: string; file: File | null }[] = [];
  const {id: propertyId} = await context.params;
  
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
    
    // loops through images 
    for (const [key, value] of Array.from(formData.entries())) {
      const match = key.match(/images\[(\d+)\]\[(id|image)\]/);
      
      if (!match) continue;
      
      const index = Number(match[1]);
      const type = match[2];
      
      if (!imagesObjectsArr[index]) imagesObjectsArr[index] = { id: "", file: null };
      
      if (type === "id") imagesObjectsArr[index].id = value as string;
      if (type === "image" && value instanceof File) imagesObjectsArr[index].file = value;
    }
    
    console.log("Extracted images:", imagesObjectsArr); // correct 
    
    // uploads all images and returns a array of objects ready for the database upload
    const images = await Promise.all(imagesObjectsArr.map( async (image) => {
      if (!image.file) return null;
      const arrayBuffer = await image.file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // const optimizedImage = await compressImage(buffer); // skip compression
      const s3Key = `propriedades/${propertyId}/${image.id}`; // generate 
      
      const uploadParams = {
        Bucket: bucketName,
        Key: s3Key,
        Body: buffer, // skip compression
        ContentType: image.file.type,
      };
      console.log('cover comparison', image.id === cover)
      
      // upload file to s3 bucket
      try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        console.log('image uploaded successfully', s3Key);
      } catch (error) {
        console.error("Error uploading image to S3:", error);
        throw new Error("Failed to upload image to S3");
      }

      // format for the database 
      return {
        id: image.id,
        url: s3Key,
        cover: image.id === cover ? s3Key : undefined
      };
    }))

    const filteredImages = images.filter(Boolean); 
    console.log('filteredImages', filteredImages)

  // need to filter features by name
        
    // add images to the property data and update property data as the data in the findone and updadte
    const currentProperty = await Property.findOne({propertyId: propertyId});
    console.log('currentProperty', currentProperty);
    
    const currentImages = currentProperty?.images ?? [];
    
    let newImages = filteredImages.length > 0 ? [...filteredImages, ...currentImages] : currentImages;

    // Ensure cover is correctly assigned to the existing images
    if (filteredImages.length === 0) {
      newImages = currentImages.map((img) => ({
        ...img,
        cover: img.id === String(cover) ? img.url : undefined,
      }));
    } else {
      newImages = filteredImages.length > 0 ? [...filteredImages, ...currentImages] : currentImages;
    }


    const propertyData: any = {
      title,
      propertyType,
      location,
      description,
      price: Number(price),
      cover,
      bedrooms: Number(bedrooms),
      suites: Number(suites),
      bathrooms: Number(bathrooms),
      garage: Number(garage),
      totalArea: Number(totalArea),
      privateArea: Number(privateArea),
      condominio: Number(condominio),
      listingType,
      features: features, // adds the entire features array
      images: newImages,
    }

    console.log('propertyData', propertyData)

    if (!title || !location || !price || !propertyType) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // update property 
    const updatedProperty = await Property.findOneAndUpdate( 
      { propertyId: propertyId }, 
      { $set: propertyData }, // Use $set to update only the changed fields
      { new: true }
    );

    return NextResponse.json({
      message: "Success",
      updatedProperty,
      s3Key: images,
    });
  } catch (error) {
    console.error("Error creating property:", error);
    // Cleanup uploaded images on error
    try {
      await deletePropertyImages(propertyId);
    } catch (cleanupError) {
      console.error("Error during cleanup:", cleanupError);
    }
    // return NextResponse.json({ error: "Internal server error" }, { status: 400 });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

}
export const dynamic = 'force-dynamic'; // Prevent static rendering