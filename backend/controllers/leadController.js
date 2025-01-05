const {Lead, CallPlanning, Performance} = require('../models/associations');
const sequelize = require('../config/db');

const getLeads = async (req , res ) => {
    try{
        const leads = await Lead.findAll();
        res.json(leads);
    } catch (err) {
        res.status(500).json({error:'Failed to fetch leads'});
    }
};

const addLead = async (req ,res) => {
        const transaction = await sequelize.transaction();
        try {
            const { name, restaurantName, address, contactNumber, status, assignedKAM } = req.body;
    
            // Create the lead
            const lead = await Lead.create({
                name,
                restaurantName,
                address,
                contactNumber,
                status,
                assignedKAM,
            }, { transaction });
    
            // Add related data to CallPlanning table
            await CallPlanning.create({
                leadId: lead.id,
                callFrequency: 7, // Default call frequency
            }, { transaction });
    
            // Add related data to Performance table
            await Performance.create({
                leadId: lead.id,
                total_orders: 0, // Default initial value
                Last_order_date: null,
            }, { transaction });
    
            // Commit the transaction
            await transaction.commit();
    
            res.status(201).json({ message: 'Lead and related data added successfully', lead });
        } catch (err) {
            // Rollback the transaction in case of an error
            await transaction.rollback();
            res.status(500).json({ error: 'Failed to add lead and related data', details: err.message });
        }    
};

const updateLead = async (req,res) => {
    try{
        const {id} = req.params;
        const updates = req.body;
        const result = await Lead.update(updates, {where: {id}});
        if(result[0]) res.json({message: 'Lead updated successfully'});
        else res.status(404).json({error: 'Lead not found.'});
    } catch(err){
        req.status(400).json({error: 'Failed to update lead'});
    }
};

const deleteLead = async (req,res) => {
    try{
        const {id} = req.params;
        const result = await Lead.destroy({where: {id}});
        if(result) res.json({message:'Lead deleted successfully'});
        else res.status(404).json({error: 'Lead not found'});
    } catch (err) {
        res.status(500).json({message: 'Failed to delete lead'});
    }
};

module.exports = {getLeads,addLead,updateLead,deleteLead};