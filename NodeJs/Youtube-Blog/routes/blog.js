const { Router } = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const router = Router();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Cloudinary storage (replaces diskStorage)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog-covers",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (JPEG, PNG, WebP, GIF)"));
    }
  },
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
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File size too large. Max size is 10MB");
    }
    if (error.message?.includes("Only image files")) {
      return res.status(400).send(error.message);
    }
    return res.status(500).send("Error creating blog: " + error.message);
  }
});

// Multer error handler
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).send("File is too large. Maximum size is 10MB");
    }
  }
  if (error) {
    return res.status(400).send(error.message || "File upload failed");
  }
  next();
});

module.exports = router;