import { ForecastTextPage } from '@/components/blocks/ForecastTextPage/ForecastTextPage'

interface PageProps {
	params: Promise<{
		forecastTextProdId: string
		forecastTextValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { forecastTextProdId, forecastTextValidId } = await params
	return <ForecastTextPage productId={forecastTextProdId} validTime={forecastTextValidId} />
}

export default Page
