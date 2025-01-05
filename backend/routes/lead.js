const express = require('express');
const { getLeads, addLead, updateLead, deleteLead } = require('../controllers/leadController');
const router = express.Router();

router.get('/', getLeads);
router.post('/',addLead);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
