const { Router } = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const path = require("path");

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Magic bytes for image file signature verification
const MAGIC_BYTES = {
  "image/jpeg": [0xFF, 0xD8, 0xFF],
  "image/png": [0x89, 0x50, 0x4E, 0x47],
  "image/gif": [0x47, 0x49, 0x46],
  "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF header for WebP
};

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-covers",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

// File validation function
const validateImageFile = (req, file, cb) => {
  // 1. Check MIME type
  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    console.warn(`[SECURITY] Invalid MIME type: ${file.mimetype} for file: ${file.originalname}`);
    return cb(new Error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed"));
  }

  // 2. Check file extension
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
    console.warn(`[SECURITY] Invalid extension: ${fileExt} for file: ${file.originalname}`);
    return cb(new Error("Invalid file extension. Only .jpg, .jpeg, .png, .webp, and .gif are allowed"));
  }

  // 3. Verify magic bytes (file signature)
  const buffer = file.buffer || Buffer.alloc(0);
  const expectedBytes = MAGIC_BYTES[file.mimetype];
  if (buffer.length > 0 && expectedBytes) {
    const fileSignature = Array.from(buffer.slice(0, expectedBytes.length));
    const matches = fileSignature.every((byte, idx) => byte === expectedBytes[idx]);
    if (!matches) {
      console.warn(`[SECURITY] File signature mismatch for: ${file.originalname}`);
      return cb(new Error("File signature validation failed. File may be corrupted or not a valid image"));
    }
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: validateImageFile,
});

router.get("/add-new", (req, res) => {
  if (!req.user) {
    return res.redirect("/user/signin");
  }
  return res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
  return res.render("blog", { user: req.user, blog, comments });
});

router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
});

// Update Blogs
router.get("/edit/:id", async (req, res) => {
  if(!req.user) return res.redirect("/user/signin");

  const blog = await Blog.findById(req.params.id);

  if(!blog || blog.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  return res.render("editBlog", {user: req.user, blog});
});

// POST - Handle update (title & body only)
router.post("/edit/:id", upload.single("coverImage"), async (req, res) => {
  try {
    if(!req.user) return res.status(401).send("Please signin");

    const blog = await Blog.findById(req.params.id);

    if(!blog || blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    const { title, body } = req.body;
    const updateData = { title, body };

    // If a new image was uploaded, delete old one from Cloudinary and update URL
    if (req.file) {
      // Extract public_id from old Cloudinary URL to delete it
      const oldPublicId = blog.coverImageURL
        .split("/")
        .slice(-2)
        .join("/")
        .split(".")[0]; // e.g. "blog-covers/filename"

      await cloudinary.uploader.destroy(oldPublicId);
      updateData.coverImageURL = req.file.path;
    }

    await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });

    return res.redirect(`/blog/${req.params.id}`);
  } catch (error) {
    console.error("Blog updated error:", error);
    return res.status(500).send("Error updating blog: " + error.message);
  }
});


// Delete Router
router.post("/delete/:id", async (req, res) => {
  try {
    if(!req.user) return res.status(401).send("Please Singin");

    const blog = await Blog.findById(req.params.id);

    if(!blog || blog.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).send("Unauthorized");
    }

    // Delete cover image from Cloudinary
    const publicId = blog.coverImageURL
      .split("/")
      .slice(-2)
      .join("/")
      .split(".")[0]; // e.g. "blog-covers/filename"

    await cloudinary.uploader.destroy(publicId);

    await Comment.deleteMany({ blogId: req.params.id});

    await Blog.findByIdAndDelete(req.params.id);

    return res.redirect("/");
  } catch (error) {
    console.error("Blog delete error:", error);
    return res.status(500).send("Error deleting blog: " + error.message);
  }
})


router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!req.user) {
      return res.status(401).send("Please login to create a blog");
    }
    if (!req.file) {
      return res.status(400).send("Cover image is required");
    }

    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: req.file.path, // ✅ Cloudinary full https:// URL
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Blog creation error:", error);
    // Security validation errors
    if (error.message?.includes("Invalid") || error.message?.includes("signature")) {
      console.warn(`[SECURITY] Upload rejected for user ${req.user._id}: ${error.message}`);
      return res.status(400).send(error.message);
    }
    return res.status(500).send("Error creating blog: " + error.message);
  }
});

// Multer error handler
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB`);
    }
  }
  if (error) {
    return res.status(400).send(error.message || "File upload failed");
  }
  next();
});

module.exports = router;