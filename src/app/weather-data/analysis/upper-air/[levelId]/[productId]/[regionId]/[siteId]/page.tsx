import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import UpperAirAnimator from '@/components/blocks/UpperAirAnimator/UpperAirAnimator'
import { getUpperAirPageIdByProductAndLevelId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { levelId, productId, siteId, regionId } = params
	const pageId = getUpperAirPageIdByProductAndLevelId(levelId, productId)
	const pageData = await getDataPageContent(pageId)
	console.log('page received...', levelId, productId, siteId, regionId)
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
