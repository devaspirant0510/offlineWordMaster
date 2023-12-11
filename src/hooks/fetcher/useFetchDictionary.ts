import { useQuery } from '@tanstack/react-query';
import { repo } from '../../pages/main/App.tsx';
import DictionaryEntity from '../../data/entity/DictionaryEntity.ts';

type ReturnType = {
	dictByKeyData?:DictionaryEntity|null,
	dictByKeyIsLoading:boolean,
	dictByKeyIsFetching:boolean,
	dictByKeyError:Error|null
}
export const useFetchDictionaryByKey = (key:IDBValidKey):ReturnType=>{
	const {data,isLoading,isFetching,error} = useQuery({
		queryKey:['dictionary',key],
		queryFn:()=>repo.readOneDictionary(key)
	})
	return {
		dictByKeyData:data,
		dictByKeyIsLoading:isLoading,
		dictByKeyIsFetching:isFetching,
		dictByKeyError:error
	}
}

export const useFetchWordListByKey = (key:IDBValidKey)=>{
	const {data,isLoading,isFetching,error} = useQuery({
		queryKey:['wordList',key],
		queryFn:()=>repo.readOneWordList(key)
	})
	return {
		wordListByKeyData:data,
		wordListIsLoading:isLoading,
		wordListByKeyIsFetching:isFetching,
		wordListByKeyError:error
	}

}