//@ts-check
import Repository from "../Data/repository/Repository";
import WordEntity from "../Data/entity/WordEntity";

class Service{
    /**
     * 
     * @param {Repository} repository 
     */
    constructor(repository){
        this.repo = repository
    }
    /**
     * @returns {Promise<Array<{wordName:string,id:number}>>}
     */
    async getWordList(){
        /** @type {Array<{wordName:string,id:number}>} */
        const wordNames = []
        const getAllWord = await this.repo.readAll();
        getAllWord.map(value=>{
            wordNames.push({
                wordName:value.wordName,
                id:value.id
            });
        })
        return wordNames
    }
    /**
     * @param {number} index 
     * @returns {Promise<Array<WordEntity>>}
     */
    async getWordInfos(index){
        const res = await this.repo.readOne(index)
        return res.data
    }

    async updateWordName(id,changeName){
        const res = await this.repo.updateWordHeader(id,changeName);
        return res;
    }

    async addWord(wordName){
        const readAll = await this.repo.readAll();
        const validName = readAll.filter(item=>item.wordName===wordName)
        
        if(validName.length===0){
            // word 추가후 추가한 데이터 리턴
            const resultIndex = await this.repo.addWordHeader(wordName)
            const resultData = await this.repo.readOne(resultIndex)
            return resultData
        }
        return null;
    }

    async addWordItem(wordIndex,kor,eng){
        const entity = new WordEntity(kor,eng);
        const list = await this.repo.addWordItem(wordIndex,entity);
        return list;
        
    }


}

export default Service;