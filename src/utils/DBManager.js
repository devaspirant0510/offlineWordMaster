import WordEntity from "../entity/WordEntity";

class DBManager {
    static dbname = "wordDictionary"
    static storeName = "myWords"
    static WORD_NAME_INDEX = "wordNameIndex"
    constructor() {
        this.initializeDB()
    }
    openDB(){
        return indexedDB.open(DBManager.dbname,1)
    }
    initializeDB(){
        const requets = this.openDB()
        requets.onupgradeneeded = (e)=>{
            const db = requets.result;
            if(!db.objectStoreNames.contains(DBManager.storeName)){
                const store = db.createObjectStore(DBManager.storeName,{keyPath:'id',autoIncrement:true})
                store.createIndex(DBManager.WORD_NAME_INDEX,"wordName",{unique:true})
            }
        }
    }
    async transactionMapper(requset){
        return new Promise((resolve,reject)=>{
            requset.onsuccess = (e)=>{
                console.log(e.target);
                resolve(e.target.result)
            }
            requset.onerror = ()=>{
                reject(new Error("error"))
            }
        })
    }
    async getObjectStore(req,options="readwrite"){
        const db = await this.transactionMapper(req)
        const tr =db.transaction([DBManager.storeName],options)
        return tr.objectStore(DBManager.storeName)
    }

    /**
     * @param {string} storeName 
     * @returns {WordEntity[]}
     */
    async getDBAll() {
        const request = this.openDB()
        const store = this.getObjectStore(request)
        const reqGetAll = store.getAll();
        const allDB = await this.transactionMapper(reqGetAll);
        return allDB;
    }



    async openDatabase() {
        const request = indexedDB.open(this.dbName, 1);
        const openDB = () => {
            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    resolve(request.result)
                }
                request.onerror = () => {
                    reject(new Error("failed to open Database"))
                }
            })
        }
        return openDB()

    }
    async createStore(storeName) {
        const db = await this.openDatabase()
        console.log(db);

        const tr = db.transaction(storeName, "readwrite");
        tr.objectStore(storeName)


    }
    /**
     * 
     * @param {string} storeName 
     */
    async getStore(storeName) {
        const db = await this.openDatabase();
        const tr = db.transaction(storeName, "readwrite");
        const os = tr.objectStore(storeName)
        console.log(os);

        return os;


    }
}
export default DBManager