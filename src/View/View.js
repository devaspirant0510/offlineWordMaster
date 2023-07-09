import ViewModel from "../ViewModel/ViewModel";
import {fromEvent, scan, pipe, tap, merge, mapTo, map} from "rxjs"
import {CSS_REF, ViewState} from "../utils/Constant"
import {WordContextMenu, WordItemLayout, WordListItem} from "./layouts/WordList"

class View {
    /**
     *
     * @param {ViewModel} viewModel
     */
    constructor(viewModel) {
        this.vm = viewModel
        this.settingDom()
        this.wordInfoDataBinding()
        this.wordListDataBinding()
        this.settingEvent()
        this.vm.init().then()
    }

    settingEvent() {
        const eventInputWord = fromEvent(this.inputWordName, "input")
        eventInputWord.subscribe((e) => {
            this.vm.obInputWord.next(e.target.value)
        });

        const eventInputItemKor = fromEvent(this.inputWordItemKor, "input")
        eventInputItemKor.subscribe((e) => {
            this.vm.obInputWordItemKor.next(e.target.value)
        });

        const eventInputItemEng = fromEvent(this.inputWordItemEng, "input")
        eventInputItemEng.subscribe((e) => {
            this.vm.obInputWordItemEng.next(e.target.value)
        });

        fromEvent(this.btnAddWord, "click").subscribe(() => {
            this.vm.addWord(this.vm.obInputWord.getValue())
            this.wordList.scrollTop = this.wordList.clientHeight;
        })

        fromEvent(this.btnWordItemAdd, "click").subscribe(() => {
            this.vm.addWordItem()
            this.vm.obInputWordItemEng.next("")
            this.vm.obInputWordItemKor.next("")
        })

        const eventShowKor = fromEvent(this.btnShowKor, "click").pipe(mapTo("kor"))
        const eventShowEng = fromEvent(this.btnShowEng, "click").pipe(mapTo("eng"))
        const mergeEvent = merge(
            eventShowEng,
            eventShowKor
        )
        mergeEvent.pipe(
            scan((state, event) => {
                return {...state, [event]: !state[event]}
            }, {kor: false, eng: false}),
            tap(state => {
                console.log(state);

                if (state.kor === false && state.eng === false) {
                    this.korRegTag.forEach(el => el.style.visibility = "visible")
                    this.engRegTag.forEach(el => el.style.visibility = "visible")
                } else {
                    this.korRegTag.forEach(el => el.style.visibility = state.kor ? "visible" : "hidden")
                    this.engRegTag.forEach(el => el.style.visibility = state.eng ? "visible" : "hidden")

                }
            })
        ).subscribe();

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

        this.wordToolsWrapper = document.querySelector("#container-word-tools");
        this.wordToolsWrapper.style.visibility = "hidden";
        this.btnShowKor = document.querySelector("#btn-show-kor")
        this.btnShowEng = document.querySelector("#btn-show-eng")
        this.korRegTag = document.querySelectorAll(".korean")
        this.engRegTag = document.querySelectorAll(".english")

        document.querySelector("#dummy").addEventListener("click",()=>{
            this.vm.addDummyData();
        })
        /** @type {HTMLElement}*/
        this.cTmainView = document.querySelector("#article-container");
        /** @type {HTMLElement}*/
        this.ctTestView = document.querySelector("#test-container");
        /** @type {HTMLElement}*/
        this.btnTest = document.querySelector("#btn-test");
        /** @type {HTMLElement}*/
        this.btnTestExit = document.querySelector("#btn-test-exit");
        fromEvent(this.btnTest,"click").subscribe(isTest=>{
            console.log("test exit");
            this.vm.rootObIsTest.next(!this.vm.rootObIsTest.getValue());
        })
        fromEvent(this.btnTestExit,"click").subscribe(()=>{
            this.vm.mediator.testClear();
            this.vm.rootObIsTest.next(!this.vm.rootObIsTest.getValue());
        })
        this.vm.rootObIsTest.subscribe((isTest)=>{
            console.log(isTest);
            
            if(!isTest){
                this.ctTestView.style.display = "none"
                this.cTmainView.style.display = "block";
                
            }else{
                this.ctTestView.style.display = "block"
                this.cTmainView.style.display = "none";
            }
        })
    }

    wordListDataBinding() {
        this.vm.obDictionaryList.subscribe((value) => {
            this.wordList.innerHTML = ""
            value.map(item => {
                console.log(item);
                const DictionaryItem = WordListItem(item.wordName);
                const li = DictionaryItem.li
                const menu = DictionaryItem.menu
                this.wordList.append(li);
                fromEvent(li,"click").subscribe(async ()=>{
                    //this.vm.currentWordInfo = item;
                    this.vm.wordTitle = item.wordName;
                    //this.vm.setWordInfoList(item.id,item.wordName);
                    await this.vm.selectDictionary(item.id)
                });
                const btnUpdate = menu.querySelector(".btn-word-update")
                const btnDelete = menu.querySelector(".btn-word-delete")
                fromEvent(btnUpdate, "click").subscribe(() => {
                    const updateValue = prompt("수정할 값을 입력해주세요", item.wordName)
                    console.log("update clddick", updateValue);
                    this.vm.updateWord(item.wordName, item.id, updateValue)

                })
                fromEvent(btnDelete, "click").subscribe(() => {
                    console.log("remove click");
                    const deleteValue = confirm("삭제하면 복구못합니다 진짜 할거야?")
                    this.vm.removeWord(deleteValue, item.id)

                })
            });
        });
        this.vm.obInputWord.subscribe((value) => {
            if (value !== undefined) {
                this.inputWordName.value = value;
            }
        })

    }

