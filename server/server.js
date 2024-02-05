import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import { produceRouter } from './routes/ProduceListRoutes.js'
import { shoppingListRouter } from './routes/ShoppingListRoutes.js'

const app = express()


const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING
const PORT = process.env.PORT || 5000


// Middleware
app.use(express.json())
app.use(cors())


// Use routes
app.use('/produce', produceRouter)
app.use('/shoppinglist', shoppingListRouter)


// Connect to MongoDB
mongoose.connect(MONGODB_CONNECTION_STRING, { dbName: 'seasonit-db' })
.then(() => {
    console.log('Connected to MongoDB')
}).catch(console.error)

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to:', mongoose.connection.db.databaseName);
})


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))