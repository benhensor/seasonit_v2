import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const SeasonalProduceContext = createContext()

export const useSeasonalProduce = () => useContext(SeasonalProduceContext)

export const SeasonalProduceProvider = ({ children }) => {

    const base_URL = 'https://seasonit-v2-server.vercel.app'

    const [produce, setProduce] = useState([])
    const [storedProduce, setStoredProduce] = useState([])
    const [shoppingList, setShoppingList] = useState([])
    const [message, setMessage] = useState('Select an option')
    const [prevMessage, setPrevMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const getProduceByMonth = async (month) => {
        setLoading(true)
        setError('')
        try {
            const response = await axios.get(`${base_URL}/produce/month/${month}`)
            setProduce(response.data.produce)
            setStoredProduce(response.data.produce)
            setMessage(response.data.message)
            setPrevMessage(response.data.message)
        } catch (error) {
            console.error('Failed to fetch produce data:', error)
            setError(error.response?.data?.message || 'Failed to fetch produce data')
        } finally {
            setLoading(false)
        }
    }

    const getProduceByType = (type) => {
        resetFilter()
        const filtered = storedProduce.filter(item => item.type === type)
        if (filtered.length === 0) {
            setMessage(`No ${type}s found`)
        } else {
            setProduce(filtered)
            setMessage(`Showing ${type}s`)
        }
    }

    const resetFilter = () => {
        setProduce(storedProduce)
        setMessage(prevMessage)
    }

    const getShoppingList = async () => {
        try {
            const response = await axios.get(`${base_URL}/shoppinglist`)
            if (response.data.message === "Shopping list is empty!") {
                setMessage(response.data.message)
                return
            }
            setShoppingList(response.data.shoppingList)
            setMessage(response.data.message)
            return response.data
        } catch (error) {
            console.error('Failed to fetch shopping list:', error)
            const errorMessage = error.response?.data?.message || 'Failed to fetch shopping list. Please try again.';
            setMessage(errorMessage);
        }
    }

    const addItemToShoppingList = async (item) => {
        setLoading(true)
        try {
            const response = await axios.post(`${base_URL}/shoppinglist/add`, item)
            if (response.data.error) {
                setMessage(response.data.message)
                return response.data
            } else {
                setMessage(response.data.message)
                setShoppingList(currentList => [...currentList, response.data.item])
                return response.data
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteItemFromShoppingList = async (_id) => {
        try {
            const response = await axios.delete(`${base_URL}/shoppinglist/items/${_id}`)
            if (response.status === 200) {
            setShoppingList(currentList => currentList.filter(item => item._id !== _id))
            setMessage(response.data.message)
            } else {
                setMessage('Unexpected response')
            }
        } catch (error) {
            console.error('Failed to delete item:', error)
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setMessage(errorMessage);
        }
    }

    const deleteAllFromShoppingList = async () => {
        try {
            const response = await axios.delete(`${base_URL}/shoppinglist/items`)
            setMessage(response.data.message)
            setShoppingList([])
        } catch (error) {
            console.error('Failed to delete all items from shopping list:', error)
            const errorMessage = error.response?.data?.message || 'An error occurred';
            setMessage(errorMessage);
        }
    }

    return (
        <SeasonalProduceContext.Provider value={{ 
            produce, 
            setProduce,
            shoppingList, 
            setShoppingList, 
            message, 
            setMessage, 
            loading, 
            error, 
            getProduceByMonth,
            getProduceByType, 
            resetFilter,
            getShoppingList, 
            addItemToShoppingList, 
            deleteItemFromShoppingList, 
            deleteAllFromShoppingList 
        }}>
            {children}
        </SeasonalProduceContext.Provider>
    )
}

export default SeasonalProduceProvider