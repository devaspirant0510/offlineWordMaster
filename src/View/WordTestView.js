import {fromEvent,mapTo,scan,pipe,merge,tap} from "rxjs"
import BaseView from "../utils/Base/BaseView"
import WordTestViewModel from "../ViewModel/WordTestViewModel";
import {displayNone,displayShowen} from "../utils/ViewUtils";

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
        this.ctTest = document.querySelector("#test-container");
        this.mainCtTest = document.querySelector("#ct-test");
        this.mainCtTestOp = document.querySelector("#ct-test-option");
        /** @type {HTMLButtonElement} */
        this.btnTest = document.querySelector("#btn-test");
        /** @type {HTMLInputElement} */
        this.opKor2Eng = document.querySelector("#op-kor-eng");
        /** @type {HTMLInputElement} */
        this.opEng2Kor = document.querySelector("#op-eng-kor");
        /** @type {HTMLButtonElement} */
        this.btnTestOptionStart = document.querySelector("#btn-test-option-start");


    }

    settingEvent(){
        const eventKorEng = fromEvent(this.opKor2Eng,"change").pipe(mapTo("kor2eng"));
        const eventEngKor = fromEvent(this.opEng2Kor,"change").pipe(mapTo("eng2kor"));
        const mergeEvent = merge(
            eventKorEng,eventEngKor
        )
        const initialState = {
            kor2eng:false,
            eng2kor:false
        }
        mergeEvent.pipe(
            scan((state,event)=>{
                const newState = initialState;
                return{...newState,[event]:true}
            },{kor2eng:false,eng2kor:false}),
            tap(state=>{
                this.vm.obTestOptionEng2Kor.next(state.eng2kor);
                this.vm.obTestOptionKor2Eng.next(state.kor2eng)
            })
        ).subscribe();
        fromEvent(this.btnTestOptionStart,"click").subscribe(()=>{
            this.vm.testStart();
        })


    }
    dataBinding(){
        this.vm.obTestOptionEng2Kor.subscribe((selected)=>{
            console.log("eng2Kor",selected);
        });
        this.vm.obTestOptionKor2Eng.subscribe((selected)=>{
            console.log("kor2Eng",selected);
        });
        this.vm.obCtTestOpVisible.subscribe((isShow)=>{
            if(isShow.option){
                displayNone(this.mainCtTest)
                displayShowen(this.mainCtTestOp)
            }else if(isShow.main){
                displayNone(this.mainCtTestOp)
                displayShowen(this.mainCtTest)
            }
        })

    }
}

export default WordTestView;