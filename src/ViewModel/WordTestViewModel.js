import {BehaviorSubject} from "rxjs";
import BaseViewModel from "../utils/Base/BaseViewModel";
import Mediator from "./Mediator";

class WordTestViewModel extends BaseViewModel{
    /**
     * 
     * @param {*} service 
     * @param {Mediator} mediator 
     */
    constructor(service,mediator){
        super(mediator)
        this.service = service
        mediator.register(this)
        /** @type {BehaviorSubject<boolean>} 테스트 부모 컨테이너 */
        this.obTestVisible = new BehaviorSubject(false);
        /** @type {BehaviorSubject<Object>} 테스트 옵션 선택 컨터이네 뷰 유무*/
        this.obCtTestOpVisible = new BehaviorSubject({option:true,main:false});

        /** @type {BehaviorSubject<boolean>} 테스트 옵션 kor->eng 선택 유무*/
        this.obTestOptionKor2Eng = new BehaviorSubject(false);
        /** @type {BehaviorSubject<boolean>} 테스트 옵션 eng->kor 선택 유무*/
        this.obTestOptionEng2Kor = new BehaviorSubject(false);
    }

    testStart(){
        if(!(this.obTestOptionKor2Eng.getValue() || this.obTestOptionEng2Kor.getValue())){
            alert("옵션을 선택해주세요")
        }
        const l = this.mediator.getWordList()
        console.log(l);

    }

}

export default WordTestViewModel;