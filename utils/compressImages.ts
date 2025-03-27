import imageCompression from "browser-image-compression";

export const handleImageUpload = async (file: File) => {
  const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB

  if (fileSizeInMB > 5) {
    throw new Error("Image size is larger than 5MB. Please upload a smaller file.");
  }

  const options = {
    maxSizeMB: Math.min(1, fileSizeInMB / 2), // Reduce target size for faster compression
    maxWidthOrHeight: 1920, // Resize large images
    initialQuality: 0.8, // Start with slightly reduced quality
    useWebWorker: true, // Enable multi-threading
    alwaysKeepResolution: true, // Avoid resampling smaller images
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
