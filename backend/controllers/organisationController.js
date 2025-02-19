const Organisation = require("../models/db").Organisation;

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

module.exports = { getAllOrganisations, createOrganisation };