    wordInfoDataBinding() {
        this.vm.obWordInfoList.subscribe((value) => {
            // this.inputWrapper.style.visibility = ViewState.VISIBLE
            // this.wordToolsWrapper.style.visibility = ViewState.VISIBLE
            //
            // this.wordInfoList.innerHTML = "";
            // value.map((item, itemIdx) => {
            //     const dictEntity = this.vm.obCurrentDictionaryInfo.getValue();
            //     const li = WordItemLayout(item.eng, item.kor, dictEntity.id);
            //     this.wordInfoList.append(li[0]);
            //     const img = li[1];
            //     const ctx = li[2];
            //     const btnUpdate = ctx.querySelector("." + CSS_REF.WORD_ITEM_UPDATE_BUTTON)
            //     const btnDelete = ctx.querySelector("." + CSS_REF.WORD_ITEM_DELETE_BUTTON)
            //     fromEvent(btnUpdate, "click").subscribe(() => {
            //
            //
            //         const changeEng = prompt("바꿀 eng 값을 입력해주세요", item.eng);
            //         const changeKor = prompt("바꿀 kor 값을 입력해주세요", item.kor);
            //         this.vm.updateWordItem(dictEntity.id, itemIdx, item,changeEng, changeKor);
            //
            //         console.log(changeEng, changeKor)
            //
            //     })
            //     fromEvent(btnDelete, "click").subscribe(() => {
            //         const isDelete = confirm("삭제시 복구 못하는데 할거??");
            //         this.vm.removeWordItem(isDelete, dictEntity.id, itemIdx);
            //
            //
            //     })
            //     fromEvent(img, "click").subscribe(() => {
            //         const wordId = dictEntity.id;
            //         if (ctx.style.visibility === "visible") {
            //             ctx.style.visibility = "hidden"
            //         } else {
            //             ctx.style.visibility = "visible"
            //         }
            //     })
            //     this.korRegTag = document.querySelectorAll(".korean")
            //     this.engRegTag = document.querySelectorAll(".english")
            // });
        });
        this.vm.obInputWordItemEng.subscribe((value) => {
            this.inputWordItemEng.value = value
        });
        this.vm.obInputWordItemKor.subscribe((value) => {
            this.inputWordItemKor.value = value
        });
        this.vm.obCurrentDictionaryInfo.subscribe((dict) => {
            if (dict) {
                this.wordTitle.textContent = dict.wordName;
                this.inputWrapper.style.visibility = "visible"
                this.inputWrapper.style.visibility = ViewState.VISIBLE
                this.wordToolsWrapper.style.visibility = ViewState.VISIBLE

                this.wordInfoList.innerHTML = "";
                const wordList = dict.data
                console.log("ob",dict)
                wordList.map((item, itemIdx) => {
                    const dictEntity = this.vm.obCurrentDictionaryInfo.getValue();
                    const li = WordItemLayout(item.eng, item.kor, dictEntity.id);
                    this.wordInfoList.append(li[0]);
                    const img = li[1];
                    const ctx = li[2];
                    const btnUpdate = ctx.querySelector("." + CSS_REF.WORD_ITEM_UPDATE_BUTTON)
                    const btnDelete = ctx.querySelector("." + CSS_REF.WORD_ITEM_DELETE_BUTTON)
                    fromEvent(btnUpdate, "click").subscribe(() => {


                        const changeEng = prompt("바꿀 eng 값을 입력해주세요", item.eng);
                        const changeKor = prompt("바꿀 kor 값을 입력해주세요", item.kor);
                        this.vm.updateWordItem(dictEntity.id, itemIdx, item,changeEng, changeKor);

                        console.log(changeEng, changeKor)

                    })
                    fromEvent(btnDelete, "click").subscribe(() => {
                        const isDelete = confirm("삭제시 복구 못하는데 할거??");
                        this.vm.removeWordItem(isDelete, dictEntity.id, itemIdx);


                    })
                    fromEvent(img, "click").subscribe(() => {
                        const wordId = dictEntity.id;
                        if (ctx.style.visibility === "visible") {
                            ctx.style.visibility = "hidden"
                        } else {
                            ctx.style.visibility = "visible"
                        }
                    })
                    this.korRegTag = document.querySelectorAll(".korean")
                    this.engRegTag = document.querySelectorAll(".english")
                });
            }

        })
        this.vm.obWordListCtxMenuToggle.subscribe((value) => {
            console.log(value.state);
            if (!value.wrapper || !value.menuRef) {
                return;
            }
            if (value.state) {
                value.menuRef.visibility = "visible"
            } else {
                value.menuRef.visibility = "hidden"
            }
        })


    }
}

export default View;