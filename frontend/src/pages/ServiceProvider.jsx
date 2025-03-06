import React, { useState, useEffect } from "react";
import axios from "axios";

const ServiceProvider = () => {
    const [appointments, setAppointments] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        axios.get("/api/appointments").then((response) => {
            setAppointments(response.data);
        });
    }, []);

    const updateStatus = (appointmentId, newStatus) => {
        axios.patch(`/api/appointments/${appointmentId}`, { status: newStatus })
            .then(() => {
                alert("Status updated!");
                setStatus("");
            })
            .catch((error) => {
                console.error("Failed to update status", error);
            });
    };

    return (
        <div>
            <h2>Service Provider Dashboard</h2>
            <h3>Appointments:</h3>
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment._id}>
                        {appointment.Participant_ID?.First_Name} - {appointment.TimeSlot}
                        <select onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option value="">Select Status</option>
                            <option value="Approved">Approve</option>
                            <option value="Reschedule">Reschedule</option>
                        </select>
                        <button onClick={() => updateStatus(appointment._id, status)}>
                            Update Status
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceProvider;
