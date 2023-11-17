import React, { FC, useCallback } from 'react';
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import DictionaryEntity from '../../../data/entity/DictionaryEntity.ts';

interface Props {
	children?: React.ReactNode;
	dictionary: DictionaryEntity;
}

const DictionaryItem: FC<Props> = ({ dictionary }) => {
	const onClickItem = useCallback(()=>{

	},[])
	return (
		<ListItem  disablePadding>
			<ListItemButton  onClick={onClickItem}>
				<ListItemText primary={dictionary.wordName} />
			</ListItemButton>
		</ListItem>
	);
};

export default DictionaryItem;