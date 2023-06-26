import BaseViewModel from "../utils/Base/BaseViewModel";
import ViewModel from "./ViewModel";

class Mediator{
    constructor(){
        this.viewModels = [];

    }
    /**
     * 
     * @param {BaseViewModel} viewModel 
     */
    register(viewModel){
        this.viewModels.push(viewModel)
    }
    getWordList(){
        /** @type {ViewModel} */
        const vm = this.viewModels.find((vm)=>vm instanceof ViewModel)
        console.log(vm);
        if(vm){
            return vm.obCurrentWordInfo.getValue();
        } 
        return null;
    }
}

export default Mediator;