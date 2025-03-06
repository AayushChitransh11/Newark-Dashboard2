
const Appointment = require("../models/db").Appointment;
const Provider = require("../models/db").Provider;


const createAppointment = async (req, res) => {
    try {
        const { Participant_ID, ServiceProvider_ID, Date, TimeSlot } = req.body;
        const newAppointment = await Appointment.create({
            Participant_ID,
            ServiceProvider_ID,
            Date,
            TimeSlot
        });
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const getAvailableProviders = async (req, res) => {
    try {
        const { date } = req.query;
        const providers = await Provider.find({}); // Add availability filter if needed
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const updateAppointmentStatus = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { status } = req.body;
        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, { Status: status }, { new: true });
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { createAppointment, getAvailableProviders, updateAppointmentStatus };