import express from 'express'

import { ProduceItemModel } from '../models/Produce.js'
import { ShoppingListModel } from '../models/ShoppingList.js'

const router = express.Router()

// Utility for logging and error handling
const logAndHandleError = (error, operation, res, next) => {
    console.error(`Failed to ${operation}:`, error)
    next(error)
}

// Add produce to shopping list
router.post('/add', async (req, res, next) => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })
    const item = {
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        month: req.body.month,
        marked: req.body.marked
    }
    const isAre = item.name.endsWith('s') ? 'are' : 'is'
    const wereWas = item.name.endsWith('s') ? 'were' : 'was'
    try {
        const itemEntries = await ProduceItemModel.find({ name: item.name })
        if (!itemEntries.some(item => item.month === currentMonth)) {
            return res.status(400).json({ message: `${item.name} ${isAre} not in season` })
        }
        const existingItem = await ShoppingListModel.findOne({ name: item.name })
        if (existingItem) {
            return res.status(400).json({ message: `${item.name} ${isAre} already added` })
        } 
        const addedItem = await new ShoppingListModel(item).save()
        return res.status(201).json({ message: `${item.name} ${wereWas} added to the list` })
    } catch (error) {
        logAndHandleError(error, 'add item to shopping list', res, next)
    }
})

// Get shopping list
router.get('/', async (req, res, next) => {
    try {
        const shoppingList = await ShoppingListModel.find()
        res.status(200).json({ shoppingList, message: shoppingList.length ? 'Shopping list' : 'Shopping list is empty!' });
    } catch (error) {
        logAndHandleError(error, 'fetch shopping list', res, next)
    }
})

// Delete item from shopping list
router.delete('/items/:_id', async (req, res, next) => {
    try {
        const item = await ShoppingListModel.findByIdAndDelete(req.params._id)
        if (!item) {
            return res.status(404).json({ message: 'Item not found.' })
        }
        res.json({ message: 'Item removed' })
    } catch (error) {
        logAndHandleError(error, 'delete item from shopping list', res, next)
    }
})

// Delete all items from shopping list
router.delete('/items', async (req, res, next) => {
    try {
        await ShoppingListModel.deleteMany()
        console.info('All items were deleted')
        res.json({ message: 'Cleared!' })
    } catch (error) {
        logAndHandleError(error, 'delete all items from shopping list', res, next)
    }
})

router.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({ message: 'An error occurred.'})
})


export { router as shoppingListRouter }