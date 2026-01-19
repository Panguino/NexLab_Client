import { ClimateOutlooksPage } from '@/components/blocks/ClimateOutlooksPage/ClimateOutlooksPage'

interface PageProps {
	params: Promise<{
		cpcOutlookProdId: string
		cpcOutlookValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { cpcOutlookProdId, cpcOutlookValidId } = await params

	return <ClimateOutlooksPage productId={cpcOutlookProdId} validTime={cpcOutlookValidId} />
}

export default Page
