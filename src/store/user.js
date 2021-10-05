import {makeAutoObservable} from "mobx";

const TOKEN_CONTR = '0xFc741d0f9bdbBf576052A4fc8661BB9EE40aD566'
const STAKING_CONTR = '0xdC75951De4026A18c638f54Bf299C5acd5ED99e8'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._address = false
        this._balance = 0
        this._contract = {
            TOKEN_CONTR: false,
            STAKING_CONTR: false
        }
        this._contract_info = {
            balance: 0,
            totalSupply: 0,
            allowance: 0
        }
        this._input_value = {
            stake: '',
            unstake: ''
        }
        this._token_contract = TOKEN_CONTR
        this._staking_contract = STAKING_CONTR
        makeAutoObservable(this)
    }

    setContract(contract, type) {
        this._contract[type] = contract
    }
    get contract() {
        return this._contract
    }
    setAddress(address) {
        this._address = address
    }
    get address() {
        return this._address
    }
    setInputValue(input_value, type) {
        this._input_value[type] = input_value
    }
    get inputValue() {
        return this._input_value
    }

    setBalance(balance) {
        this._balance = balance
    }
    get balance() {
        return this._balance
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    get isAuth() {
        return this._isAuth
    }
    setContractInfo(data, type) {
        this._contract_info[type] = data
    }
    get contract_info() {
        return this._contract_info
    }
    get token_contract() {
        return this._token_contract
    }
    get staking_contract() {
        return this._staking_contract
    }



}