import React, { FC, useCallback, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useMainStore } from '../../../domain/store/useMainStore.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RepoContext } from '../../../main.tsx';
import DictionaryEntity from '../../../data/entity/DictionaryEntity.ts';

interface Props {
	children?: React.ReactNode;
	isOpen: boolean,
	handleClose: () => void
}

const RemoveDictionaryDialog: FC<Props> = ({ isOpen, handleClose }) => {
	const repo = useContext(RepoContext);
	const queryClient = useQueryClient();
	const { isLoading, data } = useQuery({ queryKey: ['myKey'], queryFn: () => repo.readAllDictionary() });
	const { mutate } = useMutation({
		mutationFn: (data: IDBValidKey) => {
			return repo.deleteDictionaryById(data);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['myKey'], (prev: DictionaryEntity[]) => {
				console.log('delete');
				console.log(prev, data);
				return prev;
			});

		},


	});
	const { curPage } = useMainStore();

	const onClickRemove = useCallback(() => {
		if (curPage === undefined || curPage.id === undefined) {
			return;
		}
		mutate(curPage.id);


	}, [curPage]);
	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>단어장 삭제</DialogTitle>
			<DialogContent>
				<DialogContentText>
					단어장을 삭제할경우 복구할 수 없어요
				</DialogContentText>
				<DialogContentText>
					정말 삭제하시겠습니까?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClickRemove}>삭제</Button>
				<Button>취소</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RemoveDictionaryDialog;