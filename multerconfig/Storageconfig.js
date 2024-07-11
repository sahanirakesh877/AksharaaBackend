const multer = require("multer");

// Set up Multer storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Define file filter function to allow only specific image types
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     // Accept file
//     cb(null, true);
//   } else {
//     // Reject file
//     cb(new Error('Only jpeg, png, jpg images are allowed'), false);
//   }
// };

// Define file filter function to allow only specific image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    // Accept file
    cb(null, true);
  } else {
    // Reject file with specific error
    cb(new Error("Only jpeg, png, jpg images are allowed"));
  }
};

// Initialize Multer with configured options
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
