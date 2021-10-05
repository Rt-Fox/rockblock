import React, {useContext} from 'react';
import {Context} from "../App";
import {observer} from "mobx-react-lite";

const LoginViaMetaMask = observer(({web3}) => {
    const {user} = useContext(Context);
    const [activatingConnector, setActivatingConnector] = React.useState(false)


    function connect() {
        setActivatingConnector(true)
        web3.eth.givenProvider.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                user.setAddress(accounts[0])
                user.setIsAuth(true)
            })
            .catch((error) => {
                if (error.code === 4001) {
                    console.log('Permissions needed to continue.');
                } else {
                    console.error(error);
                }
            })
            .finally(() => {
                setActivatingConnector(false)
            });
    }
    return (
        <>
            {user.address?
                <div>{user.address}</div>
                :
                <button disabled={!!activatingConnector} onClick={()=>connect()}>Login Via MetaMask</button>
            }
        </>
    );
});

export default React.memo(LoginViaMetaMask);