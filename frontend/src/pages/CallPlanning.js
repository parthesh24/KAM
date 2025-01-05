import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api"; // Axios configuration
import "../styles/CallPlanning.css"; // Create and style this CSS file

const CallPlanning = () => {
    const [callPlans, setCallPlans] = useState([]);
    const [leadsDueToday, setLeadsDueToday] = useState([]);
    const [callFrequencyData, setCallFrequencyData] = useState({ 
        leadId: "", 
        callFrequency: 7,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    const [lastCallDateData, setLastCallDateData] = useState({ 
        leadId: "", 
        lastCallDate: "",
        updatedAt: new Date().toISOString()
     });

    // Fetch all call plans
    const fetchAllCallPlans = useCallback(async () => {
        try {
            const response = await api.get("/callplanning/get-all");
            setCallPlans(response.data);
        } catch (error) {
            console.error("Error fetching call plans:", error);
        }
    },[]);

    // Fetch leads requiring calls today
    const fetchLeadsDueToday = useCallback(async () => {
        try {
            const response = await api.get("/callplanning/due-today");
            setLeadsDueToday(response.data);
        } catch (error) {
            console.error("Error fetching leads due today:", error);
        }
    },[]);

    // Set call frequency for a lead
    const handleSetCallFrequency = async () => {
        try {
            await api.post("/callplanning/set-frequency", callFrequencyData);
            alert("Call frequency updated successfully!");
            setCallFrequencyData({ leadId: "", callFrequency: 7 });
            fetchAllCallPlans(); // Refresh the list
        } catch (error) {
            console.error("Error setting call frequency:", error);
        }
    };

    // Update last call date for a lead
    const handleUpdateLastCallDate = async () => {
        try {
            await api.put(`/callplanning/update-last-call/${lastCallDateData.leadId}`, {
                lastCallDate: lastCallDateData.lastCallDate,
            });
            alert("Last call date updated successfully!");
            setLastCallDateData({ leadId: "", lastCallDate: "" });
            fetchAllCallPlans(); // Refresh the list
        } catch (error) {
            console.error("Error updating last call date:", error);
        }
    };

    useEffect(() => {
        fetchAllCallPlans();
        fetchLeadsDueToday();
    }, [fetchAllCallPlans, fetchLeadsDueToday]);

    return (
        <div className="call-planning-container">
            <h1>Call Planning</h1>

            {/* Section: Set Call Frequency */}
            <div className="section">
                <h2>Set Call Frequency</h2>
                <input
                    type="number"
                    placeholder="Lead ID"
                    value={callFrequencyData.leadId}
                    onChange={(e) =>
                        setCallFrequencyData({ ...callFrequencyData, leadId: e.target.value })
                    }
                />
                <input
                    type="number"
                    placeholder="Call Frequency (days)"
                    value={callFrequencyData.callFrequency}
                    onChange={(e) =>
                        setCallFrequencyData({ ...callFrequencyData, callFrequency: e.target.value })
                    }
                />
                <button onClick={handleSetCallFrequency}>Set Frequency</button>
            </div>

            {/* Section: Update Last Call Date */}
            <div className="section">
                <h2>Update Last Call Date</h2>
                <input
                    type="number"
                    placeholder="Lead ID"
                    value={lastCallDateData.leadId}
                    onChange={(e) =>
                        setLastCallDateData({ ...lastCallDateData, leadId: e.target.value })
                    }
                />
                <input
                    type="date"
                    placeholder="Last Call Date"
                    value={lastCallDateData.lastCallDate}
                    onChange={(e) =>
                        setLastCallDateData({ ...lastCallDateData, lastCallDate: e.target.value })
                    }
                />
                <button onClick={handleUpdateLastCallDate}>Update Last Call</button>
            </div>

            {/* Section: Leads Requiring Calls Today */}
            <div className="section">
                <h2>Leads Requiring Calls Today</h2>
                {leadsDueToday.length > 0 ? (
                    <ul>
                        {leadsDueToday.map((lead) => (
                            <li key={lead.id}>
                                Lead ID: {lead.id}, Name: {lead.name}, Last Call Date:{" "}
                                {lead.lastCallDate || "N/A"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No leads requiring calls today.</p>
                )}
            </div>

            {/* Section: All Call Plans */}
            <div className="section">
                <h2>All Call Plans</h2>
                {callPlans.length > 0 ? (
                    <ul>
                        {callPlans.map((plan) => (
                            <li key={plan.id}>
                                Lead ID: {plan.leadId}, Call Frequency: {plan.callFrequency} days,
                                Last Call Date: {plan.lastCallDate || "N/A"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No call plans available.</p>
                )}
            </div>
        </div>
    );
};

export default CallPlanning;
