// @ts-check
import DBManager from "../../utils/DBManager"
import DictionaryEntity from "../entity/DictionaryEntity"

class Repository {
    constructor() {
        this.dm = new DBManager()
    }

    /**
     * @returns {Promise<Array<DictionaryEntity>>}
     */
    async readAll() {
        /**
         * TODO : openDB 후 close , 데코레이터로 openDB 생략
         */
        let store = await this.dm.getObjectStore2()
        return await this.dm.transactionMapper(store.getAll());
    }

    async addWordHeader(wordName) {
        try{
            let store = await this.dm.getObjectStore2()
            const data = new DictionaryEntity(wordName, [])
            const addReq = store.add(data)
            return await this.dm.transactionMapper(addReq);
        }catch (e){
            console.log(e)
        }
    }

    /**
     *
     * @param {number} wordId
     * @param {string} wordName
     * @returns {Promise<DictionaryEntity[]>}
     */
    async updateWordHeader(wordId, wordName) {
        const store = await this.dm.getObjectStore2();
        const getReq = store.get(wordId);
        const resGetIdx = await this.dm.transactionMapper(getReq);
        resGetIdx.wordName = wordName;
        const resultPut = await this.dm.transactionMapper(store.put(resGetIdx));
        return await this.dm.transactionMapper(store.getAll());
    }

    /**
     *
     * @param {number} wordId
     * @returns {Promise<DictionaryEntity[]>}
     */
    async removeWordHeader(wordId) {
        try{
            const store = await this.dm.getObjectStore2();
            store.delete(wordId);
            return await this.dm.transactionMapper(store.getAll());
        }catch (e){
            console.log(e)
        }
    }

    /**
     *
     * @param {number} index
     * @returns {Promise<DictionaryEntity>}
     */
    async readOne(index) {
        try{
            let store = await this.dm.getObjectStore2();
            store = store.get(index);
            return await this.dm.transactionMapper(store)
        }catch (e){
            console.log(e)
        }
    }

    /**
     *
     * @param {string} wordName
     * @returns {Promise<number>}
     */
    async createWordOne(wordName) {
        const store = await this.dm.getObjectStore2();
        const reqAdd = store.add({wordName: wordName, data: []})
        const result = await this.dm.transactionMapper(reqAdd)
        return result;
    }

    async addWordItem(wordIndex, wordEntity) {
        try {
            const store = await this.dm.getObjectStore2()
            const getReq = store.get(wordIndex);
            const resGetIdx = await this.dm.transactionMapper(getReq);
            console.log(resGetIdx);
            resGetIdx.data = [...resGetIdx.data, wordEntity]
            store.put(resGetIdx)
            return resGetIdx.data;
        }
        catch (e){
            console.log(e)
        }
    }

    async removeWordItem(wordId, wordEntity) {
        try {
            const store = await this.dm.getObjectStore2();
            const putReq =store.put(wordEntity);
            return await this.dm.transactionMapper(putReq);
        }catch (e){
            console.log(e)
        }
    }
    async getWordItemList(wordId){
        try{
            const store = await this.dm.getObjectStore2();
            const getOne = store.get(wordId);
            const result = await this.dm.transactionMapper(getOne);
            return result.data;
        }catch (e){
            console.log(e)
        }
    }
    async updateWordItemList(wordId,wordList){
        try {
            const store = await  this.dm.getObjectStore2();
            const getOne = store.get(wordId);
            const res = await this.dm.transactionMapper(getOne)
            const resultEntity = {...res,data:wordList};
            return await this.dm.transactionMapper(store.put(resultEntity))
        }catch (e){
            console.log(e)
        }

    }
}
export default Repository;