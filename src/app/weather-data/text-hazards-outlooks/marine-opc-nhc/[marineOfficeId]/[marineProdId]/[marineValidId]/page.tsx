import { MarineForecastPage } from '@/components/blocks/MarineForecastPage/MarineForecastPage'

interface PageProps {
	params: Promise<{
		marineOfficeId: string
		marineProdId: string
		marineValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { marineOfficeId, marineProdId, marineValidId } = await params
	return <MarineForecastPage officeId={marineOfficeId} productId={marineProdId} validTime={marineValidId} />
}

export default Page
