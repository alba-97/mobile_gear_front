import { useState } from 'react';

const useInput = (val: string) => {
	const [value, setValue] = useState(val || '');

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return { onChange, value, setValue };
};
export default useInput;
