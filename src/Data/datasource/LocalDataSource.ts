import DBManager from './DBManager.ts';
import DictionaryEntity from '../entity/DictionaryEntity.ts';

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
}

export default LocalDataSource;