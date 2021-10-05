import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../App";
import {getContract} from "../http";

const Staking = observer(({web3}) => {
    const {user} = useContext(Context);
    const StakingContract = user.contract['STAKING_CONTR']
    const TokenContract = user.contract['TOKEN_CONTR']
    const [loading, setLoading] = React.useState(false)
    useEffect((() => {
        if (user.isAuth && !StakingContract) {
            getContract(web3, user,'STAKING_CONTR', user.staking_contract)
        }
        if (user.isAuth && !TokenContract) {
            getContract(web3, user, 'TOKEN_CONTR', user.token_contract)
        }
        if (StakingContract) {
            console.log(web3)
            userAmountInStaking()
            totalStaked()


        }
    }),[StakingContract])
    function userAmountInStaking() {
        StakingContract.methods.userAmountInStaking(user.address).call({from: StakingContract.defaultAccount})
            .then(res => user.setContractInfo(res, 'userAmountInStaking'))
    }
    function totalStaked() {
        StakingContract.methods.totalStaked().call({from: StakingContract.defaultAccount})
            .then(res => user.setContractInfo(res, 'totalStaked'))
    }
    function stake() {
        setLoading(true)
        TokenContract.methods.approve(user.staking_contract, user.inputValue?.stake).send({from: TokenContract.defaultAccount})
            .then(res => {
                StakingContract.methods.stake(user.inputValue?.stake).send({from: StakingContract.defaultAccount})
                    .then(  res => {
                            userAmountInStaking()
                            totalStaked()
                            setLoading(false)
                            user.setInputValue('','stake')
                            alert(
                                'успешная транзакция'
                            )
                        }
                    )
                    .catch(
                        res => {
                            alert('неуспешная транзакция')
                        })
                    .finally( res => {
                        setLoading(false)
                        }

                    )
            })
            .catch( res => {
                alert('неуспешная транзакция');
                setLoading(false)
            })
    }
    function unstake() {
        setLoading(true)

        StakingContract.methods.unstake(user.inputValue?.unstake).send({from: StakingContract.defaultAccount})
            .then(res => {
                    userAmountInStaking()
                    totalStaked()
                    setLoading(false)
                    user.setInputValue('','unstake')
                    alert(
                        'успешная транзакция'
                    )
                }
            )
            .catch(res => {
                    alert('неуспешная транзакция')
                })
            .finally( res => {
                setLoading(false)
            })
        }
    return (
        <main className={'wrapper'}>
            {!loading?
                <div className={'f-start'}>
                    <div className={'title'}>Staking</div>
                    <div className="div-row mb-2">Контракт номер: {StakingContract?._address}</div>
                    <div className='f-row mb-2'>
                        <input placeholder='Input stake count'
                               value={user.inputValue?.stake}
                               type={'number'}
                               onChange={event => user.setInputValue(event.target.value, 'stake')}
                               className={'div-row'}/>
                        <button
                            disabled={!(user.inputValue.stake > 0)}
                            onClick={()=>
                                stake()
                            }>stake</button>
                    </div>
                    <div className='f-row mb-2'>
                        <input placeholder='Input unstake count'
                               value={user.inputValue.unstake}
                               type={'number'}
                               onChange={event => user.setInputValue(event.target.value, 'unstake')}
                               className={'div-row'}/>
                        <button
                            disabled={!(user.inputValue.unstake > 0)}
                            onClick={()=>
                                unstake()
                            }>unstake</button>
                    </div>
                    <div className='f-row mb-2'>
                        <div className={'div-row'}>userAmountInStaking: {user.contract_info?.userAmountInStaking}</div>
                        {/*<button onClick={()=>userAmountInStaking()}>UserAmountInStaking</button>*/}
                    </div>
                    <div className='f-row mb-2'>
                        <div className={'div-row'}>TotalStaked: {user.contract_info?.totalStaked}</div>
                        {/*<button onClick={()=>totalStaked()}>totalStaked</button>*/}
                    </div>
                </div>
                :
                <div>
                    загрузка
                </div>
            }

        </main>
    );
});

export default Staking;