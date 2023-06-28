import {BehaviorSubject} from "rxjs";
import BaseViewModel from "../utils/Base/BaseViewModel";
import Mediator from "./Mediator";
import WordTestService from "../Domain/WordTestService";
import DictionaryEntity from "../Data/entity/DictionaryEntity";

class WordTestViewModel extends BaseViewModel{
    /**
     * 
     * @param {WordTestService} service 
     * @param {Mediator} mediator 
     */
    constructor(service,mediator){
        super(mediator)
        this.service = service
        mediator.register(this)
        this.testData = [];
        /** @type {BehaviorSubject<boolean>} 테스트 부모 컨테이너 */
        this.obTestVisible = new BehaviorSubject(false);
        /** 
         *  @typedef testoption
         *  @property {string} option
         *  @property {string} main
        */
        /** @type {BehaviorSubject<testoption>} 테스트 옵션 선택 컨터이네 뷰 유무*/
        this.obCtTestOpVisible = new BehaviorSubject({option:true,main:false});

        /** @type {BehaviorSubject<boolean>} 테스트 옵션 kor->eng 선택 유무*/
        this.obTestOptionKor2Eng = new BehaviorSubject(false);
        /** @type {BehaviorSubject<boolean>} 테스트 옵션 eng->kor 선택 유무*/
        this.obTestOptionEng2Kor = new BehaviorSubject(false);
        /** @type {BehaviorSubject<number>} 단어장의 단어개수*/
        this.obWordMaxSize = new BehaviorSubject(0);
        /** @type {BehaviorSubject<number>} 현재 단어 진행량*/
        this.obWordCurSize = new BehaviorSubject(0);
        /** @type {BehaviorSubject<string>} 현재 문제*/
        this.obWordQuestion = new BehaviorSubject("");
        /** @type {BehaviorSubject<boolean} next word 의 유형 (다음,제출)*/
        this.obNextWordOpt = new BehaviorSubject(false);

    }

    testStart(){
        if(!(this.obTestOptionKor2Eng.getValue() || this.obTestOptionEng2Kor.getValue())){
            alert("옵션을 선택해주세요")
        }
        this.obCtTestOpVisible.next({option:false,main:true});
        const wordData = this.mediator.getWordList();
        console.log(wordData);
        this.obWordMaxSize.next(wordData.data.length);
        this.testData = this.service.createQuestion(wordData.data,this.obTestOptionKor2Eng.getValue());
        this.obWordQuestion.next(this.testData[0])
    }
    showNextWord(){
        const curSize = this.obWordCurSize.getValue();
        const maxSize = this.obWordMaxSize.getValue();
        if(curSize+1===maxSize){
            alert("end")
            this.obNextWordOpt.next(true)
            // TODO : submit and check
            return;
        }
        this.obWordCurSize.next(curSize+1);
        this.obWordQuestion.next(this.testData[curSize+1])
    }

}

export default WordTestViewModel;