import { StatsAndMessagesPage } from '@/components/blocks/StatsAndMessagesPage/StatsAndMessagesPage'

const Page = ({ params }: { params: { statsProdId: string; statsValidId: string } }) => {
	return <StatsAndMessagesPage productId={params.statsProdId} validTime={params.statsValidId} />
}

export default Page
