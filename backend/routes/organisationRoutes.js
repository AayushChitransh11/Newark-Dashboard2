const express = require("express");
const { 
    getAllOrganisations, 
    getOrganisationWithPrograms, 
    createOrganisation, 
    deleteOrganisation 
} = require("../controllers/organisationController");

const router = express.Router();

router.get("/", getAllOrganisations);
router.get("/:organisationId", getOrganisationWithPrograms);
router.post("/", createOrganisation);
router.delete("/:organisationId", deleteOrganisation);

module.exports = router;
