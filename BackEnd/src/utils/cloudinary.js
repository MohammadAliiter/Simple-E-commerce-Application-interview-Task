import fs from 'fs';

import {v2 as cloudinary} from 'cloudinary';

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null
      
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      })
      
      return response;

  } catch (error) {
      fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
      return null;
  }
}

export { uploadOnCloudinary }
