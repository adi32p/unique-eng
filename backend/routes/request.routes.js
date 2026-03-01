const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequestStatus,
} = require("../controllers/request.controller");

const { protect } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");

/* Public */
router.post("/",protect , createRequest);

/* Admin */
router.get("/", protect, isAdmin, getRequests);
router.get("/:id", protect, isAdmin, getRequestById);
router.put("/:id/status", protect, isAdmin, updateRequestStatus);

module.exports = router;
