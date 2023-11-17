import React, { FC } from 'react';
import WordEntity from '../../../data/entity/WordEntity.ts';
import { useQuery } from '@tanstack/react-query';
import { repo } from '../../../pages/main/App.tsx';
import { useMainStore } from '../../../domain/store/useMainStore.ts';

interface Props {
	children?: React.ReactNode;
	wordList:WordEntity[]
}

const WordList: FC<Props> = ({}) => {
	const { isLoading,  } = useQuery({ queryKey: ['myKey'], queryFn: () => repo.readAllDictionary() });
	const {curPage} = useMainStore();
	if(isLoading ){
		return <>loading</>
	}
	if(curPage===undefined){
		return <>loading</>
	}
	return (
		<div style={{height:'100%'}} >
			{curPage.data.map(word=>{
				return (<div key={Math.random()}>{word.eng}{word.kor}</div>)
			})}
		</div>
	);
};

export default WordList;