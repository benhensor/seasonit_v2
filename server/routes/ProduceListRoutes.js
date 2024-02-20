import express from 'express'

import { ProduceItemModel } from '../models/Produce.js'

const router = express.Router()

const handleError = (error, operation, next) => {
    console.error(`Failed to ${operation}:`, error)
    next(error)
}

// Add all produce to database
router.post('/add', async (req, res, next) => {
    const produce = req.body
    if (!Array.isArray(produce) || produce.length === 0) { 
        return res.status(400).json({ message: 'Please provide a non-empty array of produce items' });
    }
    try {
        const result = await ProduceItemModel.insertMany(produce);
        res.status(201).json({ message: 'Produce added successfully', count: result.length });
    } catch (error) {
        handleError(error, 'add produce', next);
    }
})

// Get produce by month
router.get('/month/:month', async (req, res, next) => {
    const { month } = req.params
    try {
        const produce = await ProduceItemModel.find({ month })
        res.status(200).json({ produce, message: produce.length ? `Seasonal produce for ${month}` : `No produce found for ${month}` })
    } catch (error) {
        handleError(error, 'get produce by month', next)
    }
})

// Filter produce by type
router.get('/type/:type', async (req, res, next) => {
    const { type } = req.params
    try {
        const filteredProduce = await ProduceItemModel.find({ type });
        if (filteredProduce.length === 0) {
            return res.status(404).json({ message: `No produce found of type ${type}` });
        }
        res.status(200).json({ produce: filteredProduce, message: `Produce of type ${type}`}); 
    } catch (error) {
        handleError(error, 'filter produce by type', next);
    }
})

router.use((error, req, res, next) => {
    res.status(500).json({ message: 'An error occurred', error: error.message })
})

export { router as produceRouter }