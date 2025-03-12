import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import SoundingAnimator from '@/components/blocks/SoundingAnimator/SoundingAnimator'
import { getSoundingPageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { productId, siteId, regionId } = params
	const pageId = getSoundingPageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	// const pageData = await getDataPageContent(13)
	console.log(productId, siteId, regionId)
	return (
		<SoundingAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
