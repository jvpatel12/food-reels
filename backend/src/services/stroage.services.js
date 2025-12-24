// imagekit.js
const ImageKit = require("imagekit");
require('dotenv').config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(file, fileName) {
  try {
    // Upload file to ImageKit
    const result = await imagekit.upload({
      file: file, // Buffer or file stream
      fileName: fileName,
      folder: "/foodreels/videos",
      useUniqueFileName: true,
    });

    console.log("✅ Upload successful:", result);
    return result;
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

// Keep old function name for backward compatibility
async function uplodImage(file, fileName) {
  return uploadImage(file, fileName);
}

module.exports = { uploadImage, uplodImage, ImageKit };
