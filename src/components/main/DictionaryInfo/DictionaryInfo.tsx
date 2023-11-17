import React, { FC, useCallback, useState } from 'react';
import { Button, ButtonGroup, Card, CardContent, CardHeader, IconButton, Popover, Skeleton } from '@mui/material';
import { useMainStore } from '../../../domain/store/useMainStore.ts';
import { MoreVert } from '@mui/icons-material';
import WordTools from '../wordInfo/WordTools.tsx';
import WordList from '../wordInfo/WordList.tsx';
import WordForm from '../wordInfo/WordForm.tsx';

interface Props {
	children?: React.ReactNode;
}

const DictionaryInfo: FC<Props> = () => {
	const { curPage } = useMainStore();
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const [isPopoverOpen, setPopover] = useState(false);
	const onClosePopover = useCallback(() => {
		setPopover(false);

	}, []);
	const onClickDictMore = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
		setPopover(prev => !prev);
	}, [anchorEl]);
	if (!curPage) {
		return (
			<>
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</>
		);
	}
	return (
		<Card>
			<CardHeader
				title={curPage.wordName}
				subheader={curPage.data.length === 0 ? '단어가 존재하지 않아요' : `단어 : ${curPage.data.length}개`}
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
								<Button variant='outlined' color='error'>단어장 삭제</Button>
							</ButtonGroup>
						</Popover>
					</>

				}
			/>
			<CardContent style={{height:'80vh'}}>
				<div style={{display:'flex', flexDirection:'column'}}>
					<div style={{height:'10vh'}}>
						<WordTools />
					</div>
					<div style={{height:'60vh', overflowY:'auto'}}>
						<WordList wordList={curPage.data} />
					</div>
					<div style={{height:'10vh'}}>
						<WordForm />
					</div>

				</div>
			</CardContent>
		</Card>
	);
};

export default DictionaryInfo;