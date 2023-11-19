import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const useDialogState = (): [boolean, () => void, () => void, Dispatch<SetStateAction<boolean>>] => {
	const [open, setOpen] = useState(false);
	const handleOpenDialog = useCallback(() => {
		setOpen(true);

	}, []);
	const handleCloseDialog = useCallback(() => {
		setOpen(false);

	}, []);
	return [open, handleOpenDialog, handleCloseDialog, setOpen];
};

export default useDialogState;