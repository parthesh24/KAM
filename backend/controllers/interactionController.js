const {Interaction} = require('../models/associations');

// Add a new interaction
const addInteraction = async (req, res) => {
    try {
        const { leadId, type, notes, interaction_date, followUpRequired } = req.body;
        if (!leadId || !type || !interaction_date) {
            return res.status(400).json({ error: 'Lead ID, type, and interaction date are required' });
        }

        const interaction = await Interaction.create({
            leadId,
            type,
            notes,
            interaction_date,
            followUpRequired,
        });

        res.status(201).json({ message: 'Interaction added successfully', interaction });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add interaction', details: err.message });
    }
};

// Get all interactions for a specific lead
const getInteractionsByLead = async (req, res) => {
    try {
        const { leadId } = req.params;
        const { type } = req.query; // Optional query parameter

        const condition = { leadId };
        if (type) condition.type = type;

        const interactions = await Interaction.findAll({ where: condition });

        if (interactions.length === 0) {
            return res.status(404).json({ message: 'No interactions found for this lead' });
        }

        res.status(200).json(interactions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch interactions', details: err.message });
    }
};


// Delete an interaction
const deleteInteraction = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Interaction.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ message: 'Interaction deleted successfully' });
        } else {
            res.status(404).json({ error: 'Interaction not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete interaction', details: err.message });
    }
};

module.exports = { addInteraction, getInteractionsByLead, deleteInteraction };
