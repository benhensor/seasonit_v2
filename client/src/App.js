import React, { useState } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import Display from './components/Display'
import styled from 'styled-components'

export default function App() {

    const [display, setDisplay] = useState(false)

    return (
        <Main className="App">
            <Header />
            <Controls
                display={display}
                setDisplay={setDisplay}
            />
            <Display
                display={display}
            />
        </Main>
    )
}

const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    background-color: #21241f;
    margin: 0 auto;
   

    @media screen and (min-width: 768px) {
        width: 435px;
    }
`