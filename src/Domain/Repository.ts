import DictionaryEntity from '../data/entity/DictionaryEntity.ts';
import WordEntity from '../data/entity/WordEntity.ts';

interface Repository{
	readAllDictionary():Promise<DictionaryEntity[]>
	createOneDictionary(dict:DictionaryEntity):Promise<DictionaryEntity>
	createOneWord(id:IDBValidKey,word:WordEntity):Promise<DictionaryEntity>
}
export default Repository;