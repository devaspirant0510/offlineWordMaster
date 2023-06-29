import BaseViewModel from "../utils/Base/BaseViewModel";
import DictionaryEntity from "../Data/entity/DictionaryEntity";
import ViewModel from "./ViewModel";
import WordTestViewModel from "./WordTestViewModel";

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

    testClear(){
        /** @type {WordTestViewModel} */
        const vm = this.viewModels.find((vm)=>vm instanceof WordTestViewModel)
        vm.init();
    }
}

export default Mediator;