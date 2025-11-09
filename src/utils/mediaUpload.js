import { createClient } from "@supabase/supabase-js";

// Securely load environment variables
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

/**
 * Uploads a file to the 'images' bucket in Supabase Storage.
 * @param {File} file - The file object to upload.
 * @returns {Promise<string>} The public URL of the uploaded file.
 */
export default async function uploadFile(file) {
  if (!file) throw new Error("No file selected for upload.");
  if (!file.type.startsWith("image/")) throw new Error("Only image files are allowed.");

  const timeStamp = Date.now();
  const fileName = `${timeStamp}-${file.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase()}`;

  console.log("Uploading file:", fileName);

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase Upload Error:", uploadError);
    throw new Error("Failed to upload file to Supabase.");
  }

  // Get public URL
  const { data } = supabase.storage.from("images").getPublicUrl(fileName);

  if (!data || !data.publicUrl) {
    console.error("Supabase Public URL Error:", data);
    throw new Error("Failed to retrieve public URL.");
  }

  console.log("Public URL:", data.publicUrl);
  return data.publicUrl;
}