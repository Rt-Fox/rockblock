import {makeAutoObservable} from "mobx";

export default class PageStore {
    constructor() {
        this._activePage = 'Token'
        makeAutoObservable(this)
    }
    setActivePage(page) {
        this._activePage = page
    }
    get ActivePage() {
        return this._activePage
    }
}