import React, { createContext, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RepositoryImpl from './data/repository/RepositoryImpl.ts';
import LocalDataSource from './data/datasource/LocalDataSource.ts';
import Repository from './domain/Repository.ts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';

const App = React.lazy(() => import('./pages/main/App.tsx'));
const ExamOptionPage = React.lazy(() => import('./pages/exam/ExamOptionPage.tsx'));
const ExamPage = React.lazy(() => import('./pages/exam/ExamPage.tsx'));const queryClient = new QueryClient();

const ds = new LocalDataSource();
const repo = new RepositoryImpl(ds);
export const RepoContext = createContext<Repository>(repo);

function CustomLoading() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height:'100%',alignItems: 'center' ,justifyContent:'center', backgroundColor: 'rgba(0, 0, 0, 0.80)'}}>
			<CircularProgress size={100} style={{ color: 'white' }} />
			<Typography variant="body1" style={{ color: 'white', marginTop: 10 }}>
				Loading...
			</Typography>
		</div>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<RepoContext.Provider value={repo}>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<CustomLoading/>}>
					<Routes>
						<Route path='/' element={<App />} />
						<Route path='/:id' element={<App />} />
						<Route path='exam/option/:id' element={<ExamOptionPage/>}/>
						<Route path='exam/:id' element={<ExamPage/>}/>
						<Route path="/*" element={<>404</>}/>
					</Routes>

				</Suspense>
			</QueryClientProvider>
		</RepoContext.Provider>
	</BrowserRouter>,
);
