import {Subject, BehaviorSubject, pipe, map} from "rxjs"
import Service from "../Domain/Service"
import WordEntity from "../Data/entity/WordEntity";
import Mediator from "./Mediator";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import BaseViewModel from "../utils/Base/BaseViewModel";
import StateManager from "../utils/StateManager";

class ViewModel extends BaseViewModel{
    /**
     *
     * @param {Service} service
     * @param {Mediator} mediator
     */
    constructor(service,mediator) {
        super(mediator);
        this.service = service
        mediator.register(this)
        this.sm = new StateManager();
        /**@type {BehaviorSubject<Array<{wordName:string,id:number}>>} */
        this.obWordList = this.sm.addState(new BehaviorSubject([]));
        /**@type {BehaviorSubject<string>} */
        this.obInputWord = this.sm.addState(new BehaviorSubject(""));
        /**@type {Subject<string>} */
        this.obWordTitile = this.sm.addState(new BehaviorSubject(""));
        /**@type {BehaviorSubject<DictionaryEntity|null>} */
        this.obCurrentWordInfo = this.sm.addState(new BehaviorSubject(null));
        /** @type {Subject<Array<WordEntity>>} */
        this.obWordInfoList = this.sm.addState(new BehaviorSubject([]));

        this.obInputWordItemKor = this.sm.addState(new BehaviorSubject(""));
        this.obInputWordItemEng = this.sm.addState(new BehaviorSubject(""));

        this.obWordListCtxMenuToggle = this.sm.addState(new BehaviorSubject(false));

        this.rootObIsTest = this.sm.addState(new BehaviorSubject(false));
    }

    set wordTitle(wordName) {
        this.obWordTitile.next(wordName)
    }

    set currentWordInfo(wordEntity) {
        this.obCurrentWordInfo.next(wordEntity)
    }

    async init() {
        const readWordList = await this.service.getWordList();
        this.obWordList.next(readWordList)
        const readFirstDictionary = await this.service.getFirstDictionary();
        if(readFirstDictionary){
            this.obCurrentWordInfo.next(readFirstDictionary)
            this.obWordInfoList.next(readFirstDictionary.data)
        }
    }
    async addDummyData(){
        const id = this.obCurrentWordInfo.getValue().id;
        await this.service.addWordItem(id,"사과","apple")
        await this.service.addWordItem(id,"시골의,지방의","rural")
        await this.service.addWordItem(id,"도시의","urban")
        await this.service.addWordItem(id,"출발","arrival")
        await this.service.addWordItem(id,"도착","departure")
    }

    setWordInfoList(index) {
        this.service.getWordInfos(index).then(r => {
            if (r) {
                this.obWordInfoList.next(r)
            }
        })
    }

    removeWord(isRemove, wordId) {
        if (isRemove) {
            this.service.removeWordName(wordId).then(r => {
                console.log(r);
                this.obWordInfoList.next(r)
            }).catch(e => {
                console.log(e.message);
            })
        }
    }

    updateWord(wordName, wordId, changeName) {
        if (wordName === "" || wordName === changeName) {
            return null;
        }
        this.service.updateWordName(wordId, changeName).then(r => {
            this.obWordList.next(r);
        }).catch(e => {
            alert(e.message)
        })

    }

    addWord(wordName) {
        if (wordName === "" || wordName === undefined) {
            //alert("내용을 입력해주세요");
            return;
        }
        this.service.addWord(wordName).then(r => {
            if (r === null) {
                throw new Error("add word failed.");
            }
            const currentList = this.obWordList.getValue()
            const newList = [...currentList, r]
            this.obWordList.next(newList)
            this.obInputWord.next("");
        }).catch(e => {
            //alert(e.message.toString());
        })
    }

    addWordItem() {
        const currentData = this.obCurrentWordInfo.getValue();
        const wordIdx = currentData.id
        const kor = this.obInputWordItemKor.getValue();
        const eng = this.obInputWordItemEng.getValue();
        this.service.addWordItem(wordIdx, kor, eng).then(wordEntitys => {
            this.obWordInfoList.next(wordEntitys);

        })
    }

    /**
     * @param isDelete {boolean}
     * @param wordId {number}
     * @param wordItemId {number}
     */
    removeWordItem(isDelete, wordId, wordItemId) {
        if (!isDelete) {
            return;
        }
        this.service.removeWordItem(wordId, wordItemId).then(wordList => {
            this.obWordInfoList.next(wordList);
        }).catch(e => {
            alert(e.message)
        })
    }

    /**
     *
     * @param wordId {number}
     * @param wordItemId {number}
     * @param itemInfo {WordEntity}
     * @param changeEng {string|null}
     * @param changeKor {string|null}
     */
    updateWordItem(wordId, wordItemId, itemInfo, changeEng, changeKor) {
        if (!changeEng || !changeKor) {
            return null;
        }
        if (changeEng === itemInfo.eng && changeKor === itemInfo.kor) {
            alert("변경할값이 없습니다.")
        }
        this.service.updateWordItem(wordId, wordItemId, changeKor, changeEng).then(wordList => {
            console.log(wordList)
            this.obWordInfoList.next(wordList)
        }).catch(e => {
            console.log(e.message)
        });


    }

}

export default ViewModel;