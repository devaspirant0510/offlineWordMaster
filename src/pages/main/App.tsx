import React from 'react';
import MainLayout from '../../layout/MainLayout.tsx';
import RepositoryImpl from '../../data/repository/RepositoryImpl.ts';
import LocalDataSource from '../../data/datasource/LocalDataSource.ts';
import Grid from '@mui/material/Unstable_Grid2';
import DictionaryList from '../../components/main/DictionaryList/DictionaryList.tsx';
import { useQuery } from '@tanstack/react-query';

const local = new LocalDataSource();
export const repo = new RepositoryImpl(local);

const App = () => {
	const { isLoading, data } = useQuery({ queryKey: ['myKey'], queryFn: () => repo.readAllDictionary() });
	console.log(isLoading, data);
	if (isLoading) {
		return <>로딩중이다 새꺄</>;
	}
	return (
		<MainLayout>
			<Grid container alignItems="stretch" columns={24} xs={24} sx={{ flexGrow: '1' }} style={{ flexGrow: '1' }}>
				<Grid lg={8} md={6} sm={0} xs={0}>
					{data && <DictionaryList dictionaryList={data} />}
				</Grid>
				<Grid lg={16} md={18} sm={0} xs={0}>
					<div>1</div>
				</Grid>
			</Grid>
		</MainLayout>
	);
};

export default App;
