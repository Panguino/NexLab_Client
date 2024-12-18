import NexradAnimator from '@/components/blocks/NexradAnimator/NexradAnimator'

const Page = ({ params }) => {
	const { productId, siteId } = params
	return <NexradAnimator productId={productId} siteId={siteId} />
}
export default Page
