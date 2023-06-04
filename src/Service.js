//@ts-check
import Repository from "./Repository";

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
     * 임시 데이터 
     * @returns {Promise<number[]>}
     */
    async addDummyData(){
        const add1 = await this.repo.createWordOne("chapter1")
        const add2 = await this.repo.createWordOne("chapter2")
        const add3 = await this.repo.createWordOne("chapter3")
        return [add1,add2,add3]
    }
    async getWord(index){


    }
    async getWordTitle(){

    }

}

export default Service;