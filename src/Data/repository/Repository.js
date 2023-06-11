// @ts-check
import DBManager from "../../utils/DBManager"
import DictionaryEntity from "../entity/DictionaryEntity"

class Repository {
    /**
     * @param {string} wordTitle 
     */
    constructor(wordTitle) {
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
    async addWordHeader(wordName){
        let store = await this.dm.getObjectStore2()
        const data = new DictionaryEntity(wordName,[])
        const addReq = store.add(data)
        return await this.dm.transactionMapper(addReq);
    }
    async updateWordHeader(wordId,wordName){
        const store = await this.dm.getObjectStore2();
        const getReq = store.get(wordId);
        const resGetIdx = await this.dm.transactionMapper(getReq);
        resGetIdx.wordName = wordName; 
        const resultPut = await this.dm.transactionMapper(store.put(resGetIdx));
        return await this.dm.transactionMapper(store.getAll());
    }

    async removeWordHeader(wordId){
        const reqDB = this.dm.openDB();
        const store = await this.dm.getObjectStore(reqDB);
        const rmReq = store.delete(wordId);
        return await this.dm.transactionMapper(store.getAll());
    }

    /**
     * 
     * @param {number} index 
     * @returns {Promise<DictionaryEntity>}
     */
    async readOne(index){
        let store = await this.dm.getObjectStore2();
        store = store.get(index);
        return await this.dm.transactionMapper(store)
    }

    /**
     * 
     * @param {string} wordName 
     * @returns {Promise<number>}
     */
    async createWordOne(wordName){
        const store = await this.dm.getObjectStore2();
        const reqAdd = store.add({wordName:wordName,data:[]})
        const result = await this.dm.transactionMapper(reqAdd)
        return result;
    }
    async addWordItem(wordIndex,wordEntity){
        const store = await this.dm.getObjectStore2()
        const getReq = store.get(wordIndex);
        const resGetIdx = await this.dm.transactionMapper(getReq);
        resGetIdx.data = [...resGetIdx.data,wordEntity]
        store.put(resGetIdx)
        return resGetIdx.data;
    }
}
export default Repository;