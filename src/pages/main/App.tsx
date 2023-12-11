import React, { useEffect } from 'react';
import MainLayout from '../../layout/MainLayout.tsx';
import RepositoryImpl from '../../data/repository/RepositoryImpl.ts';
import LocalDataSource from '../../data/datasource/LocalDataSource.ts';
import Grid from '@mui/material/Unstable_Grid2';
import DictionaryList from '../../components/main/DictionaryList/DictionaryList.tsx';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { useMainStore } from '../../store/useMainStore.ts';
import DictionaryInfo from '../../components/main/DictionaryInfo/DictionaryInfo.tsx';

const local = new LocalDataSource();
export const repo = new RepositoryImpl(local);

const App = () => {
	const { setCurPage} = useMainStore();
	const { isLoading, data } = useQuery({ queryKey: ['myKey'], queryFn: () => repo.readAllDictionary() });
	console.log(isLoading, data);
	useEffect( () => {
		if (data && data.length > 0) {
			setCurPage(data[0])
		}
	}, [data]);
	return (
		<MainLayout>
			<Grid container alignItems='stretch' columns={24} xs={24} sx={{ flexGrow: '1' }} style={{ flexGrow: '1' }}>
				<Grid lg={8} md={6} sm={0} xs={0}>
					<DictionaryList />
				</Grid>
				<Grid lg={16} md={18} sm={24} xs={24}>
					<DictionaryInfo/>
				</Grid>
			</Grid>
		</MainLayout>
	);
};

export default App;
