import WordEntity from './WordEntity.ts';

interface DictionaryEntity {
	wordName: string,
	data: WordEntity[]
	id?: number
}

export default DictionaryEntity;