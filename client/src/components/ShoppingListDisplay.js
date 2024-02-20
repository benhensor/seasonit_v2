import React, { useState } from 'react'
import styled from 'styled-components'
import images from '../styles/images'
import { useSeasonalProduce } from '../context/Context'

export default function ShoppingListDisplay() {

    const { shoppingList, deleteItemFromShoppingList } = useSeasonalProduce()

    const [isMarked, setIsMarked] = useState([])

    const toggleMarked = (id) => {
        setIsMarked((current) => {
            if (current.includes(id)) {
                // Item is already marked, unmark it by removing its id
                return current.filter(itemId => itemId !== id)
            } else {
                // Item is not marked, mark it by adding its id
                return [...current, id]
            }
        })
    }

    const handleDeleteItem = async (_id) => {
        try {
            const response = await deleteItemFromShoppingList(_id)
            if (response.error) {
                console.error('Failed to delete item from shopping list:', response.message)
            } else {
                console.log('Item deleted from shopping list:', response)
            }
        } catch (error) {
            console.error('Failed to delete item from shopping list:', error)
        }
    }

    return (
        <Container>
            {shoppingList.map((item) => (
                <ShoppingListItem
                    key={item._id}
                    role="button"
                    onClick={() => toggleMarked(item.name)}
                    $isMarked={isMarked.includes(item._id)}
                >
                    <ItemImage>
                        <img src={images[item.image]} alt={item.name} />
                    </ItemImage>

                    <ShoppingText>
                        <p>{item.name}</p>

                        <Buttons>
                            <Button $id={'mark'} onClick={(e) => {
                                e.stopPropagation()
                                toggleMarked(item._id)
                                }}>
                                {isMarked.includes(item._id) ? 'Undo' : 'Mark done'}
                            </Button>
                            <Divider>|</Divider>
                            <Button $id={'remove'} onClick={() => handleDeleteItem(item._id)}>
                                Remove
                            </Button>
                        </Buttons>

                    </ShoppingText>
                </ShoppingListItem>
            ))}
        </Container>
    )
}

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 2;
`

const ShoppingListItem = styled.li`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1rem;
    background-color: #3c4136;
    color: #EEE;
    border-bottom: 1px solid #77777730;
    transition: all 0.2s ease-in-out;
    ${({ $isMarked }) => !$isMarked && `
        &:hover {
            background-color: #2F3822;
            img {
            border: 2px solid #2cff02; 
            }
        }
    `}
    ${({$isMarked}) => $isMarked && `
        background-color: #212718;
        img {
            border: 2px solid #2cff02;
        }
        p {
            text-decoration: 2px line-through;
            text-decoration-color: #2cff02;
        }
    `}
    p {
        font-size: 1.2rem;
        font-weight: 600;
    }
`

const ItemImage = styled.div `
    max-width: 5rem;
    height: 5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
    img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        object-position: center;
        border: 2px solid #2d5e23;
        transition: all 0.2s ease-in-out;
    }
`

const ShoppingText = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;  
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
`

const Button = styled.button`
  border: none;
  background-color: transparent;
  word-wrap: nowrap;
  color: #b8b8b8;
  font-size: 1rem;
  transition: all 0.05s ease-in-out;
  ${({$id}) => $id === 'mark' && `
    &:hover {
      color: #FFFFFF;
    }
  `}
  ${({$id}) => $id === 'remove' && `
    &:hover {
      color: #FF0000;
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