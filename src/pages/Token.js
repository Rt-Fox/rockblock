import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import { getContract} from "../http";

const Token = observer(({web3}) => {
    const {user} = useContext(Context);
    const TokenContract = user.contract['TOKEN_CONTR']
    const StakingContract = user.contract['STAKING_CONTR']
    useEffect((() => {
         if (user.isAuth && !TokenContract) {
             getContract(web3, user, 'TOKEN_CONTR', user.token_contract)
         }
         if (user.isAuth && !StakingContract) {
             getContract(web3, user,'STAKING_CONTR', user.staking_contract)
         }
         if (TokenContract) {
             balanceOf()
             allowance()
             totalSupply()
         }
    }),[TokenContract])
    function balanceOf() {
        TokenContract.methods.balanceOf(TokenContract?.defaultAccount).call({from: TokenContract.defaultAccount})
            .then(res => user.setContractInfo(res, 'balance'))
    }
    function mint() {
        TokenContract.methods.mint('72').send({from: TokenContract.defaultAccount})
            .finally(
                res => {
                    balanceOf()
                }
            )
    }
    // function approve() {
    //     TokenContract.methods.approve(user.token_contract, '72').call({from: TokenContract.defaultAccount})
    //         .then(res => console.log(res))
    // }
    function allowance() {
        TokenContract.methods.allowance(user.address, user.token_contract).call({from: TokenContract.defaultAccount})
            .then(res => user.setContractInfo(res, 'allowance'))
    }
    function totalSupply() {
        TokenContract.methods.totalSupply().call({from: TokenContract.defaultAccount})
            .then(res => user.setContractInfo(res, 'totalSupply'))

    }
    return (
        <main className={'wrapper'}>
            <div className={'f-start'}>
                <div className={'title'}>Token</div>
                <div className="div-row mb-2">Контракт номер: {TokenContract?._address}</div>
                {/*<div className='f-row mb-2'>*/}
                {/*    <button onClick={()=>mint()}>mint 72</button>*/}
                {/*    <button onClick={()=>approve()}>approve 72</button>*/}
                {/*</div>*/}
                <div className='f-row mb-2'>
                    <div className={'div-row'}>Balance: {user.contract_info?.balance}</div>
                    {/*<button onClick={()=>balanceOf()}>balanceOf</button>*/}
                </div>
                <div className='f-row mb-2'>
                    <div className={'div-row'}>Allowed to spend: {user.contract_info?.allowance}</div>
                    {/*<button onClick={()=>allowance()}>allowance</button>*/}
                </div>
                <div className='f-row mb-2'>
                    <div className={'div-row'}>TotalSupply: {user.contract_info?.totalSupply}</div>
                    {/*<button onClick={()=>totalSupply()}>totalSupply</button>*/}
                </div>
            </div>
        </main>
    );
});

export default Token;