import DictionaryEntity from '../data/entity/DictionaryEntity.ts';

interface Repository{
	readAllDictionary():Promise<DictionaryEntity[]>
	createOneDictionary(dict:DictionaryEntity):Promise<DictionaryEntity>
}
export default Repository;