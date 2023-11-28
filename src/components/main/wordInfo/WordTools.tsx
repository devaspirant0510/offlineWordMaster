import React, { FC, useCallback, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControlLabel, Skeleton } from '@mui/material';
import { useMainStore } from '../../../domain/store/useMainStore.ts';

interface Props {
	children?: React.ReactNode;
}

const WordTools: FC<Props> = () => {
	const { curPage,setShowType } = useMainStore();
	const [showEng, setShowEng] = useState(true);
	const [showKor, setShowKor] = useState(true);
	const onToggleEng = useCallback(() => {
		if(!showKor && showEng){
			setShowType(true, false); // 여기서 showEng의 최신 값을 전달하도록 수정
			setShowKor(true);
			setShowEng(false)

		}else{
			setShowType(showKor, !showEng); // 여기서 showEng의 최신 값을 전달하도록 수정
			setShowEng(engPrev => !engPrev);
		}
	}, [showKor, showEng]);
	const onToggleKor = useCallback(() => {
		if (showKor && !showEng) {
			setShowType(false, true); // showKor의 최신 값을 전달하도록 수정
			setShowEng(true);
			setShowKor(false);
		} else {
			setShowType(!showKor, showEng); // showKor의 최신 값을 전달하도록 수정
			setShowKor(prevKor => !prevKor);
		}
	}, [showKor, showEng]);
	if(!curPage){
		return <Skeleton/>
	}
	return (
		<div style={{ height: '100%' }}>
			<FormControlLabel
				label='영어뜻 보기'
				control={<Checkbox disabled={curPage.data.length===0} checked={showEng} onChange={onToggleEng} />}
			/>
			<FormControlLabel
				label='한글뜻 보기'
				control={<Checkbox disabled={curPage.data.length===0} checked={showKor} onChange={onToggleKor} />}
			/>
			<Button variant={'outlined'}>테스트 시작</Button>


		</div>
	);
};

export default WordTools;