const express = require('express');
const {
    addContact,
    getContactsByLead,
    updateContact,
    deleteContact,
} = require('../controllers/contactsController')
const router = express.Router();

router.post('/', addContact);
router.get('/:leadId', getContactsByLead);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
