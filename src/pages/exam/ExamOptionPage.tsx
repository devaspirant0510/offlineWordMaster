import React, { FC, useCallback, useState } from 'react';
import MainLayout from '../../layout/MainLayout.tsx';
import {
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';
import { useFetchDictionaryByKey } from '../../hooks/fetcher/useFetchDictionary.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useExamStore } from '../../store/useExamStore.ts';

interface Props {
	children?: React.ReactNode;
}
// const EngToKorOption = ()=>{
//     return (
//         <Card>
//             <CardHeader
//                 title={"Q: eng A:kor"}/>
//             <CardContent>
//                 <Paper>
//                     <Typography>
//                         Q:apple
//                     </Typography>
//                     <TextField disabled value={'사과'}/>
//                 </Paper>
//                 <Radio/>
//             </CardContent>
//         </Card>
//     )
// }
const ExamOptionPage: FC<Props> = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {setExamTypeOption,examTypeOption} = useExamStore();
    const parseId = parseInt(id);
    const {dictByKeyData,dictByKeyIsLoading,} = useFetchDictionaryByKey(parseId);
    const onChangeRadioExamType = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
        setExamTypeOption((event.target as HTMLInputElement).value);
    },[])
    const onClickStartExam = useCallback(()=>{
        navigate(`/exam/${id}`)
        console.log(examTypeOption);
    },[examTypeOption])

    if(!id){
        return <MainLayout>
            잘못된 주소입니다.
        </MainLayout>
    }
    if(dictByKeyIsLoading){
        return <MainLayout>로딩중..</MainLayout>
    }
    if(!dictByKeyData){
        return <MainLayout>
            데이터가 없습니다 다시 시도해주세요
        </MainLayout>
    }
	return (
		<MainLayout>
            <Card>
                <CardHeader
                    title={`${dictByKeyData.wordName} 시험`}
                    subheader={"옵션을 선택해주세요 "}
                />
                <CardContent>
                    <RadioGroup
                        defaultValue="engToKor"
                        value={examTypeOption}
                        onChange={onChangeRadioExamType}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="engTokor"
                            label="engTokor"
                            control={<Radio/>}/>
                        <FormControlLabel
                            value="korToeng"
                            label="korToeng"
                            control={<Radio />}/>
                        <FormControlLabel
                            value="random"
                            label="random"
                            control={<Radio />}/>
                    </RadioGroup>

                </CardContent>
                <CardActions>
                    <Button onClick={onClickStartExam}>테스트 시작</Button>
                </CardActions>
            </Card>
		</MainLayout>
	);
};

export default ExamOptionPage;