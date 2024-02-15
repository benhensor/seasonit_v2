import express from 'express'

import { ShoppingListModel } from '../models/ShoppingList.js'

const router = express.Router()

// Add produce to shopping list
router.post('/add', async (req, res) => {

    const currentMonth = new Date().toLocaleString('default', { month: 'long' })
    const item = {
        name: req.body.name,
        type: req.body.type,
        image: req.body.image,
        month: req.body.month,
        marked: req.body.marked
    }
    const itemName = item.name
    const isAre = itemName.endsWith('s') ? 'are' : 'is'
    const wereWas = itemName.endsWith('s') ? 'were' : 'was'

    try {
        
        // Check if item is in season
        if (item.month !== currentMonth) {
            const message = `${itemName} ${isAre} not in season!`
            return res.status(400).json({ error: true, message: message });
        }

        // Check if item is already in shopping list
        const existingItem = await ShoppingListModel.findOne({ name: itemName });
        if (existingItem) {
            // Item already exists, return an error or a message
            const message = `${itemName} ${isAre} already added!`;
            console.log(message)
            return res.status(400).json({ error: true, message: message });
        }

        const shoppingListItem = new ShoppingListModel(item)
        const addedItem = await shoppingListItem.save()
        const message = `${itemName} ${wereWas} added to the list!`
        return res.status(201).json({ item: addedItem, message })

    } catch (error) {
        console.error('Failed to add item to shopping list:', error)
        res.status(500).json({ message: 'An error occurred while adding item to shopping list.' })
    }
})

// Get shopping list
router.get('/', async (req, res) => {
    try {
        const shoppingList = await ShoppingListModel.find()
        if (shoppingList.length === 0) {
           return res.json({ message: "Shopping list is empty!" })
        }
        res.status(200).json({ shoppingList, message: "Shopping list" })
    } catch (error) {
        console.error('Failed to retrieve shopping list:', error)
        res.status(500).json({ message: 'An error occurred while retrieving shopping list.' })
    }
})

// Set item in shopping list to marked
// router.put('/mark/:_id', async (req, res) => {
    
//     const { _id } = req.params
    
//     try {
//         const item = await ShoppingListModel.findById(_id)
//         if (!item) {
//             console.log(_id)
//             return res.status(404).json({ message: "Item not found" })
//         }
//         item.marked = !item.marked
//         await item.save()
//         res.json(item)
//     } catch (error) {
//         console.error('Failed to mark item in shopping list:', error)
//         res.status(500).json({ message: 'An error occurred while marking item in shopping list.' })
//     }
// })

// Delete item from shopping list
router.delete('/delete/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const item = await ShoppingListModel.findByIdAndDelete(_id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }
        const itemName = item.name
        const wereWas = itemName.endsWith('s') ? 'were' : 'was'
        const message = `${itemName} ${wereWas} removed`
        return res.json({ message });
    } catch (error) {
        console.error('Failed to delete item from shopping list:', error);
        return res.status(500).json({ message: 'An error occurred while deleting item from shopping list.' });
    }
})

// Delete all items from shopping list
router.delete('/delete', async (req, res) => {
    try {
        await ShoppingListModel.deleteMany()
        return res.json({ message: 'Shopping list is empty!' })
    } catch (error) {
        console.error('Failed to delete all items from shopping list:', error)
        return res.status(500).json({ message: 'An error occurred while deleting all items from shopping list.' })
    }
})


export { router as shoppingListRouter }