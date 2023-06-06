import { Subject, BehaviorSubject, pipe, map } from "rxjs"
import Service from "../Domain/Service"
import WordEntity from "../Data/entity/WordEntity";
import DictionaryEntity from "../Data/entity/DictionaryEntity";

class ViewModel {
    /**
     * 
     * @param {Service} service 
     */
    constructor(service) {
        this.service = service

        /**@type {BehaviorSubject<Array<{wordName:string,id:number}>>} */
        this.obWordList = new BehaviorSubject([]);
        /**@type {BehaviorSubject<string>} */
        this.obInputWord = new BehaviorSubject();
        /**@type {Subject<string>} */
        this.obWordTitile = new Subject();
        /**@type {Subject<DictionaryEntity|null>} */
        this.obCurrentWordInfo = new BehaviorSubject(null);
        /** @type {Subject<Array<WordEntity>>} */
        this.obWordInfoList = new Subject([]);

        this.obInputWordItemKor = new BehaviorSubject("");
        this.obInputWordItemEng = new BehaviorSubject("");

        this.obWordListCtxMenuToggle = new BehaviorSubject(false)
    }
    set wordTitle(wordname) {
        this.obWordTitile.next(wordname)
    }
    set currentWordInfo(wordEntity) {
        this.obCurrentWordInfo.next(wordEntity)
    }
    init() {
        this.service.getWordList().then(result => {
            this.obWordList.next(result)
        });
    }
    setWordInfoList(index) {
        this.service.getWordInfos(index).then(r => {
            if(r){
                this.obWordInfoList.next(r)

            }
        })

    }
    removeWord(isRemove,wordId){
        if(isRemove){
            this.service.removeWordName(wordId).then(r=>{
                console.log(r);
                this.obWordInfoList.next(r)
                
            }).catch(e=>{
                console.log(e.message);
                
            })
        }

    }
    updateWord(wordName,wordId,changeName){
        if(wordName==="" || wordName===changeName){
            return null;
        }
        this.service.updateWordName(wordId,changeName).then(r=>{
            this.obWordList.next(r);
        }).catch(e=>{
            alert(e.message)
        })

    }
    addWord(wordName) {
        if (wordName==="" || wordName===undefined){
            alert("내용을 입력해주세요");
            return;
        }
        this.service.addWord(wordName).then(r => {
            if (r === null) {
                throw new Error("add word failed.");
            }
            const currentList = this.obWordList.getValue()
            const newList = [...currentList, r]
            this.obWordList.next(newList)
        }).catch(e=>{
            alert(e.message.toString());
        })
    }
    addWordItem() {
        const currentData = this.obCurrentWordInfo.getValue();
        const wordIdx = currentData.id
        const kor = this.obInputWordItemKor.getValue();
        const eng = this.obInputWordItemEng.getValue();
        this.service.addWordItem(wordIdx, kor, eng).then(wordEntitys=>{
            this.obWordInfoList.next(wordEntitys);

        })
    }

}
export default ViewModel;