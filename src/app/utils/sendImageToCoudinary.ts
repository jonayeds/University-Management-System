import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';
cloudinary.config({
  cloud_name: 'dtqsckwk9',
  api_key: '461689883496168',
  api_secret: config.cloudinary_api_secret,
});
export const sendImageToCloudinary = async (
  filePath: string,
  fileName: string,
) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        public_id: fileName,
      },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        // deleting temporary file
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            reject(err);
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
