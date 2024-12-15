import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure the upload directory exits or create it dynamically
const uploadDir = "./public/temp";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
}

// Configure Multer storage
const storage = multer.diskStorage({
  // Set the destination directory for upload files
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  // Define how filename should be saved to avoid overwriting files
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// File Filter for Validation
const filerFilter = (req, file, cd) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimtype)) {
    cb(null, true); // Accept the files if ti match the allowed types
  } else {
    cd(new Error("Only image files(JPEG, PNG, JPG, GIF) are allowed"), false);
  }
};

export const upload = multer({
  storage,
  filerFilter,
  limmits: {
    fileSize: 5 * 1024 * 1024, // Limit file size to 5 MB
  },
});
