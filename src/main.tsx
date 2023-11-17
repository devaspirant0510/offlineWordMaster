import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RepositoryImpl from './data/repository/RepositoryImpl.ts';
import LocalDataSource from './data/datasource/LocalDataSource.ts';
import Repository from './domain/Repository.ts';
import {  HashRouter, Route, Routes } from 'react-router-dom';
import App from './pages/main/App.tsx';

const queryClient = new QueryClient();

const ds = new LocalDataSource();
const repo = new RepositoryImpl(ds);
export const RepoContext = createContext<Repository>(repo);

const Text = () => {
	return (<div><h1>3</h1></div>);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<HashRouter>
		<RepoContext.Provider value={repo}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/333' element={<Text />} />
				</Routes>
			</QueryClientProvider>

		</RepoContext.Provider>
	</HashRouter>,
);
