const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Deal = require('../models/Deal');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// GET /api/deals
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};
        
        if (category) {
            query.category = category;
        }
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        const deals = await Deal.find(query).sort({ createdAt: -1 });
        res.json(deals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deals', error: error.message });
    }
});

// GET /api/deals/:id
router.get('/:id', async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        res.json(deal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching deal', error: error.message });
    }
});

// POST /api/deals
router.post('/', auth, async (req, res) => {
    try {
        const { title, price, description, category } = req.body;
        
        // Validate input
        if (!title || !price || !description || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const deal = new Deal({
            title,
            price,
            description,
            category,
            userId: req.userId
        });

        const newDeal = await deal.save();
        res.status(201).json(newDeal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/deals/:id
router.put('/:id', auth, async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (deal.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const updatedDeal = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedDeal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/deals/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const deal = await Deal.findById(req.params.id);
        
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }

        if (deal.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await deal.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting deal', error: error.message });
    }
});

module.exports = router; 