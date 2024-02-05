import mongoose from 'mongoose'

const produceItemSchema = new mongoose.Schema({
        name: String,
        type: String,
        image: String,
        month: String,
        marked: Boolean
    },
    {collection: 'produce'}
)

export const ProduceItemModel = mongoose.model('produce', produceItemSchema)