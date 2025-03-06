import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Participants = () => {
    const [details, setDetails] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);

    useEffect(() => {
        // Fetch participant details
        axios.get("/api/participants/me")
            .then((response) => {
                setDetails(response.data);
                console.log("Participant details:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching participant details:", error);
            });
    }, []);

    useEffect(() => {
        // Fetch available service providers for selected date
        axios.get(`/api/appointments/providers?date=${selectedDate.toISOString()}`)
            .then((response) => {
                setProviders(response.data);
                console.log("Available providers:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching providers:", error);
            });
    }, [selectedDate]);

    const bookAppointment = () => {
        if (!selectedProvider) {
            alert("Please select a service provider.");
            return;
        }

        axios.post("/api/appointments", {
            Participant_ID: details._id,
            ServiceProvider_ID: selectedProvider,
            Date: selectedDate,
            TimeSlot: "10:00 AM - 11:00 AM"
        }).then((response) => {
            alert("Appointment booked successfully!");
        }).catch((error) => {
            console.error("Failed to book appointment", error);
        });
    };

    return (
        <div>
            <h2>Welcome, {details?.First_Name || "Participant"}</h2>
            <h3>Select a date to book an appointment:</h3>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
            <h3>Available Service Providers:</h3>
            <ul>
                {providers.map((provider) => (
                    <li key={provider._id} onClick={() => setSelectedProvider(provider._id)}>
                        {provider.Provider_Name}
                    </li>
                ))}
            </ul>
            {selectedProvider && (
                <button onClick={bookAppointment}>Book Appointment</button>
            )}
        </div>
    );
};

export default Participants;
