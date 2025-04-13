const express = require('express');
const router = express.Router();
const { createDeal, getDeals, voteDeal } = require('../controllers/index');

// Route to post a new deal
router.post('/deals', createDeal);

// Route to get all deals
router.get('/deals', getDeals);

// Route to vote on a deal
router.post('/deals/:id/vote', voteDeal);

module.exports = router;