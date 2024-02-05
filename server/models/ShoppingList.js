import mongoose from 'mongoose'

const shoppingListSchema = new mongoose.Schema({
        name: String,
        type: String,
        image: String,
        month: String,
        marked: {type: Boolean, default: false },
    },
    {collection: 'shoppinglist'}
)

export const ShoppingListModel = mongoose.model('shoppinglist', shoppingListSchema)