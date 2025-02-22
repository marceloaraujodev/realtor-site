import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebaseConfig'; // Import the new storage instance

export async function uploadFileToNewFirebase(file: File): Promise<string> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `realtor/images/${fileName}`);

    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw new Error("Failed to upload file to Firebase");
  }
}
