import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/Interaction.css";

const Interaction = () => {
    const { leadId } = useParams(); // Extract the leadId from the URL
    const [interactions, setInteractions] = useState([]);
    const [newInteraction, setNewInteraction] = useState({
        type: "Call",
        notes: "",
        interaction_date: "",
        follow_up_required: false,
    });

    const fetchInteractions = useCallback(async () => {
        try {
            const response = await api.get(`/interaction/${leadId}`);
            setInteractions(response.data);
        } catch (error) {
            console.error("Error fetching interactions:", error);
        }
    }, [leadId]);

    const handleAddInteraction = async () => {
        try {
            const response = await api.post("/interaction", { leadId, ...newInteraction });
            setInteractions([...interactions, response.data]);
            setNewInteraction({ type: "Call", notes: "", interaction_date: "", follow_up_required: false });
            fetchInteractions();
        } catch (error) {
            console.error("Error adding interaction:", error);
        }
    };

    const handleDeleteInteraction = async (id) => {
        try {
            await api.delete(`/interaction/${id}`);
            setInteractions(interactions.filter((interaction) => interaction.id !== id));
        } catch (error) {
            console.error("Error deleting interaction:", error);
        }
    };

    useEffect(() => {
        if (leadId) fetchInteractions();
    }, [leadId, fetchInteractions]);

    return (
        <div className="interactions-container">
            <h1>Interactions for Lead #{leadId}</h1>

            {/* Interactions List */}
            <div className="interactions-list">
                {interactions.map((interaction) => (
                    <div key={interaction.id} className="interaction-card">
                        <p><strong>Type:</strong> {interaction.type}</p>
                        <p><strong>Notes:</strong> {interaction.notes || "No notes provided"}</p>
                        <p><strong>Date:</strong> {new Date(interaction.interaction_date).toLocaleDateString()}</p>
                        <p><strong>Follow-Up Required:</strong> {interaction.follow_up_required===true ? "Yes" : "No"}</p>
                        <button onClick={() => handleDeleteInteraction(interaction.id)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Add Interaction Form */}
            <div className="add-interaction">
                <h2>Add/Update Interaction</h2>
                <label>Type of Interaction</label>
                <select
                    name="type"
                    value={newInteraction.type}
                    onChange={(e) => setNewInteraction({ ...newInteraction, type: e.target.value })}
                >
                    <option value="Call">Call</option>
                    <option value="Order">Order</option>
                </select>
                <label>Notes</label>
                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={newInteraction.notes}
                    onChange={(e) => setNewInteraction({ ...newInteraction, notes: e.target.value })}
                ></textarea>
                <label>Interaction Date</label>
                <input
                    type="date"
                    name="interaction_date"
                    value={newInteraction.interaction_date}
                    onChange={(e) => setNewInteraction({ ...newInteraction, interaction_date: e.target.value })}
                    required
                />
                <div className="follow-up-container">
                <label htmlFor="followUpDropdown">Follow-Up Required?</label>
                <select
                    id="followUpDropdown"
                    name="follow_up_required"
                    value={newInteraction.follow_up_required ? "Yes" : "No"}
                    onChange={(e) =>
                    setNewInteraction({ ...newInteraction, follow_up_required: e.target.value})
                    }
                >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
                </select>
                </div>
                <button onClick={handleAddInteraction}>Add Interaction</button>
            </div>
        </div>
    );
};

export default Interaction;
