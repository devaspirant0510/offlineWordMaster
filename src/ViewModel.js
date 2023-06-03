import {Subject,BehaviorSubject} from "rxjs"
class ViewModel{
    /**
     * 
     * @param {Service} service 
     */
    constructor(service){
        this.service = service
        this.obWordList = new Subject();
    }
    init(){
        this.service.getWordList().then(result=>{
            this.obWordList.next(result)
        });
    }

}
export default ViewModel;