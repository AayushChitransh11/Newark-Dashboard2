import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure this contains updated styles

const Dashboard = () => {
    const [organisations, setOrganisations] = useState([]);
    const [selectedOrgs, setSelectedOrgs] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [selectedPrograms, setSelectedPrograms] = useState([]);
    const [programDetails, setProgramDetails] = useState([]);
    
    const navigate = useNavigate();

    // ✅ Fetch Organisations on Page Load
    useEffect(() => {
        const fetchOrganisations = async () => {
            const token = localStorage.getItem("token"); // Get token

            if (!token) {
                console.error("No token found. Redirecting to login...");
                navigate("/login"); // Redirect to login if no token
                return;
            }

            try {
                const response = await axios.get("http://localhost:5001/api/organisation", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrganisations(response.data);
            } catch (error) {
                console.error("Error fetching organisations:", error);
            }
        };

        fetchOrganisations();
    }, [navigate]);

    // ✅ Fetch Programs when an Organisation is Selected
    useEffect(() => {
        const fetchPrograms = async () => {
            if (selectedOrgs.length === 0) {
                setPrograms([]);
                setSelectedPrograms([]);
                setProgramDetails([]);
                return;
            }

            const token = localStorage.getItem("token");
            try {
                const promises = selectedOrgs.map(orgId =>
                    axios.get(`http://localhost:5001/api/organisation/${orgId}/programs`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );

                const responses = await Promise.all(promises);
                const allPrograms = responses.flatMap(res => res.data);
                setPrograms(allPrograms);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        fetchPrograms();
    }, [selectedOrgs]);

    // ✅ Handle Organisation Selection (Checkbox)
    const handleOrgSelection = (orgId) => {
        setSelectedOrgs(prev =>
            prev.includes(orgId) ? prev.filter(id => id !== orgId) : [...prev, orgId]
        );
    };

    // ✅ Handle Program Selection (Checkbox)
    const handleProgramSelection = (program) => {
        setSelectedPrograms(prev =>
            prev.includes(program._id)
                ? prev.filter(id => id !== program._id)
                : [...prev, program._id]
        );

        setProgramDetails(prev =>
            prev.some(p => p._id === program._id)
                ? prev.filter(p => p._id !== program._id)
                : [...prev, program]
        );
    };

    return (
        <div className="dashboard-container">
            {/* Left Sidebar: Organisation & Program Filters */}
            <div className="sidebar">
                <h2 className="sidebar-title">Filter by Organisation</h2>
                <div className="filter-box">
                    <ul className="filter-list">
                        {organisations.length > 0 ? (
                            organisations.map(org => (
                                <li key={org._id} className="filter-item">
                                    <label className="filter-label">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrgs.includes(org._id)}
                                            onChange={() => handleOrgSelection(org._id)}
                                            className="checkbox-input"
                                        />
                                        <span>{org.Name}</span>
                                    </label>
                                </li>
                            ))
                        ) : (
                            <p className="no-data-message">No organisations found.</p>
                        )}
                    </ul>
                </div>

                {/* Program Filter - Appears Only When Organisation is Selected */}
                {selectedOrgs.length > 0 && (
                    <div className="program-section">
                        <h2 className="sidebar-title">Programs</h2>
                        <div className="filter-box">
                            <ul className="filter-list">
                                {programs.length > 0 ? (
                                    programs.map(program => (
                                        <li key={program._id} className="filter-item">
                                            <label className="filter-label">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPrograms.includes(program._id)}
                                                    onChange={() => handleProgramSelection(program)}
                                                    className="checkbox-input"
                                                />
                                                <span>{program.Program_Name}</span>
                                            </label>
                                        </li>
                                    ))
                                ) : (
                                    <p className="no-data-message">No programs available.</p>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side: Program Details */}
            <div className="content">
                <h1 className="dashboard-title">Dashboard Overview</h1>
                {programDetails.length > 0 ? (
                    <div className="program-details-container">
                        {programDetails.map(program => (
                            <div key={program._id} className="program-card">
                                <h2 className="program-title">{program.Program_Name}</h2>
                                <p className="program-description">{program.Program_Description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="select-message">Select an organisation and a program to view details.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
