import { NextResponse, NextRequest } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Property from "@/models/property";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { compressImage } from "@/utils/compressImages";
import { deleteImageByUrl } from "@/utils/aws/deleteIndividualImage";
import { deletePropertyImages } from "@/utils/aws/deletePropertyImages";


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

  // console.log("Raw FormData entries:", Array.from(formData.entries()));

  const formEntries = Object.fromEntries(formData.entries());
  // console.log("FormData entries:", formEntries)
  
  // Prepare to capture all the images from the form data
  const imagesObjectsArr: { id: string; file: File | null, url?: string }[] = [];
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
      const match = key.match(/images\[(\d+)\]\[(id|image|url)\]/);
      
      if (!match) continue;
      
      const index = Number(match[1]);
      const type = match[2];
      
      if (!imagesObjectsArr[index])
        imagesObjectsArr[index] = { id: "", file: null, url: "" };
      
      if (type === "id") {
        imagesObjectsArr[index].id = value as string;
      } else if (type === "image" && value instanceof File) {
        imagesObjectsArr[index].file = value;
      } else if (type === "url") {
        imagesObjectsArr[index].url = value as string;
      }
    }
    
    // all images will be here and have at least the id, url and file are optional here
    // console.log("Extracted images:", imagesObjectsArr);
    
    // uploads all images and returns a array of objects ready for the database upload
    const imagesToUpload = await Promise.all(imagesObjectsArr.map( async (image) => {
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
  
      // upload file to s3 bucket
      try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        // console.log('image uploaded successfully', s3Key);
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


    const filteredImages = imagesToUpload.filter(Boolean); 

    // add images to the property data and update property data as the data in the findone and updadte
    const currentProperty = await Property.findOne({propertyId: propertyId});

    // set the current images to the database images
    let currentImages = currentProperty?.images ?? [];

    // set the images to be deleted from s3 and db
    const imagesToDelete = currentImages.filter( i => !imagesObjectsArr.some(img => img.id === i.id))

    currentImages = currentImages.filter( i => imagesObjectsArr.some(img => img.id === i.id))

    // Delete removed images from S3
    if (imagesToDelete.length > 0) {
      try {
        await Promise.all(
          imagesToDelete.map(async (img) => {
            await deleteImageByUrl(img.url); // Ensure this function removes from S3
            console.log(`Deleted from S3: ${img.url}`);
          })
        );
      } catch (error) {
        console.error("Error deleting images from S3:", error);
      }
    }

    let newImages = filteredImages.length > 0 ? [...filteredImages, ...currentImages] : currentImages;

    console.log('New images:', newImages)

    // Remove deleted images from the database before saving
    newImages = newImages.filter(img => !imagesToDelete.some(removed => removed.id === img?.id));
    
    
    // Reset all covers first
    newImages.forEach(image => {
      if(image){
        image.cover = undefined;
      }
    });
    
    // Find and set the new cover based on URL match
    newImages.forEach(image => {
      if(image){
        const urlParts = image.url.split('/');
        const lastPart = urlParts[urlParts.length - 1]; // Extract ID from URL
        
        if (lastPart === cover) {
          image.cover = image.url;
          console.log(`Set cover for image ${lastPart}`);
        }
      }
    });
    
    // console.log('newImages after changes', newImages);

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

    // console.log('propertyData', propertyData)

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
      // updatedProperty,
      // s3Key: images,
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