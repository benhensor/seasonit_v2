import React, { useState } from "react"
import styled from "styled-components"
import images from "../styles/images"
import { useSeasonalProduce } from "../context/Context"

export default function ProduceDisplay() {

	const { produce, addItemToShoppingList } = useSeasonalProduce()

	const [selectedItems, setSelectedItems] = useState([])

	const handleSelectItem = async (item) => {
		if (selectedItems.includes(item._id)) {
			setSelectedItems(selectedItems.filter((id) => id !== item._id))
		} else {
			try {
				const response = await addItemToShoppingList(item)
				if (response) {
					setSelectedItems([...selectedItems, item])
				} else {
					console.error('Failed to add item to shopping list:', response)
				}
			} catch (error) {
				console.error('Error adding item to shopping list:', error)
			}
		}	
	}
	

	return (
		<Container>
			{produce.map((item) => (
				<ProduceItem
					key={item._id}
					role='button'
					onClick={() => handleSelectItem(item)}
					$isSelected={selectedItems.includes(item)}
				>

					<ItemImage>
						<img src={images[item.image]} alt={item.name} />
					</ItemImage>
					<div>
						<h3>{item.name}</h3>
						<p>{selectedItems.includes(item) ? "Added to List" : "Add to List"}</p>
					</div>
				
				</ProduceItem>
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

const ProduceItem = styled.li`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	padding: 1rem;
	background-color: #3c4136;
	color: #eee;
	border-bottom: 1px solid #77777730;
	transition: all 0.2s ease-in-out;
	${({ $isSelected }) => !$isSelected && `
		&:hover {
			background-color: #2F3822;
			img {
				border: 2px solid #2cff02;
			}
		}
	`}
	div {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		background-color: transparent;
	}
	h3 {
		font-size: 1.2rem;
		font-weight: 600;
	}
	p {
		border: none;
		background-color: transparent;
		color: #b8b8b8;
		font-size: 1rem;
		transition: all 0.05s ease-in-out;
	}
`

const ItemImage = styled.div`
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