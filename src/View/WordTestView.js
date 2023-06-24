import {fromEvent} from "rxjs"
import BaseView from "../utils/Base/BaseView"
import WordTestViewModel from "../ViewModel/WordTestViewModel";

class WordTestView extends BaseView{
    /**
     * 
     * @param {WordTestViewModel} viewModel 
     */
    constructor(viewModel){
        super();
        this.vm = viewModel;

        this.settingDom();
        this.settingEvent();
        this.dataBinding();
    }
    /**
     * 
     */
    settingDom(){
        /** @type {HTMLElement} */
        this.ctTest = document.querySelector("#test-container")
        /** @type {HTMLButtonElement} */
        this.btnTest = document.querySelector("#btn-test")

    }

    settingEvent(){

    }
    dataBinding(){

    }
}

export default WordTestView;