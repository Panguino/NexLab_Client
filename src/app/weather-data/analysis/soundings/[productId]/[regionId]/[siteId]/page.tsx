import SoundingAnimator from '@/components/blocks/SoundingAnimator/SoundingAnimator'
const Page = async (params) => {
	const { productId, siteId, regionId } = params
	console.log(productId, regionId, siteId)
	return <SoundingAnimator productId={productId} siteId={siteId} />
}

export default Page
