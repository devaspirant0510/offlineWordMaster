import React, { FC, useCallback, useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout.tsx';
import { useParams } from 'react-router-dom';
import { useFetchWordListByKey } from '../../hooks/fetcher/useFetchDictionary.ts';
import { createExam } from '../../lib/createExam.ts';
import { useExamStore } from '../../store/useExamStore.ts';
import { Box, Button, Card, CardContent, MobileStepper, TextField, Typography } from '@mui/material';
import useInput from '../../hooks/useInput.ts';

interface Props {
	children?: React.ReactNode;
}

const ExamPage: FC<Props> = () => {
	const { id } = useParams();
	const parseId = parseInt(id!);
	const { wordListIsLoading, wordListByKeyData } = useFetchWordListByKey(parseId);
	const { examTypeOption } = useExamStore();
	const [examProgress, setExamProgress] = useState(0);
	const [inputAnswer, onChangeAnswer,setAnswerInput] = useInput('');
	const [answerList, setAnswerList,] = useState<string[]>([]);
	const maxStep = wordListByKeyData?.length ?? 0;
	const { q, a } = createExam(wordListByKeyData!, examTypeOption);
	useEffect(() => {
		if(maxStep!==0){
			console.log("=-==-=========================--=--======-==-===");
			const newList = Array(maxStep).map(_=>" ")
			setAnswerList([...newList]);
		}
	}, [maxStep]);
	const onClickNextButton = useCallback(() => {
		console.log("examProgress",examProgress);
		console.log(answerList);
		let updateArr =[...answerList]
		updateArr[examProgress] = inputAnswer;
		setAnswerList([...updateArr])
		if(!answerList[examProgress+1]){
			setAnswerInput('')
		}else{
			setAnswerInput(answerList[examProgress+1])
		}
		setExamProgress(prev => prev + 1);
	}, [examProgress,answerList,inputAnswer]);
	const onClickBackButton = useCallback(() => {
		let updateArr =[...answerList]
		updateArr[examProgress] = inputAnswer;
		if(!answerList[examProgress-1]){
			setAnswerInput('')
		}else{
			setAnswerInput(answerList[examProgress-1])

		}
		setExamProgress(prev => prev - 1);
	}, [examProgress,answerList,inputAnswer]);


	if (!id) {
		return <MainLayout>
			잘못된 주소입니다.
		</MainLayout>;
	}
	if (wordListIsLoading) {
		return <MainLayout>로딩중..</MainLayout>;
	}
	if (!wordListByKeyData || !q || !a) {
		return <MainLayout>
			데이터가 없습니다 다시 시도해주세요
		</MainLayout>;
	}

	return (
		<MainLayout>
			<Box display='flex' flexDirection='column' alignItems='center' justifyContent={'center'} height={'100%'}>
				<Card style={{ height: '100%', width: '100%' }}>
					<CardContent>
						<Box display={'flex'} style={{ height: '100%' }} justifyContent={'center'}
							 flexDirection={'column'} alignItems={'center'}>
							<Typography variant={'h5'} align={'center'}>Q :{q[examProgress]}</Typography>
							<Box width='fit-content'>
								<TextField value={inputAnswer} onChange={onChangeAnswer} />
							</Box>
							<Button>제출</Button>
						</Box>
					</CardContent>
				</Card>
			</Box>
			<Box>
				<MobileStepper
					activeStep={examProgress}
					backButton={<Button variant={'outlined'} onClick={onClickBackButton}
										disabled={examProgress === 0}>back</Button>}
					nextButton={<Button variant={'outlined'} onClick={onClickNextButton}
										disabled={examProgress === maxStep - 1}>next</Button>}
					steps={maxStep} />
			</Box>
		</MainLayout>
	);
};

export default ExamPage;