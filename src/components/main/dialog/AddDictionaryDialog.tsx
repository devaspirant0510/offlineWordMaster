import React, { FC, useCallback, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DictionaryEntity from '../../../data/entity/DictionaryEntity.ts';
import Repository from '../../../domain/Repository.ts';
import { RepoContext } from '../../../main.tsx';
import useInput from '../../../../../../../pipecoding/CodeRoom/CodeRoom/src/hooks/useInput.ts';

interface Props {
	children?: React.ReactNode;
	isOpen: boolean,
	handleClose: () => void
}

const AddDictionaryDialog: FC<Props> = ({ isOpen, handleClose }) => {
	const useRepo = useContext<Repository>(RepoContext);
	const queryClient = useQueryClient();
	const [wordName,onChangeWordName,setWordName] = useInput('')
	const { mutate } = useMutation({
		mutationFn: (data: DictionaryEntity) => {
			return useRepo.createOneDictionary(data);
		},
		onSuccess: (data) => {
			queryClient.setQueryData(['myKey'], (prev: DictionaryEntity[]) => {
				return [...prev, data];
			});
			console.log(data);
		},
		onError: (error) => {
			console.log('error', error);
		},

	});
	const onSubmitCreateDict = useCallback(()=>{
		mutate({
			data:[],
			wordName:wordName
		})
		setWordName('')
		handleClose()

	},[wordName])
	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogTitle>단어장 생성</DialogTitle>
			<DialogContent>
				<DialogContentText>생성할 단어장의 이름을 입력해주세요</DialogContentText>
				<TextField
					margin="dense"
					placeholder="단어장이름"
					label={"wordName"}
					value={wordName}
					onChange={onChangeWordName}
					fullWidth
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>취소</Button>
				<Button onClick={onSubmitCreateDict}>확인</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddDictionaryDialog;