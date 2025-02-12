const Organisation = require("../models/db").Organisation;

// Get all organisations
const getAllOrganisations = async (req, res) => {
    try {
        const organisations = await Organisation.find();
        res.json(organisations);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Create a new organisation
const createOrganisation = async (req, res) => {
    try {
        const newOrg = new Organisation(req.body);
        await newOrg.save();
        res.status(201).json(newOrg);
    } catch (error) {
        res.status(400).json({ message: "Error creating organisation", error });
    }
};

module.exports = { getAllOrganisations, createOrganisation };
