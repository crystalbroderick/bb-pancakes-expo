import { supabase, supabaseUrl } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
export const getSupabaseFileUrl = (filePath) => {
  if (filePath) {
    return {
      uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
    };
  }
  return null;
};

export const getUserImageSrc = (imagePath) => {
  if (!imagePath || imagePath === null || imagePath === "undefined") {
    return require("@/assets/images/little-chef-plate.jpg");
  }

  // If it's already a full URI (e.g., picked locally or already public)
  if (imagePath.startsWith("http") || imagePath.startsWith("file")) {
    return { uri: imagePath };
  }

  return getSupabaseFileUrl(imagePath);
};
// Uploads file to Supabase storage
export const uploadFile = async (folderName, fileUri) => {
  const ext = fileUri.split(".").pop()?.toLowerCase() || "png";
  const contentType = `image/${ext === "jpg" ? "jpeg" : ext}`;
  console.log("uploading file");

  try {
    const filePath = getFilePath(folderName, ext);

    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const imageData = decode(fileBase64); // Convert base64 to array buffer

    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filePath, imageData, {
        cacheControl: "3600",
        upsert: false,
        contentType: contentType, // e.g. image/png or image/jpeg
      });

    if (error) {
      console.log("Upload error:", error);
      return { success: false, msg: "Could not upload media" };
    }

    return { success: true, data: data.path };
  } catch (err) {
    console.log("Unexpected upload error:", err);
    return { success: false, msg: "Unexpected error during upload" };
  }
};

// Generate a unique file path
export const getFilePath = (folderName, ext = "png") => {
  return `${folderName}/${Date.now()}.${ext}`;
};
