const express = require("express");
const {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
  getAllProperties,
  expressInterest,
} = require("../controllers/propertyController");
const { varifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", varifyToken, createProperty);
router.get("/my-property", varifyToken, getMyProperties);
router.put("/update", varifyToken, updateProperty);
router.delete("/delet/:id", varifyToken, deleteProperty);
router.get("/all-property", getAllProperties);

module.exports = router;
