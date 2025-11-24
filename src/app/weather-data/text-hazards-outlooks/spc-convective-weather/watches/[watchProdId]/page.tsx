import { ConvectiveWatchDetailPage } from '@/components/blocks/ConvectiveWatchDetailPage/ConvectiveWatchDetailPage'

const Page = ({ params }: { params: { watchProdId: string } }) => {
	return <ConvectiveWatchDetailPage watchNumber={params.watchProdId} />
}

export default Page
