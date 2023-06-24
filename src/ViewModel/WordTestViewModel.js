import {BehaviorSubject} from "rxjs";
import BaseViewModel from "../utils/Base/BaseViewModel";

class WordTestViewModel extends BaseViewModel{
    constructor(service){
        super()
        this.service = service
        /** @type {BehaviorSubject<boolean>} */
        this.obTestVisible = new BehaviorSubject(false);
    }

}

export default WordTestViewModel;