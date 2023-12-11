import { create } from 'zustand';
import DictionaryEntity from '../data/entity/DictionaryEntity.ts';

interface State {
	curPage?: DictionaryEntity;
	setCurPage: (dict: DictionaryEntity) => void;
	isShowKor:boolean,
	isShowEng:boolean,
	setShowType:(showKor:boolean,showEng:boolean)=>void;
}

export const useMainStore = create<State>()((set) => ({
	curPage: undefined,
	setCurPage: (dict) => set((state) => ({ ...state, curPage: dict })),
	isShowKor:true,
	isShowEng:true,
	setShowType:(showKor,showEng)=>set((state)=>({...state,isShowKor:showKor,isShowEng:showEng}))
}));
