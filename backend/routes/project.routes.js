const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  deleteProject,
} = require("../controllers/project.controller");

const upload = require("../middleware/upload.middleware");
const { protect } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

/* Public */
router.get("/", getProjects);

/* Admin Only */
router.post(
  "/",
  protect,
  isAdmin,
  upload.single("image"), // VERY IMPORTANT
  createProject
);

router.delete(
  "/:id",
  protect,
  isAdmin,
  deleteProject
);

module.exports = router;
