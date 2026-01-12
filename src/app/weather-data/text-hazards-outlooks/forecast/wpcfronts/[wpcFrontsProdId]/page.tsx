import WPCFrontsAnimator from '@/components/blocks/_animators/WPCFrontsAnimator/WPCFrontsAnimator'

interface PageProps {
	params: Promise<{
		wpcFrontsProdId: string
	}>
}

const Page = async ({ params }: PageProps) => {
	const { wpcFrontsProdId } = await params
	return <WPCFrontsAnimator productId={wpcFrontsProdId} />
}

export default Page
