const express = require("express");
const router = express.Router();

const {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require("../controllers/news.controller");

const { protect } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

/* Public */
router.get("/", getNews);
router.get("/:id", getNewsById);

/* Admin */
router.post("/", protect, isAdmin, createNews);
router.put("/:id", protect, isAdmin, updateNews);
router.delete("/:id", protect, isAdmin, deleteNews);

module.exports = router;
