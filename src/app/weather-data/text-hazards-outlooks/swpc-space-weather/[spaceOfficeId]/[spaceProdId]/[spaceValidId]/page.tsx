import { SpaceForecastPage } from '@/components/blocks/SpaceForecastPage/SpaceForecastPage'

interface PageProps {
	params: Promise<{
		spaceOfficeId: string
		spaceProdId: string
		spaceValidId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { spaceOfficeId, spaceProdId, spaceValidId } = await params
	return <SpaceForecastPage officeId={spaceOfficeId} productId={spaceProdId} validTime={spaceValidId} />
}

export default Page
