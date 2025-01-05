const KAM = require('../models/KAM');
const bcrypt = require('bcrypt');

const getKAMs = async (req , res) => {
    try{
        const kams = await KAM.findAll({
            attributes: ['id', 'name', 'email']
    });
        res.json(kams);
    }
    catch(err){
        res.status(500).json({message: 'Failed to fetch KAMs'});
    }
};

const addKAM = async (req,res) => {
    try{
        const {name, email, phone, psw } = req.body;
        const password = await bcrypt.hash(psw, 10);
        console.log("here",password);
        const kam = await KAM.create({name,email,password,phone});
        res.status(201).json(kam);
    } catch (err) {
        res.status(400).json({ error: err });
    }
};

const updateKAM = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const result = await KAM.update(updates, { where: { id } });
        if (result[0]) res.json({ message: 'KAM updated successfully' });
        else res.status(404).json({ error: 'KAM not found' });
    } catch (err) {
        res.status(400).json({ error: 'Failed to update KAM' });
    }
};

const deleteKAM = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await KAM.destroy({ where: { id } });
        if (result) res.json({ message: 'KAM deleted successfully' });
        else res.status(404).json({ error: 'KAM not found' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete KAM' });
    }
};

module.exports = { getKAMs, addKAM, updateKAM, deleteKAM };