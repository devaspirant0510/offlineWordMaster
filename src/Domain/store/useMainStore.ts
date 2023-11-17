import { create } from 'zustand';
import DictionaryEntity from '../../data/entity/DictionaryEntity.ts';

interface State {
	curPage?: DictionaryEntity;
	setCurPage: (dict: DictionaryEntity) => void;
}

export const useMainStore = create<State>()((set) => ({
	curPage: undefined,
	setCurPage: (dict) => set((state) => ({ ...state, curPage: dict })),
}));
