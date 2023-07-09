import WordEntity from "../Data/entity/WordEntity";
import Repository from "../Data/repository/Repository"
import WordNames from "./model/WordNames";

class Service {
     /**
     * @param {Repository} repository 
     */
    constructor(repository) {
        if(Service.instance){
            return Service.instance
        }
        Service.instance = this;
        this.repo = repository
    }
    /**
     * @returns {Promise<Array<WordNames>>}
     */
    async getWordList() {
        /** @type {Array<WordNames>} */
        const wordNames = []
        const getAllWord = await this.repo.readAll();
        getAllWord.map(value => {
            wordNames.push(new WordNames(value.id,value.wordName));
        })
        return wordNames
    }

    /**
     * 단어장 리스트에서 첫번째 아이템을 리턴함
     * @returns {Promise<WordEntity>}
     */
    async getWordFirstElement(){
        const getFirstWord = (await this.getWordList())[0];
        const getFirstDictionary = await this.getWordInfos(getFirstWord.id);
        return getFirstDictionary;
    }
    async getAllDictionary(){
        return await this.repo.readAll()
    }

    /**
     * 첫번째 Dictionary 를 리턴하고 Dictionary 데이터가 없을시 null 리턴
     * @returns {Promise<DictionaryEntity|null>}
     */
    async getFirstDictionary(){
        const getDictionary = await this.repo.readAll()
        if(getDictionary.length>0){
            return getDictionary[0];
        }
        return null
    }
    async getOneDictionary(index){

    }

    /**
     * @param {number} index 
     * @returns {Promise<Array<WordEntity>>}
     */
    async getWordInfos(index) {
        const res = await this.repo.readOne(index)
        if (res) {
            return res.data
        }
        return null;

    }

    async updateWordName(id, changeName) {
        const readAll = await this.repo.readAll();
        const validName = readAll.filter(item => item.wordName === changeName)
        if (validName.length === 0) {
            return await this.repo.updateWordHeader(id, changeName);

        } else {
            throw new Error("There are duplicate values, 'wordName' must be a unique name")
        }
    }
    async removeWordName(id) {
        return await this.repo.removeWordHeader(id);
    }

    /**
     *
     * @param {string} wordName
     * @returns {Promise<DictionaryEntity>}
     */
    async addWord(wordName) {
        const readAll = await this.repo.readAll();
        // 중복된 값이 있는지 확인
        const validName = readAll.filter(item => item.wordName === wordName)
        if (validName.length === 0) {
            // word 추가후 추가한 데이터 리턴
            const resultIndex = await this.repo.addWordHeader(wordName)
            return await this.repo.readOne(resultIndex)
        } else {
            // 중복된 값이 있을시
            throw new Error("There are duplicate values, 'wordName' must be a unique name")
        }
    }

    async addWordItem(wordIndex, kor, eng) {
        const entity = new WordEntity(kor, eng);
        return await this.repo.addWordItem(wordIndex, entity);
    }

    /**
     *
     * @param wordId {number}
     * @param wordItemIdx {number}
     * @return {Promise<WordEntity[]|null>}
     */
    async removeWordItem(wordId,wordItemIdx){
        const getOne = await this.repo.readOne(wordId);
        let listToRemove = getOne.data;
        listToRemove = listToRemove.filter((value, index) => index!==wordItemIdx)
        const resultEntity = {...getOne,data:listToRemove}
        const result = await this.repo.removeWordItem(wordId,resultEntity)
        console.log(result)
        if(result>0){
            return  await this.repo.getWordItemList(wordId);
        }
        throw new Error("remove word Item failed....");
    }

    async updateWordItem(wordId,wordItemIdx,changeKor,changeEng){
        const newWord = new WordEntity(changeKor,changeEng);
        const getOne = await this.repo.readOne(wordId);
        let listToUpdate = getOne.data;
        listToUpdate = listToUpdate.map((item,itemIdx)=>{
            if(itemIdx===wordItemIdx){
                return newWord
            }else{
                return item;
            }
        })
        console.log(listToUpdate);
        const result = await this.repo.updateWordItemList(wordId,listToUpdate);
        if (result>0){
            const updateList =  await this.repo.getWordItemList(wordId);
            console.log(updateList)
            return updateList;
        }
        throw new Error("Update Word List Item Failed...");


    }
    activeTest(){
        
    }


}

export default Service;