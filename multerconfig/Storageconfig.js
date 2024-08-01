const multer = require("multer");

// Set up Multer storage options for Blog images
const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blog");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer storage options for notice images
const noticeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/notices");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer storage options for 3d image rotation images
const ThreeDGalleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/ThreeDGallery");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer storage options for Heroimages
const heroStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/hero");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer storage options for Activities
const activityStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/activity");
  },
  filename: function (req, file, cb) {
    // Set filename for uploaded files
    const filename = `image-${Date.now()}.${file.originalname}`;
    cb(null, filename);
  },
});

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
const blogUpload = multer({
  storage: blogStorage,
  fileFilter: fileFilter,
});

const activityUpload = multer({
  storage: activityStorage,
  fileFilter: fileFilter,
});

const noticesUpload = multer({
  storage: noticeStorage,
  fileFilter: fileFilter,
});

const ThreeDGalleryUpload = multer({
  storage: ThreeDGalleryStorage,
  fileFilter: fileFilter,
});

const HeroUpload = multer({
  storage: heroStorage,
  fileFilter: fileFilter,
});

module.exports = {
  blogUpload,
  noticesUpload,
  ThreeDGalleryUpload,
  HeroUpload,
  activityUpload,
};
