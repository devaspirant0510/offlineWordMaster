import Repository from '../../domain/Repository.ts';
import DictionaryEntity from '../entity/DictionaryEntity.ts';
import LocalDataSource from '../datasource/LocalDataSource.ts';
import WordEntity from '../entity/WordEntity.ts';

class RepositoryImpl implements Repository{
	private local:LocalDataSource
	constructor(local:LocalDataSource) {
		this.local = local;
	}
	async readAllDictionary(): Promise<DictionaryEntity[]|null> {
		return await this.local.loadAllDictionary()
	}

	async createOneDictionary(dict: DictionaryEntity): Promise<DictionaryEntity|null> {
		return await this.local.saveDictionary(dict)
	}

	async createOneWord(id:IDBValidKey,word: WordEntity): Promise<DictionaryEntity|null> {
		return await this.local.saveWord(id,word);
	}

	async deleteDictionaryById(id: IDBValidKey): Promise<IDBValidKey> {
		return await this.local.saveRemoveDictionary(id)
	}

	async readOneDictionary(key?:IDBValidKey): Promise<DictionaryEntity|null> {
		return await this.local.loadOneDictionary(key);
	}

	async readOneWordList(key?:IDBValidKey):Promise<WordEntity[]|null>{
		const dict = await this.readOneDictionary(key)
		if(dict?.data){
			return dict.data;
		}else{
			return null
		}
	}


}
export default RepositoryImpl;