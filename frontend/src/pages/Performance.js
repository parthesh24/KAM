import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api"; // Axios configuration
import "../styles/Performance.css"; // Create and style this CSS file

const Performance = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [wellPerforming, setWellPerforming] = useState([]);
    const [underPerforming, setUnderPerforming] = useState([]);
    const [orderingPatterns, setOrderingPatterns] = useState([]);
    const [Underthreshold, setUnderThreshold] = useState(3);
    const [Overthreshold, setOverThreshold] = useState(10);
    const [updateData, setUpdateData] = useState({ 
        leadId: "", 
        total_orders: 0, 
        last_order_date: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    // Fetch all performance metrics
    const fetchPerformanceMetrics = useCallback(async () => {
        try {
            const response = await api.get("/performance");
            setPerformanceData(response.data);
        } catch (error) {
            console.error("Error fetching performance metrics:", error);
        }
    },[]);

    // Fetch well-performing accounts
    const fetchWellPerformingAccounts = useCallback(async () => {
        try {
            const response = await api.get(`/performance/well-performing?threshold=${Overthreshold}`);
            setWellPerforming(response.data);
        } catch (error) {
            console.error("Error fetching well-performing accounts:", error);
        }
    },[Overthreshold]);

    // Fetch underperforming accounts
    const fetchUnderperformingAccounts = useCallback(async () => {
        try {
            const response = await api.get(`/performance/underperforming?threshold=${Underthreshold}`);
            setUnderPerforming(response.data);
        } catch (error) {
            console.error("Error fetching underperforming accounts:", error);
        }
    },[Underthreshold]);

    // Fetch ordering patterns
    const fetchOrderingPatterns = useCallback(async () => {
        try {
            const response = await api.get("/performance/ordering-patterns");
            setOrderingPatterns(response.data);
        } catch (error) {
            console.error("Error fetching ordering patterns:", error);
        }
    },[]);

    // Update performance metrics
    const handleUpdatePerformance = async () => {
        try {
            const response = await api.put(`/performance/update/${updateData.leadId}`, {
                total_orders: updateData.total_orders,
                last_order_date: updateData.last_order_date,
            });
            alert("Performance metrics updated successfully!");
            setUpdateData({ leadId: "", total_orders: 0, last_order_date: "" });
            fetchPerformanceMetrics(); // Refresh data
        } catch (error) {
            console.error("Error updating performance metrics:", error);
        }
    };

    useEffect(() => {

        fetchPerformanceMetrics();
        // fetchWellPerformingAccounts();
        // fetchUnderperformingAccounts();
        fetchOrderingPatterns();

    }, [fetchOrderingPatterns,
        fetchPerformanceMetrics,
        // fetchUnderperformingAccounts,
        // fetchWellPerformingAccounts,
        Underthreshold,
        Overthreshold
    ]);

    return (
        <div className="performance-container">
            <h1>Performance Metrics</h1>

            {/* Section: Update Performance */}
            <div className="section">
                <h2>Update Performance Metrics</h2>
                <input
                    type="number"
                    placeholder="Lead ID"
                    value={updateData.leadId}
                    onChange={(e) => setUpdateData({ ...updateData, leadId: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Total Orders"
                    value={updateData.total_orders}
                    onChange={(e) => setUpdateData({ ...updateData, total_orders: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Last Order Date"
                    value={updateData.last_order_date}
                    onChange={(e) => setUpdateData({ ...updateData, last_order_date: e.target.value })}
                />
                <button onClick={handleUpdatePerformance}>Update</button>
            </div>

            {/* Section: All Performance Metrics */}
            <div className="section">
                <h2>All Performance Metrics</h2>
                <ul>
                    {performanceData.map((data) => (
                        <li key={data.id}>
                            Lead ID: {data.leadId}, Total Orders: {data.total_orders}, Last Order Date:{" "}
                            {data.Last_order_date || "N/A"}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Section: Well-Performing Accounts */}
            <div className="section">
                <h2>Well-Performing Accounts</h2>
                {/* Threshold Selector */}
                <div className="section">
                <h2>Set Threshold</h2>
                <input
                    type="number"
                    value={Overthreshold}
                    onChange={(e) => setOverThreshold(Number(e.target.value))}
                    placeholder="Enter threshold"
                />
                <button onClick={fetchWellPerformingAccounts}>Fetch Accounts</button>
                </div>
                <ul>
                    {wellPerforming.map((data) => (
                        <li key={data.id}>
                            Lead ID: {data.leadId}, Total Orders: {data.total_orders}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Section: Underperforming Accounts */}
            <div className="section">
                <h2>Underperforming Accounts</h2>
                {/* Threshold Selector */}
                <div className="section">
                <h2>Set Threshold</h2>
                <input
                    type="number"
                    value={Underthreshold}
                    onChange={(e) => setUnderThreshold(Number(e.target.value))}
                    placeholder="Enter threshold"
                />
                <button onClick={fetchUnderperformingAccounts}>Fetch Accounts</button>
                </div>
                <ul>
                    {underPerforming.map((data) => (
                        <li key={data.id}>
                            Lead ID: {data.leadId}, Total Orders: {data.total_orders}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Section: Ordering Patterns */}
            <div className="section">
                <h2>Ordering Patterns</h2>
                <ul>
                    {orderingPatterns.map((data) => (
                        <li key={data.id}>
                            Lead ID: {data.leadId},  Last Order:{data.interaction_date}
                            {data.Last_order_date || "N/A"}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Performance;

