// @ts-check
import DBManager from "../../utils/DBManager"
import WordEntity from "../entity/WordEntity"
import DictionaryEntity from "../entity/DictionaryEntity"

class Repository {
    /**
     * @param {string} wordTitle 
     */
    constructor(wordTitle) {
        this.fakeDatabase = {
            "chatper1": [
                { "eng": "apple", "kor": "사과" }
            ]
        }
        /** @type {string} */
        this.dbName = "wordDictionary"
        this.wordTitle = wordTitle;
        this.dm = new DBManager()

    }

    /**
     * @returns {Promise<Array<DictionaryEntity>>}
     */
    async readAll() {
        /**
         * TODO : openDB 후 close , 데코레이터로 openDB 생략
         */
        const reqDB = this.dm.openDB()
        let store = await this.dm.getObjectStore(reqDB)
        const result = await this.dm.transactionMapper(store.getAll())
        return result;
    }
    async addWordHeader(wordName){
        const reqDB = this.dm.openDB();
        let store = await this.dm.getObjectStore(reqDB)
        const data = new DictionaryEntity(wordName,[])
        const addReq = store.add(data)
        console.log("addwordheaer",addReq);
        
        const result = await this.dm.transactionMapper(addReq)
        return result;
    }
    async updateWordHeader(wordId,wordName){
        const reqDB = this.dm.openDB();
        const store = await this.dm.getObjectStore(reqDB);
        const getReq = store.get(wordId);
        const resGetIdx = await this.dm.transactionMapper(getReq);
        resGetIdx.wordName = wordName; 
        const resultPut = await this.dm.transactionMapper(store.put(resGetIdx));
        const resultGet = await this.dm.transactionMapper(store.getAll())
        return resultGet;
    }

    async removeWordHeader(wordId){
        const reqDB = this.dm.openDB();
        const store = await this.dm.getObjectStore(reqDB);
        const rmReq = store.delete(wordId);
        const result = await this.dm.transactionMapper(rmReq);
        console.log("rm",result);
        const resultGet = await this.dm.transactionMapper(store.getAll())
        console.log(resultGet);
        
        return resultGet;

    }

    /**
     * 
     * @param {number} index 
     * @returns {Promise<DictionaryEntity>}
     */
    async readOne(index){
        const reqDB = this.dm.openDB();
        let store = await this.dm.getObjectStore(reqDB)
        store = store.get(index);
        const result = await this.dm.transactionMapper(store)
        return result
    }

    /**
     * 
     * @param {string} wordName 
     * @returns {Promise<number>}
     */
    async createWordOne(wordName){
        const reqDB = this.dm.openDB()
        const store = await this.dm.getObjectStore(reqDB);
        const reqAdd = store.add({wordName:wordName,data:[]})
        const result = await this.dm.transactionMapper(reqAdd)
        return result;
    }
    async addWordItem(wordIndex,wordEntity){
        const reqDB = this.dm.openDB();
        const store = await this.dm.getObjectStore(reqDB);
        const getReq = store.get(wordIndex);
        console.log("getREq",getReq);
        
        const resGetIdx = await this.dm.transactionMapper(getReq);
        resGetIdx.data = [...resGetIdx.data,wordEntity]
        store.put(resGetIdx)
        return resGetIdx.data;
    }
    /**
     * @returns {string[]}
     */
    getDataBaseWord() {
        return Object.keys(this.fakeDatabase);
    }
}
export default Repository;