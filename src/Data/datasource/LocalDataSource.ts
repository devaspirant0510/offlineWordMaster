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

	async saveDictionary(dict: DictionaryEntity) {
		const store = await this.dm.getObjectStore();
		const addReq = store.add(dict);

		const result = await this.dm.transactionMapper<IDBValidKey>(addReq);
		const addRequest = store.get(result);
		return await this.dm.transactionMapper<DictionaryEntity>(addRequest);
	}

	async saveWord(wordId:IDBValidKey,wordEntity:WordEntity){
		const store = await this.dm.getObjectStore()
		const resGetIdx = await this.dm.transactionMapper<DictionaryEntity>(store.get(wordId));
		console.log("resGetId",resGetIdx);
		resGetIdx.data = [...resGetIdx.data, wordEntity]
		const updateIdx = await this.dm.transactionMapper<IDBValidKey>(store.put(resGetIdx));
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