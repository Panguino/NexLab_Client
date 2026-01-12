import WinterAnimator from '@/components/blocks/_animators/WinterAnimator/WinterAnimator'

interface PageProps {
	params: Promise<{
		winterProductId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { winterProductId } = await params

	return <WinterAnimator productId={winterProductId} />
}

export default Page
