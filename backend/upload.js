const multer = require("multer");
const supabase = require('./supabase');

// Multer storage settings
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload file to Supabase Storage
const uploadToSupabase = async (bucket, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(file.originalname, file.buffer, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { publicURL } = supabase.storage.from(bucket).getPublicUrl(file.originalname);
  return publicURL;
};

// Middleware functions for different types of uploads
const uploadShopLogo = async (req, res, next) => {
  try {
    if (req.file) {
      req.file.publicUrl = await uploadToSupabase("shop-logos", req.file);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const uploadProductImage = async (req, res, next) => {
  try {
    if (req.files) {
      req.files.publicUrls = [];
      for (const file of req.files) {
        const publicUrl = await uploadToSupabase("product-images", file);
        req.files.publicUrls.push(publicUrl);
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const uploadUserAvatar = async (req, res, next) => {
  try {
    if (req.file) {
      req.file.publicUrl = await uploadToSupabase("user-avatars", req.file);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadShopLogo: [upload.single("logo"), uploadShopLogo],
  uploadProductImage: [upload.array("images"), uploadProductImage],
  uploadUserAvatar: [upload.single("avatar"), uploadUserAvatar],
};
