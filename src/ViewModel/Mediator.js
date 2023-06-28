import BaseViewModel from "../utils/Base/BaseViewModel";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import ViewModel from "./ViewModel";

class Mediator{
    /**
     * 
     */
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
    /**
     * 
     * @returns {DictionaryEntity}
     */
    getWordList(){
        /** @type {ViewModel} */
        const vm = this.viewModels.find((vm)=>vm instanceof ViewModel)
        if(vm){
            console.log(vm.obCurrentWordInfo.getValue());
            return vm.obCurrentWordInfo.getValue();
        } 
        return null;
    }
}

export default Mediator;