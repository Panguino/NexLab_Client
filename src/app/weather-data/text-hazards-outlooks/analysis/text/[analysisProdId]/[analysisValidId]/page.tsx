import { AnalysisTextPage } from '@/components/blocks/AnalysisTextPage/AnalysisTextPage'

interface PageProps {
	params: Promise<{
		analysisProdId: string
		analysisValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { analysisProdId, analysisValidId } = await params
	return <AnalysisTextPage productId={analysisProdId} validTime={analysisValidId} />
}

export default Page
