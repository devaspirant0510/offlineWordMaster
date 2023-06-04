import ViewModel from "./ViewModel";
import { fromEvent } from "rxjs"

class View {
    /**
     * 
     * @param {ViewModel} viewModel 
     */
    constructor(viewModel) {
        this.vm = viewModel
        this.settingDom()
        this.wordInfodataBiniding()
        this.wordListDataBinding()
        this.settingEvent()
        this.vm.init()
    }
    settingEvent() {
        const eventInputWord = fromEvent(this.inputWordName, "input")
        eventInputWord.subscribe((e) => {
            this.vm.obInputWord.next(e.target.value)
        });

        const eventInputItemKor = fromEvent(this.inputWordItemKor,"input")
        eventInputItemKor.subscribe((e)=>{
            this.vm.obInputWordItemKor.next(e.target.value)
        });

        const eventInputItemEng = fromEvent(this.inputWordItemEng,"input")
        eventInputItemEng.subscribe((e)=>{
            this.vm.obInputWordItemEng.next(e.target.value)
        });

        const eventAddWord = fromEvent(this.btnAddWord, "click")
        eventAddWord.subscribe(() => {
            if (this.vm.obInputWord.getValue()===""){
                return;
            }
            this.vm.addWord(this.vm.obInputWord.getValue())
            this.wordList.scrollTop = this.wordList.clientHeight;
        })

        const eventAddWordItem = fromEvent(this.btnWordItemAdd,"click")
        eventAddWordItem.subscribe(()=>{
            this.vm.addWordItem()
            this.vm.obInputWordItemEng.next("")
            this.vm.obInputWordItemKor.next("")
        })

    }
    settingDom() {
        /**@type {HTMLElement} wordList 컨테이너*/
        this.mainSection = document.querySelector("#section-word-list");
        /**@type {HTMLElement} wordList 의 리스트*/
        this.wordList = document.querySelector("#li-word-list");
        /**@type {HTMLElement} wordInfo 제목*/
        this.wordTitle = document.querySelector("#h2-word-title")
        /**@type {HTMLElement} 추가할 word input*/
        this.inputWordName = document.querySelector("#input-word-name");
        /**@type {HTMLElement} 추가할 word 버튼*/
        this.btnAddWord = document.querySelector("#btn-add-word");
        /**@type {HTMLElement} wordinfo 리스트*/
        this.wordInfoList = document.querySelector("#li-word-info-list");
        /** @type {HTMLElement} wordinfo 에서 word item 추가 버튼*/
        this.btnWordItemAdd = document.querySelector("#btn-add-word-item")
        /** @type {HTMLElement} wordinfo 에서 korea input */
        this.inputWordItemKor = document.querySelector("#input-word-item-kor")
        /** @type {HTMLElement} wordinfo 에서 english input */
        this.inputWordItemEng = document.querySelector("#input-word-item-eng")

        /** @type {HTMLElement} wordinfo 에서 english input */
        this.inputWrapper = document.querySelector("#input-wrapper");
        this.inputWrapper.style.visibility = "hidden"
    }
    wordListDataBinding(){
        this.vm.obWordList.subscribe((value) => {
            this.wordList.innerHTML = ""
            value.map(item => {
                const li = document.createElement("li");
                li.innerHTML = `${item.wordName}<img src="resource/dots.png" width="20" height="20"/>`;
                this.wordList.append(li);
                li.addEventListener("click", (e) => {
                    this.vm.currentWordInfo = item;
                    this.vm.wordTitle = item.wordName;
                    this.vm.setWordInfoList(item.id);
                });
            });
        });
        this.vm.obInputWord.subscribe((value) => {
            if (value!==undefined) {
                this.inputWordName.value = value;
            }
        })

    }
    wordInfodataBiniding() {
        this.vm.obWordInfoList.subscribe((value) => {
            this.wordInfoList.innerHTML = "";
            value.map(item => {
                const li = document.createElement("li");
                const element = `
                        <span class="english">${item.eng}</span>
                        <span class="korean">${item.kor}</span>
                `;
                li.innerHTML = element;
                this.wordInfoList.append(li);
            });
        });
        this.vm.obInputWordItemEng.subscribe((value)=>{
            this.inputWordItemEng.value = value
        });
        this.vm.obInputWordItemKor.subscribe((value)=>{
            this.inputWordItemKor.value = value
        });
        this.vm.obCurrentWordInfo.subscribe((value)=>{
            if(value){
                this.wordTitle.textContent = value.wordName;
                this.inputWrapper.style.visibility = "visible"
            }
            
        })


    }
}

export default View;