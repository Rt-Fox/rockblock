import {makeAutoObservable} from "mobx";


export default class Web3Store {
    constructor() {

        this._web3 = []
        makeAutoObservable(this)
    }
    setWeb3(web3) {
        this._web3 = web3
    }
    get web3(){
        return this._web3
    }
}