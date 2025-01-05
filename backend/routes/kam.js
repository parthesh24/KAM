const express = require('express');
const { getKAMs, addKAM, updateKAM, deleteKAM } = require('../controllers/kamController');
const router = express.Router();

router.get('/', getKAMs);
router.post('/', addKAM);
router.put('/:id', updateKAM);
router.delete('/:id', deleteKAM);

module.exports = router;
