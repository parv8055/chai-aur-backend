import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null;
    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath, {
      resource_type: "auto",
      folder: "chaiaurbackend",
    });
    //file have been uploaded successfull
    console.log(`📷 File is uploaded on cloudinary`);
    return response;
  } catch (err) {
    throw err;
  } finally {
    //remove the locally saved temporary file as the upload opertion got failed
    fs.unlinkSync(localfilepath);
  }
};
