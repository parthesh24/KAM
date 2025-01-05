const sequelize = require('../config/db');
const { Lead, CallPlanning} = require('../models/associations');
const { Op } = require('sequelize');

const setCallFrequency = async (req ,res ) => {
    try {
        const { leadId, callFrequency } = req.body;

        // Validate input
        if (!leadId || callFrequency === undefined) {
            return res.status(400).json({ error: "Lead ID and call frequency are required." });
        }

        // Check if a record for this leadId already exists
        const existingRecord = await CallPlanning.findOne({ where: { leadId: leadId } });

        if (existingRecord) {
            // Update the existing record
            existingRecord.callFrequency = callFrequency;
            await existingRecord.save();

            return res.status(200).json({
                message: "Call frequency updated successfully",
                record: existingRecord,
            });
        } else {
            // Create a new record
            const newRecord = await CallPlanning.create({
                lead_id: leadId,
                call_frequency: callFrequency,
            });

            return res.status(201).json({
                message: "Call frequency set successfully",
                record: newRecord,
            });
        }
    } catch (error) {
        console.error("Error in setCallFrequency:", error);
        res.status(500).json({
            error: "Failed to set call frequency",
            details: error.message,
        });
    }
};

const getLeadsRequiringCalls = async (req,res) => {
    try{
        const today = new Date();
        const leads = await CallPlanning.findAll({
            where: {
                [Op.or]: [
                    { lastCallDate:null},
                    sequelize.where(
                    sequelize.fn('DATE_ADD', sequelize.col('CallPlanning.lastCallDate'), sequelize.literal('INTERVAL CallPlanning.callFrequency DAY')),
                    { [Op.lte]: today }
                    ),
                ],
            },
            include: [{model: Lead, as: 'Lead'}],
        });

        res.status(200).json(leads);
    } catch(err){
        res.status(500).json({error: 'Failed to fetch leads requiring calls', details: err.message});
    }
};

const updateLastCallDate = async (req,res) => {
    try {
        const { leadId } = req.params;
        const { lastCallDate } = req.body;

        const record = await CallPlanning.update({lastCallDate}, {where: {leadId }});
        if(record[0]){
            res.status(200).json({message: 'Last call date updated'});
        } else {
            res.status(404).json({error: 'Call planning record not found for this lead'});
        }
    } catch(err){
        res.status(500).json({error: 'Failed to update last call date', details:err.message});
    }
};

const getAllCallPlans = async (req,res) => {
    try{
        const result = await CallPlanning.findAll();
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({message: 'error occured ', err});
    }
}

module.exports = { getAllCallPlans ,setCallFrequency, getLeadsRequiringCalls, updateLastCallDate };