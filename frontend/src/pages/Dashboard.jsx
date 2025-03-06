import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Ensure this contains updated styles
import TableauViz from './TableauViz';


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
                <h3>Crime Data Visualization</h3>
                {/* <iframe
                    src="https://public.tableau.com/views/NewarkCrimeGraphs/Sheet2?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
                    width="100%"
                    height="600px"
                    style={{ border: "none" }}
                    title="Crime Data Visualization"
                ></iframe> */}
                 {/* <div class='tableauPlaceholder' id='viz1741192652598' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ne&#47;NewarkCrimeGraphs&#47;Sheet2&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='site_root' value='' /><param name='name' value='NewarkCrimeGraphs&#47;Sheet2' /><param name='tabs' value='yes' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Ne&#47;NewarkCrimeGraphs&#47;Sheet2&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='en-US' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1741192652598');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>

                 */}
                  <div style={{width: '800px', height:'450px'}}>
                    
                    <TableauViz/>
                    </div>

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
