import HydroAnalysisAnimator from '@/components/blocks/_animators/HydroAnalysisAnimator/HydroAnalysisAnimator'

interface PageProps {
	params: Promise<{ hydroAnalysisProdId: string }>
}

const Page = async ({ params }: PageProps) => {
	const { hydroAnalysisProdId } = await params
	return <HydroAnalysisAnimator productId={hydroAnalysisProdId} />
}

export default Page
