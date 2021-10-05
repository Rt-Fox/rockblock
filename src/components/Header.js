import React, {useContext} from 'react';
import {Context} from "../App";
import {observer} from "mobx-react-lite";
import LoginViaMetaMask from "./LoginViaMetaMask";

const Header = observer( ({web3}) => {
    const {page} = useContext(Context);
    return (
        <header className={'row'}>
            <svg onClick={()=> page.setActivePage('Token') } className={'logo'}>
                <use xlinkHref="#logo" />
            </svg>
            <nav>
                <button onClick={()=> page.setActivePage('Token')}> Token </button>
                <button onClick={()=> page.setActivePage('Staking')}> Staking</button>
            </nav>
            <LoginViaMetaMask web3={web3}/>
        </header>
    );
});

export default React.memo(Header);