import ViewModel from "./ViewModel";

class View{
    /**
     * 
     * @param {ViewModel} viewModel 
     */
    constructor(viewModel){
        this.vm = viewModel
        this.mainSection = document.querySelector("#section-word-list");
        this.wordList = document.querySelector("#li-word-list");
        this.dataBiniding()
        viewModel.init()
    }
    dataBiniding(){
        this.vm.obWordList.subscribe((value)=>{
            console.log(value);
            console.log(value);
            
            value.map(item=>{
                const li = document.createElement("li");
                li.textContent = item;
                this.wordList.append(li);
            })

        })

    }
}

export default View;