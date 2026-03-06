import FireDroughtAnimator from '@/components/blocks/_animators/FireDroughtAnimator/FireDroughtAnimator'

interface PageProps {
	params: Promise<{
		prodId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { prodId } = await params
	return <FireDroughtAnimator productId={prodId} />
}

export default Page
