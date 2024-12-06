import { Suspense } from 'react';

const renderSuspenseModals = (modals: React.ReactNode[]) => {
	return modals.map((modal, index) => (
		<Suspense key={index} fallback={null}>
			{modal}
		</Suspense>
	));
};

export default renderSuspenseModals;
