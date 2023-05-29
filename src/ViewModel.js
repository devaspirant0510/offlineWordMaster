import {Subject} from "rxjs"
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
        const data = this.service.getWordList();
        console.log(data);
        this.obWordList.next(this.service.getWordList())
    }

}
export default ViewModel;