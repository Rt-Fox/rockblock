import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import Web3Provider from 'web3-react'
import { Connectors } from 'web3-react'

const { InjectedConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })

const connectors = { MetaMask }

ReactDOM.render(
    <Web3Provider
        connectors={connectors}
    >
        <App />
    </Web3Provider>,
    document.getElementById('root')
);