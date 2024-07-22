const upload = require("../config/multer");
const cloud = require("../config/cloud.config");
const path = require("path");
const cloudinary = require("cloudinary");
const uploadToCloud = (file) => {
  return new Promise(async (resolve, reject) => {
    const uploadResult = await cloud.uploader.upload_stream(
      {
        public_id: path.parse(file.originalname).name,
      },
      (error, resilt) => {
        if (error) {
          reject(error);
        }

        const optimizedUrl = cloud.url(resilt.public_id, {
          fetch_format: "auto",
          quality: "auto",
        });

        resolve(optimizedUrl);
      }
    );
    uploadResult.end(file.buffer);
  });
};

module.exports = uploadToCloud;

function extractPublicId(url) {
  const parts = url.split("/");
  const fileName = parts.pop();
  const publicId = fileName.split(".")[0];
  return publicId;
}

const deleteFile = (url) => {
  const publicId = extractPublicId(url);
  cloud.uploader.destroy(publicId, function (error, result) {
    if (error) {
      console.error("Error deleting file:", error);
    } else {
      console.log("File deleted successfully:", result);
    }
  });
};

module.exports = deleteFile;
