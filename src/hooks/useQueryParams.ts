import { useSearchParams } from 'react-router-dom';

function useQueryParams() {
	const [searchParams] = useSearchParams();

	const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
	const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 10;

	return { page, limit };
}

export default useQueryParams;
