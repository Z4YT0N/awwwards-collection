

import { createGlobalStyle } from 'styled-components'

/* Global Styles */
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    ::selection {
        background: transparent;
    }

    body {
        font-family: sans-serif;
        color: #0c0c0d;
        overflow: hidden;
    }

    #__immersive-g {
        overflow: hidden;
    }

    a {
        display: block;
        text-decoration: none;
        -webkit-font-smoothing: antialiased;
        color: inherit;
    }

    .font_weight_light {
        font-weight: 300;
    }

    video {
        width: 100%;
        height: 100%;   
    }

    h1,
    h2,
    h3,
    h4 {
        font-family: 'serif';
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
    }
`

export default GlobalStyle