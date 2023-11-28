import { Dispatch, SetStateAction, useCallback, useState,  } from 'react';

type ReturnTypes = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useInput = (initialData: boolean): ReturnTypes => {
	const [value, setValue] = useState(initialData);
	const handler = useCallback(() => {
		setValue(prevState => !prevState);
	}, []);
	return [value, handler, setValue];
};
export default useInput;
