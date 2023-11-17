import Repository from '../../domain/Repository.ts';
import DictionaryEntity from '../entity/DictionaryEntity.ts';
import LocalDataSource from '../datasource/LocalDataSource.ts';

class RepositoryImpl implements Repository{
	local:LocalDataSource
	constructor(local:LocalDataSource) {
		this.local = local;
	}
	async readAllDictionary(): Promise<DictionaryEntity[]> {
		return await this.local.loadAllDictionary()
	}

	async createOneDictionary(dict: DictionaryEntity): Promise<DictionaryEntity> {
		return await this.local.saveDictionary(dict)
	}

}
export default RepositoryImpl;