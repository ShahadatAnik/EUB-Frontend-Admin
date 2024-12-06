import { Link } from 'react-router-dom';

interface ILinkOnlyProps {
	uri: string;
	title: string;
}

export const LinkOnly = ({ uri, title }: ILinkOnlyProps) => {
	return (
		<Link to={uri} className='font-medium text-foreground underline hover:text-accent'>
			{title}
		</Link>
	);
};
