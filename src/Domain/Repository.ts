import DictionaryEntity from '../data/entity/DictionaryEntity.ts';
import WordEntity from '../data/entity/WordEntity.ts';

interface Repository{
	readAllDictionary():Promise<DictionaryEntity[]|null>
	readOneDictionary(key?:IDBValidKey):Promise<DictionaryEntity|null>
	createOneDictionary(dict:DictionaryEntity):Promise<DictionaryEntity|null>
	createOneWord(id:IDBValidKey,word:WordEntity):Promise<DictionaryEntity|null>
	deleteDictionaryById(id:IDBValidKey):Promise<IDBValidKey>
}
export default Repository;