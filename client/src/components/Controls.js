import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useSeasonalProduce } from '../context/Context'

export default function Controls({ display, setDisplay }) {

    const selectRef = useRef(null)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const { 
        setProduce,
        setShoppingList,
        message, 
        setMessage,
        getProduceByMonth,
        getProduceByType,
        resetFilter,
        getShoppingList, 
        deleteAllFromShoppingList 
    } = useSeasonalProduce()

    
    const [active, setActive] = useState('')
    const [filterControlsVisible, setFilterControlsVisible] = useState(false)

    const handleShowCurrent = async () => {
        const currentMonth = new Date().toLocaleString('default', { month: 'long' });
        await getProduceByMonth(currentMonth);
        selectRef.current.value = ''
        setActive('')
        setFilterControlsVisible(true)
        setDisplay(false)
    }

    const handleSelectChange = async (e) => {
        const month = e.target.value
        await getProduceByMonth(month)
        setFilterControlsVisible(true)
        setActive('')
        setDisplay(false)
    }

    const handleShowList = async () => {
        await getShoppingList()
        setDisplay(true)
        setFilterControlsVisible(false)
    }

    const handleResetClick = () => {
        deleteAllFromShoppingList()
        setProduce([])
        selectRef.current.value = ''
        setActive('')
        setFilterControlsVisible(false)
        setDisplay(false)
        setTimeout(() => {
            setMessage('Select an option')
        }, 1000)
    }

    const handleFilterClick = (type) => {
        if (active === type) {
            setActive('')
            resetFilter()
        } else {
            setActive(type)
            getProduceByType(type)
        }
    }

    const handleClear = () => {
        deleteAllFromShoppingList()
        setFilterControlsVisible(false)
        selectRef.current.value = ''
        setProduce([])
        setShoppingList([])
        setTimeout(() => {
            setMessage('Select an option')
        }, 1000) 
    }

 

    return (
        <Container>
            <NavControls>
                <button onClick={handleShowCurrent}>View Current</button>
                <button onClick={handleShowList}>Shopping List</button>
                <button onClick={handleResetClick}>Reset</button>
            </NavControls>

            <form action=''>
                <Select
                    ref={selectRef}
                    name='date'
                    type='date'
                    onChange={handleSelectChange}
                >
                    <Option value="">Select a month</Option>
                    {months.map((month, index) => (
                    <Option key={index} value={month}>{month}</Option>
                    ))}
                </Select>
            </form>

            <Messages>
                <p>{message}</p>
                <>
                    {!display ? (
                        <Buttons $filterControlsVisible={filterControlsVisible}>
                            <Button 
                                $id='fruit' 
                                onClick={() => handleFilterClick('fruit')}
                                $active={active === 'fruit'}
                            >
                                Fruits
                            </Button>
                            <Divider>|</Divider>
                            <Button 
                                $id='veg' 
                                onClick={() => handleFilterClick('vegetable')}
                                $active={active === 'vegetable'}
                            >
                                Vegetables
                            </Button>
                            </Buttons>
                        ) : (      
                            <Button $id='clear' onClick={() => handleClear()}>Clear List</Button>
                    )}
                </>
            </Messages>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #eee;
    width: 100%;
    padding: 2rem 1rem;
    background-color: #21241f;
`

const NavControls = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        width: 30%;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 0.3rem;
        padding: 1rem 0;
        transition: all 0.05s ease-in-out;
        border: 2px solid #147900;
        background-color: #212121;
        color: #eee;
        &:hover {
            color: #fff;
            border: 2px solid #2cff02;
            background-color: #323e31;
        }
        p {
            font-size: 1.2rem;
        }
    }
`

const Select = styled.select`
    width: 100%;
    font-size: 1.4rem;
    color: #333;
    border: none;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.3rem;
    &:focus {
        outline: none;
        border: 1px solid #333;
    }
`

const Option = styled.option`
    width: 100%;
    text-align: center;
    font-size: 1.6rem;
    color: #333;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 0.5rem;
`

const Messages = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
        font-size: 1.6rem;
        color: #eee;
    }
`

const Buttons = styled.div`
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    right: 0;
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
    ${({$filterControlsVisible}) => !$filterControlsVisible && `
        display: none;
    `}
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  word-wrap: nowrap;
  color: #b8b8b8;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.05s ease-in-out;
  ${({$id}) => $id === 'clear' && `
    &:hover {
      color: #FF0000;
    }
  `}
  ${({$id}) => ($id === 'fruit' || $id === 'veg') && `
  &:hover {
      color: #FFFFFF;
  }
  &:active {
      color: #2cff02;
  }
`}
  ${({$active}) => $active && `
    color: #2cff02;
    &:hover {
      color: #2cff02;
    }
  `}
`

const Divider = styled.span`
  font-size: 1.4rem;
  font-weight: 300;
  color: #b8b8b8;
  cursor: pointer;
  margin: 0 0.5rem;
  transition: all 0.05s ease-in-out;
`