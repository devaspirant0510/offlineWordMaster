import {Subject, BehaviorSubject, pipe, map, identity} from "rxjs"
import Service from "../Domain/Service"
import WordEntity from "../Data/entity/WordEntity";
import Mediator from "./Mediator";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import BaseViewModel from "../utils/Base/BaseViewModel";
import StateManager from "../utils/StateManager";
import {MapperWordNames} from "../Domain/Mapper/Mapper";
import Dictionary from "./model/Dictionary";
import DictionaryNames from "../Domain/model/DictionaryNames";
import {EntityToModel} from "./Mapper/Mapper";

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
        /**@type {BehaviorSubject<Array<DictionaryNames>>} Dictionary List names */
        this.obDictionaryList = this.sm.addState(new BehaviorSubject([]));
        /**@type {BehaviorSubject<string>} */
        this.obInputWord = this.sm.addState(new BehaviorSubject(""));
        /**@type {BehaviorSubject<Dictionary|null>} */
        this.obCurrentDictionaryInfo = this.sm.addState(new BehaviorSubject(null));

        this.obInputWordItemKor = this.sm.addState(new BehaviorSubject(""));
        this.obInputWordItemEng = this.sm.addState(new BehaviorSubject(""));

        this.obWordListCtxMenuToggle = this.sm.addState(new BehaviorSubject(false));

        this.rootObIsTest = this.sm.addState(new BehaviorSubject(false));
    }

    /**
     * 첫 화면로딩시 Dictionary 정보 가져오고 Dictionary 가 있을시
     * 천번째 Dictionary 를 메인화면에 보여줌
     * @returns {Promise<void>}
     */
    async init() {
        const readWordList = await this.service.getWordList();
        this.obDictionaryList.next(readWordList)
        const readFirstDictionary = await this.service.getFirstDictionary();
        if(readFirstDictionary){
            await this.selectDictionary(readFirstDictionary.id)
        }
    }
    async addDummyData(){
        const id = this.obCurrentDictionaryInfo.getValue().id;
        await this.service.addWordItem(id,"사과","apple")
        await this.service.addWordItem(id,"시골의,지방의","rural")
        await this.service.addWordItem(id,"도시의","urban")
        await this.service.addWordItem(id,"출발","arrival")
        await this.service.addWordItem(id,"도착","departure")
        await this.selectDictionary(id);
    }

    /**
     * 유저가 dictionary 리스트에서 단어를 선택했을때 해당 단어정보를 가져와 observer 변수에 세팅
     * @param {number} id  Dictionary Entity 의 key 값
     */
    async selectDictionary(id){
        const getOneDict = await this.service.getDictionaryById(id);
        if(getOneDict){
            const convertModel = EntityToModel(getOneDict);
            this.obCurrentDictionaryInfo.next(convertModel);
        }

    }

    /**
     *
     * @param {boolean} isRemove 유저가 삭제를 원하는지 여부
     * @param {number} wordId 삭제할 dictionary 의 key 값
     * @returns {Promise<void>}
     */
    async removeWord(isRemove, wordId) {
        if (isRemove) {
            const removeResult = await this.service.removeWordName(wordId)
            const resultList = MapperWordNames(removeResult)
            this.obDictionaryList.next(resultList)
            await this.selectDictionary(resultList[0].id)
        }
    }

    updateWord(wordName, wordId, changeName) {
        if (wordName === "" || wordName === changeName) {
            return null;
        }
        this.service.updateWordName(wordId, changeName).then(r => {
            this.obDictionaryList.next(MapperWordNames(r));
            this.selectDictionary(wordId).then()
        }).catch(e => {
            alert(e.message)
        })

    }

    async addDictionary(wordName) {
        if (wordName === "" || wordName === undefined) {
            //alert("내용을 입력해주세요");
            return;
        }
        const addedWordName = await this.service.addDictionary(wordName);
        if(addedWordName==null){
            throw new Error("add word failed.");
        }
        const currentList = this.obDictionaryList.getValue()
        const newList = [...currentList,addedWordName ]
        this.obDictionaryList.next(newList)
        this.obInputWord.next("");
        await this.selectDictionary(addedWordName.id)
    }

    addWordItem() {
        const currentData = this.obCurrentDictionaryInfo.getValue();
        const wordIdx = currentData.id
        const kor = this.obInputWordItemKor.getValue();
        const eng = this.obInputWordItemEng.getValue();
        this.service.addWordItem(wordIdx, kor, eng).then(wordEntity => {
            let dict = this.obCurrentDictionaryInfo.getValue()
            if(dict){
                console.log("add wor item",wordEntity)
                dict = {...dict,data:wordEntity}
                this.obCurrentDictionaryInfo.next(dict)

            }

        })
    }

    /**
     * @param isDelete {boolean}
     * @param wordId {number}
     * @param wordItemId {number}
     */
    async removeWordItem(isDelete, wordId, wordItemId) {
        if (!isDelete) {
            return;
        }
        const resultWord = await this.service.removeWordItem(wordId, wordItemId);
        if(resultWord){
            this.selectDictionary(wordId).then()
        }
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
            this.selectDictionary(wordId).then()
        }).catch(e => {
            console.log(e.message)
        });


    }
    async shuffleWord(){
        const shuffleWordList = await this.service.getShuffleWord(this.obCurrentDictionaryInfo.getValue().data)
        this.obCurrentDictionaryInfo.next(
            {
                ...this.obCurrentDictionaryInfo.getValue(),
                data:shuffleWordList
            }
        )
        // let randIdxArr = []
        // for(let i=0; i<rangeArr.length; i++){
        //     const randN = Math.ceil(Math.random()*rangeArr.length);
        //     rangeArr=rangeArr.filter((_,idx)=>idx!==rangeArr[randN]);
        //
        // }
        // console.log(randIdxArr)
    }

}

export default ViewModel;