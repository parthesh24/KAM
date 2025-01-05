import React, { useState, useEffect } from "react";
import api from "../services/api";
// import { Navigate } from "react-router-dom";
import '../styles/lead.css'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const Lead = () => {
    const [leads, setLeads] = useState([]);
    const [newLead, setNewLead] = useState({ 
        name: "",
        restaurantName: "",
        address: "",
        contactNumber: "",
        status: "New",
        callFrequency: 7,
        lastCallDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        kam_id: undefined,
    });
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [editLead, setEditLead] = useState(null); // The lead to be edited

    // Fetch Leads
    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = await api.get("/lead");
            setLeads(response.data);
        } catch (error) {
            console.error("Error fetching leads:", error);
        } finally {
            setLoading(false);
        }
    };

    // Add a New Lead
    const addLead = async () => {
        try {
            const response = await api.post("/lead", newLead);
            setLeads([...leads, response.data]); // Append the new lead to the list
            setNewLead({ 
                name: "",
                restaurantName: "",
                address: "",
                contactNumber: "",
                status: "New",
                callFrequency: 7,
                lastCallDate: null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                kam_id: 1,
            });
        } catch (error) {
            console.error("Error adding lead:", error);
        }
    };

    // Update a Lead
    const handleUpdate = async () => {
        if (!editLead) return;
        try {
            const response = await api.put(`/lead/${editLead.id}`, editLead);
            setLeads(leads.map((lead) => (lead.id === editLead.id ? response.data : lead)));
            setEditLead(null); // Close the edit modal/form
            fetchLeads();
        } catch (error) {
            console.error("Error updating lead:", error);
        }
    };

    // Delete a Lead
    const deleteLead = async (id) => {
        try {
            await api.delete(`/lead/${id}`);
            setLeads(leads.filter((lead) => lead.id !== id));
        } catch (error) {
            console.error("Error deleting lead:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLead({ ...newLead, [name]: value|| undefined, });
    };

    // Load leads when the component mounts
    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (!token) {
            setIsLoggedIn(false);
            // navigate("/login"); // Redirect to login page
        } else {
            setIsLoggedIn(true);
            fetchLeads();
        }
    }, []);

    if (!isLoggedIn) {
        return (
            <div>
                <h3>
                    <center>You need to log in first!</center>
                </h3>
                {/* <button onClick={() => navigate("/login")}>Go to Login</button> */}
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Leads Manager</h1>

            {/* Add New Lead */}
            <div>
                <h2>Add New Lead</h2>
                <form onSubmit={addLead}>
                <input type="text" name="name" placeholder="Name" value={newLead.name} onChange={handleChange} required />
                <input type="text" name="restaurantName" placeholder="Restaurant Name" value={newLead.restaurantName} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Address" value={newLead.address} onChange={handleChange} />
                <input type="text" name="contactNumber" placeholder="Contact Number" value={newLead.contactNumber} onChange={handleChange} />
                <select name="status" value={newLead.status} onChange={handleChange}>
                    <option value="New">New</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <input type="number" name="callFrequency" placeholder="Call Frequency (days)" value={newLead.callFrequency} onChange={handleChange} />
                <input type="date" name="lastCallDate" placeholder="Last Call Date" value={newLead.lastCallDate} onChange={handleChange} />
                <input type="number" name="AssignedKAM" placeholder="Assigned KAM" value={newLead.kam_id} onChange={handleChange} />
                <button type="submit">Add Lead</button>
            </form>
            </div>

            {/* Leads List */}
            <hr />
            <div>
            <h2>Leads</h2>
            {loading ? (
                <p>Loading leads...</p>
            ) : (
                <ul>
                    {leads.map((lead) => (
                        <li key={lead.id}>
                            <p>Name: {lead.name}</p>
                            <p>Restaurant: {lead.restaurantName}</p>
                            <p>Address: {lead.address}</p>
                            <p>Contact: {lead.contactNumber}</p>
                            <p>Status: {lead.status}</p>
                            <p>Call Frequency: {lead.callFrequency} days</p>
                            <p>Last Call Date: {lead.lastCallDate || "Not set"}</p>
                            <p>Created At: {new Date(lead.createdAt).toLocaleString()}</p>
                            <p>Updated At: {new Date(lead.updatedAt).toLocaleString()}</p>
                            <Button className="contact-link-button" component={Link} to={`/contact/${lead.id}`}>Contacts</Button>
                            <button onClick={() => setEditLead(lead)}>Update</button>
                            <button onClick={() => deleteLead(lead.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            </div>

            {/* Edit Lead Form */}
            {editLead && (
                <div className="edit-lead-container">
                    <h2>Edit Lead</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editLead.name}
                        onChange={(e) => setEditLead({ ...editLead, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Restaurant Name"
                        value={editLead.restaurantName}
                        onChange={(e) => setEditLead({ ...editLead, restaurantName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={editLead.address}
                        onChange={(e) => setEditLead({ ...editLead, address: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={editLead.contactNumber}
                        onChange={(e) => setEditLead({ ...editLead, contactNumber: e.target.value })}
                    />
                    <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={() => setEditLead(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

// export default Lead;
