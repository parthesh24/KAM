const express = require('express');
const {
    getPerformanceMetrics,
    getWellPerformingAccounts,
    getUnderperformingAccounts,
    getOrderingPatterns,
    updatePerformanceMetrics,
} = require('../controllers/performanceController');
const router = express.Router();

router.get('/', getPerformanceMetrics);
router.get('/well-performing', getWellPerformingAccounts);
router.get('/underperforming', getUnderperformingAccounts);
router.get('/ordering-patterns', getOrderingPatterns);
router.put('/update/:leadId', updatePerformanceMetrics);

module.exports = router;
