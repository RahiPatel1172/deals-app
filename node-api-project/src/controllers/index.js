const Deal = require('../models/index').Deal;

exports.createDeal = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newDeal = new Deal({ title, description, votes: 0 });
        await newDeal.save();
        res.status(201).json(newDeal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating deal', error });
    }
};

exports.getDeals = async (req, res) => {
    try {
        const deals = await Deal.find();
        res.status(200).json(deals);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving deals', error });
    }
};

exports.voteDeal = async (req, res) => {
    try {
        const { id } = req.params;
        const deal = await Deal.findById(id);
        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        deal.votes += 1;
        await deal.save();
        res.status(200).json(deal);
    } catch (error) {
        res.status(500).json({ message: 'Error voting on deal', error });
    }
};