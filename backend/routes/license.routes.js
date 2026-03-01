const express = require("express");
const router = express.Router();
const {
  createLicense,
  getLicenses,
  deleteLicense,
} = require("../controllers/license.controller");


const { protect } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

router.post("/", protect, isAdmin, createLicense);
router.get("/", protect, isAdmin, getLicenses);
router.delete("/:id", protect, isAdmin, deleteLicense);

module.exports = router;
