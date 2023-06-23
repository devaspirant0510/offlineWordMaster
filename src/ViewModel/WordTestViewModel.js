import {BehaviorSubject} from "rxjs";

class WordTestViewModel{
    constructor(service){
        this.service = service
        /** @type {BehaviorSubject<boolean>} */
        this.obTestVisible = new BehaviorSubject(false);
    }

    onClickTestButton(){
        this.obTestVisible.next(
            !this.obTestVisible.getValue()
        )
    }

}

export default WordTestViewModel;