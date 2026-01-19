import { ClimateSeasonalPage } from '@/components/blocks/ClimateSeasonalPage/ClimateSeasonalPage'

interface PageProps {
	params: Promise<{
		cpcSeasonalProdId: string
		cpcSeasonalValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { cpcSeasonalProdId, cpcSeasonalValidId } = await params

	return <ClimateSeasonalPage productId={cpcSeasonalProdId} validTime={cpcSeasonalValidId} />
}

export default Page
