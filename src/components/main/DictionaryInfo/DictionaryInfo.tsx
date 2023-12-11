import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardContent, CardHeader, IconButton, Popover, Skeleton } from '@mui/material';
import { useMainStore } from '../../../store/useMainStore.ts';
import { MoreVert } from '@mui/icons-material';
import WordTools from '../wordInfo/WordTools.tsx';
import WordList from '../wordInfo/WordList.tsx';
import WordForm from '../wordInfo/WordForm.tsx';
import useDialogState from '../../../../../../../pipecoding/CodeRoom/CodeRoom/src/hooks/useDialogState.ts';
import RemoveDictionaryDialog from '../dialog/RemoveDictionaryDialog.tsx';
import { useQuery } from '@tanstack/react-query';
import { repo } from '../../../pages/main/App.tsx';
import { useParams } from 'react-router-dom';

interface Props {
	children?: React.ReactNode;
}

const DictionaryInfo: FC<Props> = () => {
	const {id} = useParams<{id:string}>();
	const parsedId: number = parseInt(id!);
	const { isLoading, data } = useQuery({ queryKey: ['myKey',id], queryFn: () => repo.readOneDictionary(parsedId) });
	const [isRmDictOpen, openRmDictDialog, closeRmDictDialog] = useDialogState();
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [isPopoverOpen, setPopover] = useState(false);
	useEffect(()=>{
		console.log(id);
		repo.readOneDictionary(id).then(r=>{
			console.log("useEffect",r);
		}).catch(e=>{
			console.log(e);
		})
	},[id])
	const onClosePopover = useCallback(() => {
		setPopover(false);
	}, []);
	const onClickDictMore = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
		setPopover(prev => !prev);
	}, [anchorEl]);
	if (isLoading) {
		return (
			<Card>
				<CardHeader
					title={<Skeleton />}
					subheader={<Skeleton />}
				/>
				<CardContent>
				</CardContent>
			</Card>
		);
	}
	return (
		<>
			{data ? <>
				<Card>
					<CardHeader
						title={data.wordName}
						subheader={data.data.length === 0 ? '단어가 존재하지 않아요' : `단어 : ${data.data.length}개`}
						action={
							<>
								<IconButton onClick={onClickDictMore}>
									<MoreVert />
								</IconButton>
								<Popover
									open={isPopoverOpen}
									onClose={onClosePopover}
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left',
									}}
								>
									<ButtonGroup orientation='vertical'>
										<Button variant='outlined' color='success'>단어장 이름 변경</Button>
										<Button onClick={openRmDictDialog} variant='outlined' color='error'>단어장 삭제</Button>
									</ButtonGroup>

								</Popover>
							</>

						}
					/>
					<CardContent style={{ height: '80vh' }}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<RemoveDictionaryDialog isOpen={isRmDictOpen} handleClose={closeRmDictDialog} />
							<div style={{ height: '10vh' }}>
								<WordTools />
							</div>
							<div style={{ flex: 1 }}>
								<WordList wordList={data.data} />
							</div>
							<div style={{ height: '10vh' }}>
								<WordForm />
							</div>

						</div>
					</CardContent>
				</Card>
			</> : <></>}
		</>
	);
};

export default DictionaryInfo;