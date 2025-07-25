const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const hostController = require("../controllers/hostController");
const isAuth = require("../controllers/isAuth");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Default to uploads
    let folder = "blogs";

    // Conditionally change folder based on route or form field
    if (
      req.originalUrl.includes("/disease") ||
      file.fieldname === "diseaseImage"
    ) {
      folder = "disease";
    }
    if (
      req.originalUrl.includes("/technology") ||
      file.fieldname === "technologyImage"
    ) {
      folder = "technology";
    }

    cb(null, path.join(__dirname, `../public/${folder}`));
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fieldSize: 100 * 1024 * 1024, // 100 MB for text fields like `description`
    fileSize: 10 * 1024 * 1024,   // Optional: 10 MB max per image file
  },
});

router.get("/add-blog", isAuth, hostController.getAddBlog);
router.post(
  "/blog/addBlogs",
  upload.single("image"),
  hostController.postAddBlog
);

router.post("/blog/delete/:id", hostController.deleteBlog);
router.get("/blog/edit/:id", isAuth, hostController.getEditBlogs);
router.post(
  "/blog/update/:id",
  upload.single("image"),
  hostController.updateBlog
);

// ============ //
router.get("/add-disease", isAuth, hostController.getAddDisease);
router.post(
  "/disease/addDisease",
  upload.single("diseaseImage"),
  hostController.postAddDisease
);

router.post("/diseases/delete/:id", hostController.deleteDisease);
router.get("/diseases/edit/:id", isAuth, hostController.getEditDisease);
router.post(
  "/disease/update/:id",
  upload.single("diseaseImage"),
  hostController.updateDisease
);

// ===== Technology ======= //
router.get("/add-technology", isAuth, hostController.getAddTechnology);
router.post(
  "/technology/addTechnology",
  upload.single("technologyImage"),
  hostController.postAddTechnology
);

// =====
router.post("/technology/delete/:id", hostController.deleteTechnology);
// =====
router.get("/technology/edit/:id", isAuth, hostController.getEditTechnology);
// =====
router.post(
  "/technology/update/:id",
  upload.single("technologyImage"),
  hostController.updateTechnology
);

// =====
router.get("/contacts", isAuth, hostController.getAllContacts);
router.post("/contacts/delete/:id", hostController.deleteContact);

module.exports = router;
