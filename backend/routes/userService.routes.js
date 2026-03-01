const express = require("express");
const router = express.Router();

const {
  assignServiceToUser,
  getMyServices,
  getUserServiceById, 
} = require("../controllers/userService.controller");

const { protect } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

router.get("/my-services", protect, getMyServices);

router.get("/:id", protect, getUserServiceById); 

router.post("/assign", protect, isAdmin, assignServiceToUser);

module.exports = router;
