import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import NexradAnimator from '@/components/blocks/NexradAnimator/NexradAnimator'
import { getDataPageIdByProductId } from '@/util/weatherDataPageLookup'

const Page = async ({ params }) => {
	const { nexradProductId: productId, nexradSiteId: siteId, nexradRegionId: regionId } = params
	const pageId = getDataPageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	console.log(productId, regionId, siteId)
	// N0B/CONUS/LOT defaults
	// TODO add route validation to make sure productId, regionId, and siteId are set and valid and have defaults in case they are not provided.
	return (
		<NexradAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}
export default Page
