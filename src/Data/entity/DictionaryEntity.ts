import WordEntity from './WordEntity.ts';

interface DictionaryEntity {
	wordName: string,
	data: WordEntity[]
	id?: IDBValidKey
}

export default DictionaryEntity;