import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import UpperAirAnimator from '@/components/blocks/UpperAirAnimator/UpperAirAnimator'
import { getSurfacePageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { productId, siteId, regionId } = params
	const pageId = getSurfacePageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	console.log(productId, siteId, regionId)
	return (
		<UpperAirAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
