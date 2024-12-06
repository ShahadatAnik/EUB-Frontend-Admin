import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const HoverCardWrapper = ({ title, content }: { title: string; content: string }) => {
	return (
		<HoverCard>
			<HoverCardTrigger className='line-clamp-2'>{title}</HoverCardTrigger>
			<HoverCardContent className='w-96'>{content}</HoverCardContent>
		</HoverCard>
	);
};

export default HoverCardWrapper;
