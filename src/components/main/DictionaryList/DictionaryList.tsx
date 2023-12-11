import React, { FC, useCallback, useState } from 'react';
import DictionaryEntity from '../../../data/entity/DictionaryEntity.ts';
import { Card, CardContent, CardHeader, Divider, IconButton, Skeleton } from '@mui/material';
import DictionaryItem from './DictionaryItem.tsx';
import AddIcon from '@mui/icons-material/Add';
import AddDictionaryDialog from '../dialog/AddDictionaryDialog.tsx';
import { useQuery } from '@tanstack/react-query';
import { repo } from '../../../pages/main/App.tsx';
import { Link } from 'react-router-dom';

interface Props {
	children?: React.ReactNode;
}

const DictionaryList: FC<Props> = ({  }) => {
	const { isLoading, data } = useQuery({ queryKey: ['myKey'], queryFn: () => repo.readAllDictionary() });
	const [isOpenDialog, setOpenDialog] = useState(false);
	const handleCloseDialog = useCallback(() => {
		setOpenDialog(false);
	}, []);
	const onClickCreateDict = useCallback(() => {
		setOpenDialog(true);

	}, []);
	if(isLoading || !data){
		return <Card
		>
			<CardHeader
				title={<Skeleton/>}/>
			<CardContent>
				<div>
					<Skeleton/>
					<Skeleton/>
				</div>
				<div>
					<Skeleton/>
					<Skeleton/>
				</div>
				<div>
					<Skeleton/>
					<Skeleton/>
				</div>
				<div>
					<Skeleton/>
					<Skeleton/>
				</div>
			</CardContent>
		</Card>
	}
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
					{data.length===0?
						<div>단어장이 업습니다.</div>

					:
						<>
							{data.map(v => (
									<div key={v.wordName}>
										<Link to={`/${(v.id!).toString()}`}>
											<DictionaryItem dictionary={v} />
										</Link>
										<Divider />
									</div>
								),
							)}
						</>
					}
				</CardContent>
			</Card>
			<AddDictionaryDialog isOpen={isOpenDialog} handleClose={handleCloseDialog} />

		</>

	)
		;
};

export default DictionaryList;