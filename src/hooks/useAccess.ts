import useAuth from './useAuth';

export default function useAccess(key: string) {
	const { canAccess } = useAuth();

	if (!canAccess) return [];

	return canAccess[key] || [];
}
