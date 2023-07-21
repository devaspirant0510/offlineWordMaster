import {BehaviorSubject, fromEvent} from "rxjs";
class BaseViewModel{
    constructor(mediator) {
        // if(BaseViewModel.instance){
        //     return BaseViewModel.instance;
        // }
        // BaseViewModel.instance = this;
        this.mediator = mediator;
        // this.rootObIsTest = new BehaviorSubject(false);
        // this.rootSettingDom();
        // this.rootSettingEvent();
        // this.rootSubscribe();

    }
    rootSettingDom(){
        /** @type {HTMLElement}*/
        this.cTmainView = document.querySelector("#article-container");
        /** @type {HTMLElement}*/
        this.ctTestView = document.querySelector("#test-container");
        /** @type {HTMLElement}*/
        this.btnTest = document.querySelector("#btn-test");
        /** @type {HTMLElement}*/
        this.btnTestExit = document.querySelector("#btn-test-exit");
    }
    rootSettingEvent(){
        fromEvent(this.btnTest,"click").subscribe(isTest=>{
            // this.rootObIsTest.next(!this.rootObIsTest.getValue());
        })
        fromEvent(this.btnTestExit,"click").subscribe(()=>{
            // this.rootObIsTest.next(!this.rootObIsTest.getValue());
        })
    }
    rootSubscribe(){
    }
}

export default BaseViewModel;