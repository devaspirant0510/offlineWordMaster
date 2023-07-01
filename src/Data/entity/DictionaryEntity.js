//@ts-check
import WordEntity from "./WordEntity"

class DictionaryEntity{
    /**
     * 
     * @param {string} wordName 
     * @param {Array<WordEntity>} data 
     */
    constructor(wordName,data){
        this._wordName = wordName;
        this._data = data;
        this._id ;
    }
    set id(val){
        this._id = val
    }
    get id(){
        return this._id
    }

    set wordName(val) {
        this._wordName = val;
    }

    get wordName(){
        return this._wordName;
    }

    set data(val){
        this._data = val;
    }

    get data(){
        return this._data
    }

}

export default DictionaryEntity