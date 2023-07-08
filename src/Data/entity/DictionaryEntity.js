import WordEntity from "./WordEntity"

class DictionaryEntity{
    /**
     * 
     * @param {string} wordName 
     * @param {Array<WordEntity>} data 
     */
    constructor(wordName,data){
        this.wordName = wordName;
        this.data = data;
    }
}

export default DictionaryEntity