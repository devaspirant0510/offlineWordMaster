import WordEntity from "../Data/entity/WordEntity";
import {MapperWordNames, MapperWordNamesOne} from "./Mapper/Mapper";

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
     * @returns {Promise<Array<DictionaryNames>>}
     */
    async getWordList() {
        const getAllWord = await this.repo.readAll();
        return MapperWordNames(getAllWord)
    }

    /**
     * 단어장 리스트에서 첫번째 아이템을 리턴함
     * @returns {Promise<WordEntity>}
     */
    async getWordFirstElement(){
        const getFirstWord = (await this.getWordList())[0];
        return await this.getWordInfos(getFirstWord.id);
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
        if(getDictionary[0]){
            return getDictionary[0];
        }
        return null
    }
    async getDictionaryById(index){
        const getDictionary = await this.repo.readAll();
        const getOneDict = getDictionary.find(dict=>dict.id===index)
        if(getOneDict){
            return getOneDict;
        }else{
            return null
        }
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

    /**
     *
     * @param {number} id
     * @param {string} changeName
     * @returns {Promise<DictionaryEntity[]>}
     */
    async updateWordName(id, changeName) {
        const readAll = await this.repo.readAll();
        const validName = readAll.filter(item => item.wordName === changeName)
        if (validName.length === 0) {
            return await this.repo.updateWordHeader(id, changeName);

        } else {
            throw new Error("There are duplicate values, 'wordName' must be a unique name")
        }
    }

    /**
     *
     * @param {number} id
     * @returns {Promise<DictionaryEntity[]>}
     */
    async removeWordName(id) {
        const removeResult = await this.repo.removeWordHeader(id)
        return await this.repo.removeWordHeader(id);
    }

    /**
     *
     * @param {string} wordName
     * @returns {Promise<DictionaryNames>}
     */
    async addDictionary(wordName) {
        const readAll = await this.repo.readAll();
        // 중복된 값이 있는지 확인
        const validName = readAll.filter(item => item.wordName === wordName)
        if (validName.length === 0) {
            // word 추가후 추가한 데이터 리턴
            const resultIndex = await this.repo.addWordHeader(wordName)
            const dict = await this.repo.readOne(resultIndex)
            return MapperWordNamesOne(dict)
        } else {
            // 중복된 값이 있을시
            throw new Error("There are duplicate values, 'wordName' must be a unique name")
        }
    }

    /**
     *
     * @param {index} wordIndex
     * @param {string} kor
     * @param {string} eng
     * @returns {Promise<WordEntity[]>}
     */
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

    /**
     *
     * @param wordList {WordEntity[]}
     * @returns {Promise<WordEntity[]>}
     */
    async getShuffleWord(wordList){
        let rangeArr = Array.from({length:wordList.length},(_, idx)=>idx)
        rangeArr = rangeArr.sort(()=>Math.random()-0.5)
        /** @type {WordEntity[]} */
        let shuffleWordList = []
        rangeArr.map(v=>{
            shuffleWordList.push(wordList[v])
        })
        return shuffleWordList
    }


}

export default Service;