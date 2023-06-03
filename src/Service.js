import Repository from "./Repository";

class Service{
    /**
     * 
     * @param {Repository} repository 
     */
    constructor(repository){
        this.repo = repository
    }
    async getWordList(){
        const wordNames = []
        const getAllWord = await this.repo.readAll()
        getAllWord.map(value=>{
            wordNames.push(value.wordName)
        })
        return wordNames
    }
    async getWord(index){


    }
    async createWord(wordName){
        const result = await this.repo.createWord(wordName)
        if(result>0){
        }else{

        }
    }

}

export default Service;