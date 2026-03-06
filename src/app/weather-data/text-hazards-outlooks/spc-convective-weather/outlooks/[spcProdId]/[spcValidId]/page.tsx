import { SPCOutlooksPage } from '@/components/blocks/SPCOutlooksPage/SPCOutlooksPage'

const Page = ({ params }: { params: { spcProdId: string; spcValidId: string } }) => {
	return <SPCOutlooksPage productId={params.spcProdId} validTime={params.spcValidId} />
}

export default Page
