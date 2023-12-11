import { create } from 'zustand';

interface State{
	examTypeOption:string,
	setExamTypeOption:(value:string)=>void,
}

export const useExamStore = create<State>((set)=>({
	examTypeOption:'',
	setExamTypeOption:(value)=>set((state)=>({...state,examTypeOption:value}))
}));