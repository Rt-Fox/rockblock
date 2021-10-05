import React, {useContext, useEffect} from 'react';
import Token from "./Token";
import Staking from "./Staking";
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import Header from "../components/Header";
import LoginViaMetaMask from "../components/LoginViaMetaMask";
import Web3 from "web3";


const MainPage = observer( () => {
    const {page} = useContext(Context);
    const {user} = useContext(Context);
    let web3 = new Web3(Web3.givenProvider || "wss://localhost:3000");
    useEffect(() => {
        web3.eth.defaultAccount = user.address;
    })
    return (
        <>
            <Header web3={web3}/>
            {user.isAuth?
                page.ActivePage==='Token'?
                    <Token web3={web3}/>
                    :
                    <Staking web3={web3}/>
                :
                <main className={'wrapper'}>
                    <LoginViaMetaMask web3={web3} />
                </main>
            }

        </>
    );
});

export default MainPage;