import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/main/App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RepositoryImpl from './data/repository/RepositoryImpl.ts';
import LocalDataSource from './data/datasource/LocalDataSource.ts';
import Repository from './domain/Repository.ts';

const queryClient = new QueryClient();

const ds = new LocalDataSource();
const repo = new RepositoryImpl(ds)
export const RepoContext = createContext<Repository>(repo);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RepoContext.Provider value={repo}>
		<QueryClientProvider client={queryClient}>
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<App />} />
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</QueryClientProvider>

	</RepoContext.Provider>
);
