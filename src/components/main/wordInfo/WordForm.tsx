import React, { FC, useCallback, useContext } from 'react';
import { Button, TextField } from '@mui/material';
import useInput from '../../../hooks/useInput.ts';
import Repository from '../../../domain/Repository.ts';
import { RepoContext } from '../../../main.tsx';
import { useMainStore } from '../../../domain/store/useMainStore.ts';
import WordEntity from '../../../data/entity/WordEntity.ts';
import { useQueryClient ,useMutation} from '@tanstack/react-query';
import DictionaryEntity from '../../../data/entity/DictionaryEntity.ts';

interface Props {
	children?: React.ReactNode;
}
interface CreateWordModel{
	id:IDBValidKey,
	wordModel:WordEntity
}
const WordForm: FC<Props> = () => {
	const useRepo = useContext<Repository>(RepoContext);
	const queryClient = useQueryClient();
	const {curPage,setCurPage} = useMainStore();
	const [inputKor,onChangeKor,setKor] = useInput("");
	const [inputEng,onChangeEng,setEng] = useInput("");


	const { mutate } = useMutation({
		mutationFn: (model:CreateWordModel) => {
			return useRepo.createOneWord(model.id,model.wordModel);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['myKey'], (prev:DictionaryEntity[]) => {
				console.log("prev");
				const result = prev.reduce((acc:DictionaryEntity[],element)=>{
					if(data.id===element.id){
						acc.push(element);
					}else{
						acc.push(element)
					}
					return acc
				},[])
				setCurPage(data)
				return result

			});
		},
		onError: (error:Error) => {
			console.log('error', error);
		},

	});
	const onSubmitCreateWord = useCallback(async ()=>{
		if(curPage && curPage.id){
			mutate({id:curPage.id,wordModel:{kor:inputKor,eng:inputEng}})
			setKor('');
			setEng('');
		}


	},[inputKor,inputEng,curPage])
	return (
		<div style={{height:'100%',display:'flex'}}>
			<TextField
				style={{flex:'1 1 auto'}}
				value={inputEng}
				onChange={onChangeEng}
				label="영어"
			/>
			<TextField
				style={{flex:'1 1 auto'}}
				value={inputKor}
				onChange={onChangeKor}
				label="한글"
			/>
			<Button
				onClick={onSubmitCreateWord}
				variant="outlined"
			>
				생성
			</Button>
		</div>
	);
};

export default WordForm;