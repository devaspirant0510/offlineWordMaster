import React, { FC, useCallback, useState } from 'react';
import DictionaryEntity from '../../../data/entity/DictionaryEntity.ts';
import { Card, CardContent, CardHeader, Divider, IconButton } from '@mui/material';
import DictionaryItem from './DictionaryItem.tsx';
import AddIcon from '@mui/icons-material/Add';
import AddDictionaryDialog from '../dialog/AddDictionaryDialog.tsx';

interface Props {
	children?: React.ReactNode;
	dictionaryList: DictionaryEntity[];
}

const DictionaryList: FC<Props> = ({ dictionaryList }) => {
	const [isOpenDialog, setOpenDialog] = useState(false);
	const handleCloseDialog = useCallback(() => {
		setOpenDialog(false);
	}, []);
	const onClickCreateDict = useCallback(() => {
		setOpenDialog(true);

	}, []);
	return (
		<>
			<Card style={{ height: '100%' }}>
				<CardHeader
					title={'my Dictionary'}
					action={
						<IconButton onClick={onClickCreateDict}>
							<AddIcon />
						</IconButton>
					}
				>
				</CardHeader>
				<CardContent>
					{dictionaryList.map(v => (
						<div key={v.wordName}>
							<DictionaryItem dictionary={v} />
							<Divider />
						</div>
						),
					)}
				</CardContent>
			</Card>
			<AddDictionaryDialog isOpen={isOpenDialog} handleClose={handleCloseDialog} />

		</>

	)
		;
};

export default DictionaryList;