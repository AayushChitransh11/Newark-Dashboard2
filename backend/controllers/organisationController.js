const Organisation = require("../models/db").Organisation;

// Get all organisations
const getAllOrganisations = async (req, res) => {
    try {
        const organisations = await Organisation.find({});
        if (!organisations.length) {
            return res.status(404).json({ message: "No organisations found" });
        }
        res.status(200).json(organisations);
    } catch (error) {
        console.error("Error fetching organisations:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Get an organisation with programs
const getOrganisationWithPrograms = async (req, res) => {
    try {
        const { organisationId } = req.params;
        const organisation = await Organisation.findById(organisationId).populate("programs");
        if (!organisation) {
            return res.status(404).json({ message: "Organisation not found" });
        }
        res.json(organisation);
    } catch (error) {
        console.error("Error fetching organisation:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Create a new organisation
const createOrganisation = async (req, res) => {
    try {
        const { Name, Contact, Org_Description, Org_Address } = req.body;
        if (!Name || !Org_Description) {
            return res.status(400).json({ message: "Name and Description are required" });
        }
        const newOrg = new Organisation({
            Name,
            Contact,
            Org_Description,
            Org_Address
        });
        await newOrg.save();
        res.status(201).json(newOrg);
    } catch (error) {
        console.error("Error creating organisation:", error);
        res.status(400).json({ message: "Error creating organisation", error });
    }
};

// Delete an organisation
const deleteOrganisation = async (req, res) => {
    try {
        const { organisationId } = req.params;
        await Organisation.findByIdAndDelete(organisationId);
        res.json({ message: "Organisation deleted successfully" });
    } catch (error) {
        console.error("Error deleting organisation:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Export all controller functions
module.exports = { 
    getAllOrganisations, 
    getOrganisationWithPrograms, 
    createOrganisation, 
    deleteOrganisation 
};
