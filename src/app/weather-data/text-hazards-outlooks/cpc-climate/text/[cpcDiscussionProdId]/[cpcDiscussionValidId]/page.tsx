import { ClimateTextPage } from '@/components/blocks/ClimateTextPage/ClimateTextPage'

interface PageProps {
	params: Promise<{
		cpcDiscussionProdId: string
		cpcDiscussionValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { cpcDiscussionProdId, cpcDiscussionValidId } = await params

	return <ClimateTextPage productId={cpcDiscussionProdId} validTime={cpcDiscussionValidId} />
}

export default Page
