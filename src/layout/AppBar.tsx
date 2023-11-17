import React, { FC, useCallback } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Hidden from '@mui/material/Hidden';
import { AppBarStyle } from './styles.ts';

interface Props {
	children?: React.ReactNode;
}

const AppBar: FC<Props> = () => {
	const onClickMenuIcon = useCallback(()=>{
		console.log("click  menu button");
	},[])
	return (
		<AppBarStyle>
			<span>
				<Hidden mdUp>
					<div  onClick={onClickMenuIcon}>
						<MenuIcon  />
					</div>
				</Hidden>
			</span>

			<h1>
				WordMaster
			</h1>
		</AppBarStyle>
	);
};

export default AppBar;