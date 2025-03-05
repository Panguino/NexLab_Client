import SoundingAnimator from '@/components/blocks/SoundingAnimator/SoundingAnimator'
const Page = async (params) => {
	const { siteId, productId } = params
	return <SoundingAnimator productId={productId} siteId={siteId} />
}

export default Page
