const express = require("express");

const { createAppointment, getAvailableProviders, updateAppointmentStatus } = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, authorize(["participant"]), createAppointment);
router.get("/providers", protect, getAvailableProviders);
router.patch("/:appointmentId", protect, authorize(["serviceprovider"]), updateAppointmentStatus);

module.exports = router;