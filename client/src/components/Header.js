import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../assets/logo.svg'

export default function Header() {
  return (
    <StyledHeader>
        <div>
            <Logo style={{ marginRight: '1rem', height: '7rem' }}/>
            <div>
                <h1>SeasonIt</h1>
                <p>Eat more seasonal produce</p>
            </div>
        </div>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #21241f;
    color: #f5f5f5;
    div {
        display: flex;
        
        align-items: center;
        div {
            padding-top: 1rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    h1 {

    }
    p {
     
    }
`