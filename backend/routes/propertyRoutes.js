const multer = require("multer");
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createProperty,
  getAllProperties,
  getOwnerProperties,
  deleteProperty
} = require("../controllers/propertyController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Owner creates property
router.post("/", protect, upload.single("image"), createProperty);

// Renter sees all available properties
router.get("/", getAllProperties);

// Owner sees their properties
router.get("/owner", protect, getOwnerProperties);

// Owner deletes property
router.delete("/:id", protect, deleteProperty);

module.exports = router;
