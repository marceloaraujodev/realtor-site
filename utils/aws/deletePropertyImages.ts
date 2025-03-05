import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEYID!, // Replace with your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRETKEY!, // Replace with your AWS Secret Access Key
  }
});


export async function deletePropertyImages(propertyId: string){
  const buckeName = process.env.AWS_BUCKET_NAME;

  // gets all objects starting with this prefix
  const prefix = `propriedades/${propertyId}`
  if(!propertyId) throw new Error('Please provide a valid propertyId')

    try {
      // list all objects with the same prefix
      const listCommand = new ListObjectsV2Command({
        Bucket: buckeName,
        Prefix: prefix,
      });

      const listedObjects = await s3Client.send(listCommand)

      if(!listedObjects.Contents || listedObjects.Contents.length === 0){
        console.log('No S3 objects found to delete.');
        return;
      }
      
      // delete all listed objects
      const deleteCommand = new DeleteObjectsCommand({
        Bucket: buckeName,
        Delete: {
          Objects: listedObjects.Contents.map(obj => ({ Key: obj.Key })),
        },
      });
      
      await s3Client.send(deleteCommand);
      
      console.log(`Successfully deleted ${listedObjects.Contents.length} objects.`);
    } catch (error) {
      console.log(`Error: ${error}`);
      throw new Error(`Error deleting objects`);
    }
  
}