const express = require('express');
const router = express.Router();
const { getAllCallPlans,setCallFrequency,updateLastCallDate,getLeadsRequiringCalls } = require('../controllers/callplanningController');

router.post('/set-frequency', setCallFrequency);
router.get('/due-today', getLeadsRequiringCalls);
router.put('/update-last-call/:leadId', updateLastCallDate);
router.get('/get-all', getAllCallPlans);

module.exports = router;