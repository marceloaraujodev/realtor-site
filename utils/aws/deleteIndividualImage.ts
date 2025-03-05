import { S3Client, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

dotenv.config();


const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID!, // Replace with your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRETKEY!, // Replace with your AWS Secret Access Key
  }
});

export async function deleteImageByUrl(url: string) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!url) throw new Error('Please provide a valid URL for deletion');

  try {
    // Prepare the object key from the URL (this assumes the key is everything after the bucket name and prefix)
    const key = url;
    
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucketName,
      Delete: {
        Objects: [
          {
            Key: key, // The specific S3 key of the image you want to delete
          },
        ],
      },
    });

    await s3Client.send(deleteCommand);

  } catch (error) {
    console.log(`Error deleting object with URL ${url}: ${error}`);
    throw new Error(`Error deleting object with URL ${url}`);
  }
}
