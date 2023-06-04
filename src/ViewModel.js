import {Subject,BehaviorSubject,pipe,map} from "rxjs"
import Service from "./Service"

class ViewModel{
    /**
     * 
     * @param {Service} service 
     */
    constructor(service){
        this.service = service

        /**@type {Subject<Array<{wordName:string,id:number}>>} */
        this.obWordList = new Subject();
        /**@type {BehaviorSubject<string>} */
        this.obInputWord = new BehaviorSubject();
        /**@type {Subject<string>} */
        this.obWordTitile = new Subject();


    }
    set wordTitle(wordname){
        this.obWordTitile.next(wordname)
    }
    init(){
        this.service.getWordList().then(result=>{
            this.obWordList.next(result)
        });
    }

}
export default ViewModel;