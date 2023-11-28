import React, { FC } from 'react';
import WordEntity from '../../../data/entity/WordEntity.ts';
import { useQuery } from '@tanstack/react-query';
import { repo } from '../../../pages/main/App.tsx';
import { useMainStore } from '../../../domain/store/useMainStore.ts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Props {
	children?: React.ReactNode;
	wordList: WordEntity[];
}

const WordList: FC<Props> = ({}) => {
	const { isLoading } = useQuery({ queryKey: ['myKey'], queryFn: () => repo.readAllDictionary() });
	const { curPage ,isShowKor,isShowEng} = useMainStore();
	if (isLoading) {
		return <>loading</>;
	}
	if (curPage === undefined) {
		return <>loading</>;
	}
	return (
		<Paper sx={{ width: '100%' }}>
			<TableContainer sx={{ maxHeight: '60vh' }}>

				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							<TableCell>id</TableCell>
							<TableCell>영어뜻</TableCell>
							<TableCell>한국어뜻</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{curPage.data.map((word, idx) => {
							return (
								<TableRow key={idx}>
									<TableCell>
										{idx+1}
									</TableCell>
									<TableCell>
										{isShowEng && word.eng}
									</TableCell>
									<TableCell>
										{isShowKor && word.kor}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>

				</Table>

			</TableContainer>

		</Paper>
	);
};

export default WordList;