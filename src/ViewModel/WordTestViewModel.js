import { BehaviorSubject } from "rxjs";
import BaseViewModel from "../utils/Base/BaseViewModel";
import Mediator from "./Mediator";
import WordTestService from "../Domain/WordTestService";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import StateManger from "../utils/StateManager";
import { TestViewState } from "./model/TestViewState";

class WordTestViewModel extends BaseViewModel {
    /**
     * 
     * @param {WordTestService} service 
     * @param {Mediator} mediator 
     */
    constructor(service, mediator) {
        super(mediator)
        this.service = service
        mediator.register(this)
        /** @type {StateManger} */
        this.sm = new StateManger();
        this.testData = [];
        this.answerData =[]
        this.userResult =[];
        this.obViewState = this.sm.addState(new BehaviorSubject(TestViewState.OPTION))
        /** @type {BehaviorSubject<boolean>} 테스트 부모 컨테이너 */
        this.obTestVisible = this.sm.addState(new BehaviorSubject(false));
        /** 
         *  @typedef testOption
         *  @property {string} option
         *  @property {string} main
        */
        /** @type {BehaviorSubject<testOption>} 테스트 옵션 선택 컨터이네 뷰 유무*/
        this.obCtTestOpVisible = this.sm.addState(new BehaviorSubject({ option: true, main: false }));

        /** @type {BehaviorSubject<boolean>} 테스트 옵션 kor->eng 선택 유무*/
        this.obTestOptionKor2Eng = this.sm.addState(new BehaviorSubject(false));
        /** @type {BehaviorSubject<boolean>} 테스트 옵션 eng->kor 선택 유무*/
        this.obTestOptionEng2Kor = this.sm.addState(new BehaviorSubject(false));
        /** @type {BehaviorSubject<number>} 단어장의 단어개수*/
        this.obWordMaxSize = this.sm.addState(new BehaviorSubject(0));
        /** @type {BehaviorSubject<number>} 현재 단어 진행량*/
        this.obWordCurSize = this.sm.addState(new BehaviorSubject(0));
        /** @type {BehaviorSubject<string>} 현재 문제*/
        this.obWordQuestion = this.sm.addState(new BehaviorSubject(""));
        /** @type {BehaviorSubject<boolean>} next word 의 유형 (다음,제출)*/
        this.obNextWordOpt = this.sm.addState(new BehaviorSubject(false));
        /** @type {BehaviorSubject<string[]>} user input 한 결과의 리스트 */
        this.obUserAnswers = this.sm.addState(new BehaviorSubject([]));
        /** @type {BehaviorSubject<string>} user input tag 데이터 바인딩*/
        this.obUserInput = this.sm.addState(new BehaviorSubject(""));
        /** @typedef resultState
         * @param {string[]} question
         * @param {string[]} answer
         * @param {string[]} my
         * @param {string[]} result
         * */
        /** @type {BehaviorSubject<resultState>} user input tag 데이터 바인딩*/
        this.obResultData = this.sm.addState(new BehaviorSubject({question:[],answer:[],my:[],result:[]}))



    }
    clear(){
        this.sm.stateClear();
    }
    showOptionView(){
        this.obViewState.next(TestViewState.OPTION);
    }
    showTestView(){
        this.obViewState.next(TestViewState.TEST);
    }
    showResultView(){
        this.obViewState.next(TestViewState.RESULT);
    }
    testStart() {
        if (!(this.obTestOptionKor2Eng.getValue() || this.obTestOptionEng2Kor.getValue())) {
            alert("옵션을 선택해주세요")
            return;
        }
        this.showTestView();
        const wordData = this.mediator.getWordList();
        this.obWordMaxSize.next(wordData.data.length);
        this.testData = this.service.createQuestion(wordData.data, this.obTestOptionKor2Eng.getValue());
        this.answerData = this.service.createQuestion(wordData.data,!(this.obTestOptionKor2Eng.getValue()))
        this.obWordQuestion.next(this.testData[0])
    }
    showNextWord() {
        const userInput = this.obUserInput.getValue();
        if (userInput === "") {
            alert("입력해주세요");
            return;
        }
        const curSize = this.obWordCurSize.getValue();
        const maxSize = this.obWordMaxSize.getValue();
        console.log(curSize,maxSize)
        if (curSize + 1 === maxSize) {
            this.obNextWordOpt.next(true)
            this.obUserAnswers.next(
                [...this.obUserAnswers.getValue(),userInput]
            )
            this.submitCheck();
            // TODO : submit and check
            return;
        }
        this.obWordCurSize.next(curSize+1);
        this.obWordQuestion.next(this.testData[curSize+1])
        this.obUserAnswers.next(
            [...this.obUserAnswers.getValue(),userInput]
        )
        this.obUserInput.next("")
    }
    submitCheck(){
        let okCount = 0;
        const userInputs = this.obUserAnswers.getValue();
        for(let i=0; i<userInputs.length; i++){
            if(this.answerData[i] === userInputs[i]){
                okCount++;
                this.userResult.push(true)
            }else{
                this.userResult.push(false)
            }
        }
        this.obViewState.next(TestViewState.RESULT);
        this.obResultData.next({
            question:this.testData,
            answer:this.answerData,
            my:this.obUserAnswers.getValue(),
            result:this.userResult
        })
    }
}

export default WordTestViewModel;