import multer from "multer";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
import { NextFunction, Request, Response } from "express";

// Configure Multer storage
const storage = multer.memoryStorage();

// Configure Cloudinary
cloudinary.config({
  cloud_name: "djpy7uxgn",
  api_key: "282692769768427",
  api_secret: "WfOEf61kzb-dUqOcKIPw4nsHFkQ",
  secure: true,
});

// Middleware function for uploading files
const uploadFile = (folder: string) => {
  const upload = multer({ storage }).fields([
    { name: "Single_file", maxCount: 1 },
    
    { name: "gallery", maxCount: 10 },
    
  ]);


  async function uploadToCloudinary(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log(req.body);
    
    try {
      const images = req.files as { [fieldname: string]: Express.Multer.File[] };

      if (images?.Single_file) {
        const profilePictureBuffer: Buffer = images.Single_file[0].buffer;
        req.upload_urls = {
          Single_file: await uploadToCloudinaryHelper(profilePictureBuffer, folder),
        };
      }

      if (images?.gallery) {
        const galleryUris: string[] = [];
        for (let i = 0; i < images.gallery.length; i++) {
          const galleryFromBuffer: Buffer = images.gallery[i].buffer;
          const uri = await uploadToCloudinaryHelper(galleryFromBuffer, folder);
          galleryUris.push(uri);
        }
        req.upload_urls = { ...req.upload_urls, gallery: galleryUris };
      }

      next();
    } catch (error) {
      next(error);
    }
  }

  return [upload, uploadToCloudinary];
};

// Helper function to upload buffer to Cloudinary
async function uploadToCloudinaryHelper(buffer: Buffer, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder },
      (error: Error, result: UploadApiResponse) => {
        if (result) {
          resolve(result.secure_url || result.url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(cld_upload_stream);
  });
}

export default uploadFile;
