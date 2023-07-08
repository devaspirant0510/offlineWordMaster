import {fromEvent,mapTo,scan,pipe,merge,tap} from "rxjs"
import BaseView from "../utils/Base/BaseView"
import WordTestViewModel from "../ViewModel/WordTestViewModel";
import {displayNone,displayShowen} from "../utils/ViewUtils";
import { TestViewState } from "../ViewModel/model/TestViewState";

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
        this.mainCtTestRes = document.querySelector("#ct-result")
        displayNone(this.mainCtTestRes)
        /** @type {HTMLButtonElement} */
        this.btnTest = document.querySelector("#btn-test");
        /** @type {HTMLInputElement} */
        this.opKor2Eng = document.querySelector("#op-kor-eng");
        /** @type {HTMLInputElement} */
        this.opEng2Kor = document.querySelector("#op-eng-kor");
        /** @type {HTMLButtonElement} */
        this.btnTestOptionStart = document.querySelector("#btn-test-option-start");
        /** @type {HTMLElement} */
        this.testProgress = document.querySelector("#test-progress");
        /** @type {HTMLElement} */
        this.testQuestion = document.querySelector("#test-question");
        /** @type {HTMLButtonElement} */
        this.btnWordAnswer = document.querySelector("#btn-word-answer");
        /** @type {HTMLElement} */
        this.inputTestAnswer = document.querySelector("#test-answer");
        /** @type {HTMLElement} */
        this.tableResult = document.querySelector("#table-result");
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
        fromEvent(this.btnWordAnswer,"click").subscribe(()=>{
            this.vm.showNextWord();
            this.inputTestAnswer.value = "";
            this.inputTestAnswer.focus();
        })
        fromEvent(this.inputTestAnswer,"keyup").subscribe((e)=>{
            this.vm.obUserInput.next(e.target.value)
        });


    }
    dataBinding(){
        this.vm.obTestOptionEng2Kor.subscribe((selected)=>{
            console.log("eng2Kor",selected);
            if(selected){
                this.opEng2Kor.checked = true;
            }else{
                this.opEng2Kor.checked = false;
            }
        });
        this.vm.obTestOptionKor2Eng.subscribe((selected)=>{
            console.log("kor2Eng",selected);
            if(selected){
                this.opKor2Eng.checked = true;
            }else{
                this.opKor2Eng.checked = false;
            }
        });
        this.vm.obViewState.subscribe((state)=>{
            switch(state){
                case TestViewState.OPTION:
                    displayShowen(this.mainCtTestOp)
                    displayNone(this.mainCtTest)
                    displayNone(this.mainCtTestRes);
                    break;
                case TestViewState.TEST:
                    displayShowen(this.mainCtTest)
                    displayNone(this.mainCtTestOp)
                    displayNone(this.mainCtTestRes);
                    break;
                case TestViewState.RESULT:
                    displayShowen(this.mainCtTestRes)
                    displayNone(this.mainCtTestOp)
                    displayNone(this.mainCtTest);
                    break;

            }
        })
        this.vm.obCtTestOpVisible.subscribe((isShow)=>{
            // if(isShow.option){
            //     displayNone(this.mainCtTest)
            //     displayShowen(this.mainCtTestOp)
            // }else if(isShow.main){
            //     displayNone(this.mainCtTestOp)
            //     displayShowen(this.mainCtTest)
            // }
        })
        this.vm.obWordMaxSize.subscribe((size)=>{
            console.log(size);
            this.testProgress.textContent = `${this.vm.obWordCurSize.getValue()+1}/${size}`
        })
        this.vm.obWordCurSize.subscribe((size)=>{
            console.log(size);
            this.testProgress.textContent = `${size}/${this.vm.obWordMaxSize.getValue()}`
        })
        this.vm.obWordQuestion.subscribe((question)=>{
            this.testQuestion.textContent = question
        })
        this.vm.obNextWordOpt.subscribe((isSubmit)=>{
            if(isSubmit){
                this.btnWordAnswer.textContent = "제출"
            }else{
                this.btnWordAnswer.textContent = "다음"
            }
        })
        this.vm.obUserAnswers.subscribe((answers)=>{

            console.log(answers);
        })
        this.vm.obResultData.subscribe(data=>{
            for(let i=0; i<data.question.length; i++){
                const tr = document.createElement("tr");
                for (let j=0; j<3; j++){
                    const td = document.createElement("td");
                    if(j===0){
                        td.textContent = data.question[i]; 
                    }else if(j===1){
                        td.textContent = data.answer[i]; 
                    }else{
                        td.textContent = data.my[i]; 
                    }
                    tr.appendChild(td)
                }
                this.tableResult.append(tr);

            }


        })

    }
}

export default WordTestView;