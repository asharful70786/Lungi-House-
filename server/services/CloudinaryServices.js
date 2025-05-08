import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.Cloudinary_cloud_name,
  api_key:process.env.Cloudinary_api_key,
  api_secret: process.env.Cloudinary_api_secret,
});



export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'products' }, 
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};