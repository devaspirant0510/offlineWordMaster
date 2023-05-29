import Repository from "./Repository";

class Service{
    /**
     * 
     * @param {Repository} repository 
     */
    constructor(repository){
        this.repo = repository
    }
    getWordList(){
        const data = this.repo.getDataBaseWord()
        if (data.length===0){
            return null;
        }
        return data
    }

}

export default Service;