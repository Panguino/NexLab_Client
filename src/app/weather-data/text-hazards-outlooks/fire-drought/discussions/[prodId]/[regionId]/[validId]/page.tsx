import { FireDiscussionsPage } from '@/components/blocks/FireDiscussionsPage/FireDiscussionsPage'

interface PageProps {
	params: Promise<{
		prodId: string
		regionId: string
		validId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { prodId, regionId, validId } = await params
	return <FireDiscussionsPage productId={prodId} regionId={regionId} validTime={validId} />
}

export default Page
