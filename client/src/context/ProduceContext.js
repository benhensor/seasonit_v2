import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

const ProduceContext = createContext()

export const useProduce = () => useContext(ProduceContext)

export const ProduceListProvider = ({ children }) => {

    const [produce, setProduce] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const base_url = 'http://localhost:5000/produce'

    const fetchProduceByMonth = async (month) => {
        setLoading(true)
        try {
            const response = await axios.get(`${base_url}/month/${month}`)
            setProduce(response.data.produce)
            setError('')
            return response.data
        } catch (error) {
            console.error('Failed to fetch produce data:', error)
            setError('Failed to fetch produce data')
        } finally {
            setLoading(false) 
        }
    }

    return (
        <ProduceContext.Provider value={{ produce, setProduce, loading, error, fetchProduceByMonth }}>
            {children}
        </ProduceContext.Provider>
    )

}

export default ProduceListProvider