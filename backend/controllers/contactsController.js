const {Contacts} = require('../models/associations');

// Add a new contact
const addContact = async (req, res) => {
    try {
        const { leadId, name, role, phone, email } = req.body;
        if (!leadId || !name || !role || !phone || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = await Contacts.create({ leadId, name, role, phone, email });
        res.status(201).json({ message: 'Contact added successfully', contact });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add contact', details: err.message });
    }
};

// Get all contacts for a specific lead
const getContactsByLead = async (req, res) => {
    try {
        const { leadId } = req.params;

        if (!leadId) {
            return res.status(400).json({ error: 'Lead ID is required' });
        }

        const contacts = await Contacts.findAll({ where: { leadId } });
        if (contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts found for this lead' });
        }

        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch contacts', details: err.message });
    }
};

// Update a specific contact
const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const [updated] = await Contacts.update(updates, { where: { id } });

        if (updated) {
            const updatedContact = await Contacts.findByPk(id);
            res.status(200).json({ message: 'Contact updated successfully', updatedContact });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update contact', details: err.message });
    }
};

// Delete a specific contact
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Contacts.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ error: 'Contact not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete contact', details: err.message });
    }
};

module.exports = { addContact, getContactsByLead, updateContact, deleteContact };
