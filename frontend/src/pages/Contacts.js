import React, { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import "../styles/Contacts.css"; // Create and style this CSS file
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Contacts = () => {
    const {leadId} = useParams();
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    const [editContact, setEditContact] = useState(null);

    // Fetch contacts for a specific leadId
    const fetchContacts = useCallback(async () => {
        try {
            const response = await api.get(`/contact/${leadId}`);
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    },[leadId]);

    // Add a new contact
    const handleAddContact = async () => {
        try {
            const response = await api.post("/contact", { leadId, ...newContact });
            setContacts([...contacts, response.data]);
            setNewContact({ name: "", role: "", phone: "", email: "" });
            fetchContacts();
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    // Update an existing contact
    const handleUpdateContact = async () => {
        try {
            const response = await api.put(`/contact/${editContact.id}`, editContact);
            setContacts(contacts.map((contact) => (contact.id === editContact.id ? response.data : contact)));
            setEditContact(null);
            fetchContacts();
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    // Delete a contact
    const handleDeleteContact = async (id) => {
        try {
            await api.delete(`/contact/${id}`);
            setContacts(contacts.filter((contact) => contact.id !== id));
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    useEffect(() => {
        if (leadId) fetchContacts();
    }, [leadId,fetchContacts]);

    return (
        <div className="contacts-container">
            <h1>Contacts for Lead #{leadId}</h1>
            <div className="contact-list">
                {contacts.map((contact) => (
                    <div key={contact.id} className="contact-card">
                        <p><strong>Name:</strong> {contact.name}</p>
                        <p><strong>Role:</strong> {contact.role}</p>
                        <p><strong>Phone:</strong> {contact.phone}</p>
                        <p><strong>Email:</strong> {contact.email}</p>
                        <button onClick={() => setEditContact(contact)}>Edit</button>
                        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                        <Button className="contact-link-button" component={Link} to={`/interaction/${leadId}`}>Interactions</Button>
                    </div>
                ))}
            </div>

            {editContact ? (
                <div className="edit-contact">
                    <h2>Edit Contact</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editContact.name}
                        onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={editContact.role || ""}
                        onChange={(e) => setEditContact({ ...editContact, role: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={editContact.phone || ""}
                        onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={editContact.email || ""}
                        onChange={(e) => setEditContact({ ...editContact, email: e.target.value })}
                    />
                    <button onClick={handleUpdateContact}>Save Changes</button>
                    <button onClick={() => setEditContact(null)}>Cancel</button>
                </div>
            ) : (
                <div className="add-contact">
                    <h2>Add Contact</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newContact.name}
                        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Role"
                        value={newContact.role}
                        onChange={(e) => setNewContact({ ...newContact, role: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone"
                        value={newContact.phone}
                        onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={newContact.email}
                        onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    />
                    <button onClick={handleAddContact}>Add Contact</button>
                </div>
            )}
        </div>
    );
};

export default Contacts;
