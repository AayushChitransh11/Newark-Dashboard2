const express = require("express");
const { getAllParticipants } = require("../controllers/participantController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", protect, authorize(["participant"]), getAllParticipants);

module.exports = router;
