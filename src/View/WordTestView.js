import {fromEvent} from "rxjs"
import BaseView from "./BaseView"
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
        fromEvent(this.btnTest,"click").subscribe(()=>{
            this.vm.onClickTestButton()
        })

    }
    dataBinding(){
        this.vm.obTestVisible.subscribe((visible)=>{
            if(visible){
                this.ctTest.style.display = "none"
            }else{
                this.ctTest.style.display = "block"
            }


        })

    }
}

export default WordTestView;