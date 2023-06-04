import ViewModel from "./ViewModel";

class View{
    /**
     * 
     * @param {ViewModel} viewModel 
     */
    constructor(viewModel){
        this.vm = viewModel
        this.settingDom()
        this.settingEvent()
        this.dataBiniding()
        viewModel.init()
    }
    settingEvent(){
        this.btnAddWord.addEventListener("click",()=>{

        })

    }
    settingDom(){
        /**@type {HTMLElement} */
        this.mainSection = document.querySelector("#section-word-list");
        /**@type {HTMLElement} */
        this.wordList = document.querySelector("#li-word-list");
        /**@type {HTMLElement} */
        this.wordTitle = document.querySelector("#h2-word-title")
        /**@type {HTMLElement} */
        this.inputWordName = document.querySelector("#input-word-name");
        /**@type {HTMLElement} */
        this.btnAddWord = document.querySelector("#btn-add-word");
    }
    dataBiniding(){
        this.vm.obWordList.subscribe((value)=>{
            value.map(item=>{
                const li = document.createElement("li");
                li.textContent = item.wordName;
                this.wordList.append(li);
                li.addEventListener("click",(e)=>{
                    this.vm.wordTitle = item.wordName
                })
            })
        })

        this.vm.obWordTitile.subscribe((value)=>{
            this.wordTitle.textContent = value
        })

        this.inputWordName.addEventListener("input",(e)=>{
            this.vm.obInputWord.next(e.target.value)
        })
    }
}

export default View;