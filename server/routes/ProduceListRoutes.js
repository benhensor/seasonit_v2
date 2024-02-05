import express from 'express'

import { ProduceItemModel } from '../models/Produce.js'

const router = express.Router()

// Add all produce to database
router.post('/add', async (req, res) => {

    const produce = req.body

    if (!Array.isArray(produce) || produce.length === 0) { 
        return res.status(400).json({ message: "Please provide an array of produce items, and it should not be empty." });
    }
    
    try {
        await ProduceItemModel.insertMany(produce);
        res.status(201).json({ message: "Produce added successfully.", count: produce.length });
    } catch (error) {
        console.error("Failed to add produce:", error);
        res.status(500).json({ message: "An error occurred while adding produce." });
    }
})

// Get produce by month
router.get('/month/:month', async (req, res) => {

    const { month } = req.params
    try {
        const produce = await ProduceItemModel.find({ month }); 
        if (produce.length === 0) {
            return res.status(404).json({ message: `No produce found for ${month}` });
        }
        const message = `Seasonal produce for ${month}`
        return res.status(200).json({produce, message});
    } catch (error) {
        console.error("Failed to retrieve produce:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
})

// Filter produce by type
router.get('/type/:type', async (req, res) => {
    const { type } = req.params
    try {
        const filteredProduce = await ProduceItemModel.find({ type: type });
        if (filteredProduce.length === 0) {
            return res.status(404).json({ message: "No produce found for the given type." });
        }
        res.json(filteredProduce); 
    } catch (error) {
        console.error("Failed to filter produce:", error);
        res.status(500).json({ message: "An error occurred while filtering produce." });
    }
})

export { router as produceRouter }