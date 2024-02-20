import { createGlobalStyle } from 'styled-components'
import '../assets/fonts/fonts.css'

const GlobalStyles = createGlobalStyle`

    :root {
        --accent-color: #147900;
        --highlight-color: #2cff02;
        --dkBackground-color: #21241f;
        --ltBackground-color: #3A452A;
        font-size: 62.5%;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-size: 1.6rem;
        font-family: 'Poppins', sans-serif;
        background-color: #f5f5f5;
        color: #21241f;
    }

    button {
        cursor: pointer;
    }



`

export default GlobalStyles