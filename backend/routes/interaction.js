const express = require('express');
const {
    addInteraction,
    getInteractionsByLead,
    deleteInteraction,
} = require('../controllers/interactionController');
const router = express.Router();

router.post('/', addInteraction);
router.get('/:leadId', getInteractionsByLead);
router.delete('/:id', deleteInteraction);

module.exports = router;
