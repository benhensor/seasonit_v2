import React from 'react'
import ProduceDisplay from './ProduceDisplay'
import ShoppingListDisplay from './ShoppingListDisplay'
import styled from 'styled-components'
import backgroundImage from '../assets/vegetablePattern.png'

export default function Display({ display }) {


    return (
        <Container>
            <BackgroundImage src={backgroundImage} alt='background' />
            
            {!display ? (
                <ProduceDisplay />
            ) : (
                <ShoppingListDisplay />
            )}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 100%;
    width: calc(100% - 2rem);
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        width: 0;
    }
    &::-webkit-scrollbar-track {
        background: transparent; 
    }
    &::-webkit-scrollbar-thumb {
        background-color: transparent;
    }
    h2 {
        color: #EEE;
        margin: 1rem;
        font-size: 2rem;
    }
`

const BackgroundImage = styled.img`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        mix-blend-mode: screen;
        z-index: 1;
        opacity: 1; 
`