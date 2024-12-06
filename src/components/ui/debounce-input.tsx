import { useEffect, useState } from 'react';

import { Input, InputProps } from './input';

interface DebouncedInputProps extends InputProps {
	debounce?: number;
}

function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}: {
	value: string | number;
	onChange: (value: string | number) => void;
	debounce?: number;
} & Omit<DebouncedInputProps, 'onChange'>) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [value]);

	return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

export default DebouncedInput;
