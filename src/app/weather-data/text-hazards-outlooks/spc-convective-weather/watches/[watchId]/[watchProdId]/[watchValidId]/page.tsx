import { ConvectiveWatchDetailPage } from '@/components/blocks/ConvectiveWatchDetailPage/ConvectiveWatchDetailPage'

const Page = ({ params }: { params: { watchId: string; watchProdId: string; watchValidId: string } }) => {
	return <ConvectiveWatchDetailPage watchId={params.watchId} watchProdId={params.watchProdId} watchValidId={params.watchValidId} />
}

export default Page
