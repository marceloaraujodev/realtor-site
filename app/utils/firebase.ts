import firebaseInit from "./firebaseInit";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {nanoid} from 'nanoid'

// Initialize Firebase
firebaseInit();

const storage = getStorage(); 



export const uploadFile = async (file: File, filePath: string) => {
  const uniqueFileName = nanoid();
  
  const encodedFolderPath = encodeURIComponent(`propriedades/${uniqueFileName}`);
  const fileRef = ref(storage, encodedFolderPath);
  

  try {
    await uploadBytesResumable(fileRef, file);
    console.log("File uploaded successfully!");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};