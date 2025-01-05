const {Performance,Interaction} = require('../models/associations');
const { Op } = require('sequelize');

// Get performance metrics for all accounts
const getPerformanceMetrics = async (req, res) => {
    try {
        const metrics = await Performance.findAll();
        res.status(200).json(metrics);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch performance metrics', details: err.message });
    }
};

// Track well-performing accounts (accounts with high total orders)
const getWellPerformingAccounts = async (req, res) => {
    try {
        const threshold = req.query.threshold || 10; // Default threshold for "well-performing"
        const accounts = await Performance.findAll({
            where: {
                total_orders: {
                    [Op.gte]: threshold, // Total orders greater than or equal to the threshold
                },
            },
        });
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch well-performing accounts', details: err.message });
    }
};

// Identify underperforming accounts (accounts with low ordering frequency)
const getUnderperformingAccounts = async (req, res) => {
    try {
        const threshold = req.query.threshold || 3; // Default threshold for "underperforming"
        const accounts = await Performance.findAll({
            where: {
                total_orders: {
                    [Op.lte]: threshold, // Total orders less than the threshold
                },
            },
        });
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch underperforming accounts', details: err.message });
    }
};

// Monitor ordering patterns by fetching all order interactions
const getOrderingPatterns = async (req, res) => {
    try {
        const patterns = await Interaction.findAll({
            where: { type: 'Order' }, // Fetch only order interactions
            attributes: ['leadId', 'interaction_date', 'notes'], // Include relevant fields
            order: [['interaction_date', 'DESC']], // Order by date descending
        });

        res.status(200).json(patterns);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch ordering patterns', details: err.message });
    }
};


// Update performance metrics for a lead
const updatePerformanceMetrics = async (req, res) => {
    try {
        const { leadId } = req.params;
        const updates = req.body;
        console.log("req ",leadId);
        const [updated] = await Performance.update(updates, { where: { leadId } });
        console.log("updated ",updated);

        if (updated) {
            const updatedMetrics = await Performance.findOne({ where: { leadId } });
            res.status(200).json({ message: 'Performance metrics updated successfully', updatedMetrics });
        } else {
            res.status(404).json({ error: 'Performance record not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to update performance metrics', details: err.message });
    }
};

module.exports = {
    getPerformanceMetrics,
    getWellPerformingAccounts,
    getUnderperformingAccounts,
    getOrderingPatterns,
    updatePerformanceMetrics,
};
