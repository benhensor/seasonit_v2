import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const ShoppingListContext = createContext()

export const useShoppingList = () => useContext(ShoppingListContext)

export const ShoppingListProvider = ({ children }) => {

    const [shoppingList, setShoppingList] = useState([])
    const [shoppingListMessage, setShoppingListMessage] = useState('Shopping list is empty!')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const base_url = 'http://localhost:5000/shoppinglist'

    const fetchShoppingList = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${base_url}`)
            setShoppingList(response.data.shoppinglist)
            setShoppingListMessage(response.data.message)
            setError('')
            // console.log('fetch shopping list:', response.data)
        } catch (error) {
            console.error('Failed to fetch shopping list data:', error)
            setError('Failed to fetch shopping list data')
        } finally {
            setLoading(false)
        }
    }

    const addItemToShoppingList = async (item) => {
        setLoading(true);
        try {
            const response = await axios.post(`${base_url}/add`, item);
            console.log('add to shopping list:', response.data);
            setShoppingListMessage(response.data.message);
            return response.data;
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                return error.response.data;
            } else {
                return { error: true, message: 'An error occurred while adding item to shopping list.' };
            }
        } finally {
            setLoading(false);
        }
    }

    const deleteItemFromShoppingList = async (_id) => {
        try {
            const response = await axios.delete(`${base_url}/delete/${_id}`);
            console.log('api call', response.data);
            setShoppingList(shoppingList.filter(item => item._id !== _id));
            setShoppingListMessage(response.data.message);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    
    const deleteAllFromShoppingList = async () => {
        try {
            const response = await axios.delete(`${base_url}/delete`);
            if (response.ok) {
                setShoppingList([]);
                setShoppingListMessage(response.data.message);
                return response.data;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ShoppingListContext.Provider value={{ shoppingList, shoppingListMessage, setShoppingListMessage, loading, error, fetchShoppingList, addItemToShoppingList, deleteItemFromShoppingList, deleteAllFromShoppingList }}>
            {children}
        </ShoppingListContext.Provider>
    )

}

export default ShoppingListProvider