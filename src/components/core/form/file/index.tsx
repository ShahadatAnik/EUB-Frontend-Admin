import { createContext, useContext } from 'react';

import { FormFileProps } from '../types';
import MultiFile from './multi-file';
import SingleFile from './single-file';

const FormFileContext = createContext({} as FormFileProps);
const useFormFile = () => useContext(FormFileContext);

const FormFile: React.FC<FormFileProps> = (props) => {
	return (
		<FormFileContext.Provider value={props}>
			{props.multi ? <MultiFile /> : <SingleFile />}
		</FormFileContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export { FormFile, FormFileContext, useFormFile };
