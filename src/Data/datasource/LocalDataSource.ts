import DBManager from './DBManager.ts';
import DictionaryEntity from '../entity/DictionaryEntity.ts';
import WordEntity from '../entity/WordEntity.ts';

class LocalDataSource {
	dm: DBManager;

	constructor() {
		this.dm = new DBManager();
	}

	async loadAllDictionary() {
		const store = await this.dm.getObjectStore();
		return await this.dm.transactionMapper<DictionaryEntity[]>(store.getAll());
	}

	async loadOneDictionary(key?:IDBValidKey){
		if(!key) return null;
		const store = await this.dm.getObjectStore();
		console.log("sotregetkley",store.get(key));
		const result = await this.dm.transactionMapper<DictionaryEntity>(store.get(key))
		console.log(result);
		return result
	}

	async saveDictionary(dict: DictionaryEntity) {
		const store = await this.dm.getObjectStore();
		const addReq = store.add(dict);

		const result = await this.dm.transactionMapper<IDBValidKey>(addReq);
		if(!result) throw new Error()
		const addRequest = store.get(result);
		return await this.dm.transactionMapper<DictionaryEntity>(addRequest);
	}

	async saveWord(wordId:IDBValidKey,wordEntity:WordEntity){
		const store = await this.dm.getObjectStore()
		const resGetIdx = await this.dm.transactionMapper<DictionaryEntity>(store.get(wordId));
		if(!resGetIdx) throw new Error()
		console.log("resGetId",resGetIdx);
		resGetIdx.data = [...resGetIdx.data, wordEntity]
		const updateIdx = await this.dm.transactionMapper<IDBValidKey>(store.put(resGetIdx));
		if(!updateIdx) throw new Error()
		return await this.dm.transactionMapper<DictionaryEntity>(store.get(updateIdx))
	}
	async saveRemoveDictionary(wordId:IDBValidKey){
		const store = await this.dm.getObjectStore();
		const delReq = store.delete(wordId);
		await this.dm.transactionMapper(delReq);
		return wordId;


	}
}

export default LocalDataSource;