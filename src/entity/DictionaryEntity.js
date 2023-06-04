//@ts-check
import WordEntity from "./WordEntity"

class DictionaryEntity{
    /**
     * 
     * @param {string} wordName 
     * @param {Array<WordEntity>} data 
     * @param {number} id
     */
    constructor(wordName,data,id){
        this.wordName = wordName;
        this.data = data;
        this.id = id
    }
}

export default DictionaryEntity