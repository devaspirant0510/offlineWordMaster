//@ts-check
import Repository from "./Repository";
import WordEntity from "./entity/WordEntity";

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
    async addDummyWordData(value){
        const res = await this.repo.createWordDummy(value)
        console.log(res);
        
        return res;

    }
    /**
     * @param {number} index 
     * @returns {Promise<Array<WordEntity>>}
     */
    async getWordInfos(index){
        const res = await this.repo.readOne(index)
        return res.data
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
        await this.repo.addWordItem(wordIndex,entity);
    }


}

export default Service;