import React, {createContext} from 'react';

import {observer} from "mobx-react-lite";
import UserStore from "./store/user";
import PageStore from "./store/page";
import MainPage from "./pages/MainPage";
import Web3 from "web3";
import Web3Store from "./store/web3";

export const Context = createContext(null)

const App = observer(() => {

    return (
        <Context.Provider value={{
            user: new UserStore(),
            page: new PageStore(),
            web: new Web3Store(),
        }} >
            <MainPage />
        </Context.Provider>

    );
});

export default App;

