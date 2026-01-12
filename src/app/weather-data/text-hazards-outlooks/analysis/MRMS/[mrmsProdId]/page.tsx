import MRMSAnimator from '@/components/blocks/_animators/MRMSAnimator/MRMSAnimator'

interface PageProps {
	params: Promise<{
		mrmsProdId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { mrmsProdId } = await params
	return <MRMSAnimator productId={mrmsProdId} />
}

export default Page
