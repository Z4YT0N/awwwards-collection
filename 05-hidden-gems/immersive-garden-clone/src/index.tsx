import React from 'react';
import ReactDOM from 'react-dom';
import { ContextProvider } from './context/index'
import Routes from './config/Routes'
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './style'

ReactDOM.render(
    <ContextProvider>
        <Routes />
        <GlobalStyle />
    </ContextProvider>,
    document.getElementById('__immersive-g'));

serviceWorker.unregister();

