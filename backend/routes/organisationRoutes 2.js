const express = require("express");
const { getAllOrganisations, createOrganisation } = require("../controllers/organisationController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", protect, getAllOrganisations);


router.post("/", protect, authorize(["organisation"]), createOrganisation);

module.exports = router;
