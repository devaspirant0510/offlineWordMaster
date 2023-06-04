// @ts-check
import DBManager from "./utils/DBManager"
import WordEntity from "./entity/WordEntity"
import DictionaryEntity from "./entity/DictionaryEntity"

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

    /**
     * 
     * @param {string} wordName 
     * @returns {T}
     */
    async createWordOne(wordName){
        const reqDB = this.dm.openDB()
        const store = await this.dm.getObjectStore(reqDB);
        const reqAdd = store.add({wordName:wordName,data:[]})
        const result = await this.dm.transactionMapper(reqAdd)
        return result;
    }
    /**
     * @returns {string[]}
     */
    getDataBaseWord() {
        return Object.keys(this.fakeDatabase);
    }
}
export default Repository;