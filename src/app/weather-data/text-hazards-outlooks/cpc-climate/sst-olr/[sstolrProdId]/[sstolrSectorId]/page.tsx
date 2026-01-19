import SSTOLRAnimator from '@/components/blocks/_animators/SSTOLRAnimator/SSTOLRAnimator'

interface PageProps {
	params: Promise<{
		sstolrProdId: string
		sstolrSectorId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { sstolrProdId, sstolrSectorId } = await params

	return <SSTOLRAnimator productId={sstolrProdId} sectorId={sstolrSectorId} />
}

export default Page
