import { HydroTextPage } from '@/components/blocks/HydroTextPage/HydroTextPage'

interface PageProps {
	params: Promise<{ hydroTextProdId: string; hydroTextValidId: string }>
}

const Page = async ({ params }: PageProps) => {
	const { hydroTextProdId, hydroTextValidId } = await params
	return <HydroTextPage productId={hydroTextProdId} validTime={hydroTextValidId} />
}

export default Page
