import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

    html, body {
        margin:0;
        padding:0;
        height:100%;
        min-height:100%;
    }
    body {
        overflow:hidden;

		a:hover {
			text-decoration: underline;
        }
    }
    * {
        box-sizing: border-box;
        font-family: var(--font-secondary);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        word-break: break-word;
    }
    *:before,
    *:after {
        box-sizing: inherit;
        word-break: break-word;
    }
    #__next {
        height:100%;
        min-height:100%;
        background: #f7f7f7;
        position: relative;
        width: 100%;
        overflow-x: hidden;
    }
    a:hover {
		text-decoration: underline;
    }
    h1 {
    }
    h2 {
    }
    h3 {
    }
    h4 {
    }
    h5 {
    }
    h6 {
    }
    p {
    }
    ul,
    ol {
    }
    table {
    }
    input {
        min-height: auto;
        line-height: 1;
        border: none;
        outline: none;
        box-shadow: none;
        background-color: transparent;
    }
    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
        box-shadow: none;
    }       
    :root { 
        --font-primary: "Roboto", sans-sarif;
        --font-secondary: "Montserrat", sans-serif;
    }
`
