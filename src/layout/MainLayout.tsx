import React, { FC } from 'react';
import AppBar from './AppBar.tsx';
import Grid from '@mui/material/Unstable_Grid2';

interface Props {
	children?: React.ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
	return (
		<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
			<AppBar />
			<Grid container columns={24} style={{ flex: 1 }} alignItems='stretch'>
				<Grid lg={4} md={2} sm={0} xs={0} />
				<Grid lg={16} md={20} sm={24} xs={24} columns={24} container alignItems='stretch'>
					<Grid xs={24} style={{}}>
						{children}
					</Grid>
				</Grid>
				<Grid lg={4} md={2} sm={0} xs={0} />
			</Grid>
		</div>
	);
};

export default MainLayout;