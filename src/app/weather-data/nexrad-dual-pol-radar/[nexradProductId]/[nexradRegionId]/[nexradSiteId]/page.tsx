import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import NexradAnimator from '@/components/blocks/NexradAnimator/NexradAnimator'
import { getDataPageIdByProductId } from '@/util/weatherDataPageLookup'

const Page = async ({ params }) => {
	const { nexradProductId: productId } = params
	const pageId = getDataPageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	// N0B/CONUS/LOT defaults
	// TODO add route validation to make sure productId, regionId, and siteId are set and valid and have defaults in case they are not provided.
	return (
		<NexradAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}
export default Page
