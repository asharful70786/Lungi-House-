import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';


cloudinary.config({
  cloud_name: 'dvbsrbash',
  api_key: '732986252124935',
  api_secret: 'FtiVp0XgBm2nEzHfGEWdo8nLz20',
});



export const uploadImage = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'products' }, // optional
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};