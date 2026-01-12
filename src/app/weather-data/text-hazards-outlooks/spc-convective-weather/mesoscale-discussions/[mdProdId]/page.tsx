import { MesoscaleDiscussionDetailPage } from '@/components/blocks/MesoscaleDiscussionDetailPage/MesoscaleDiscussionDetailPage'

interface PageProps {
	params: Promise<{
		mdProdId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { mdProdId } = await params
	return <MesoscaleDiscussionDetailPage mdId={mdProdId} />
}

export default Page
