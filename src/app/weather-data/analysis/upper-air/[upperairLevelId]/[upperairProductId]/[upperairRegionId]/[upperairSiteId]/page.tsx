import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import UpperAirAnimator from '@/components/blocks/UpperAirAnimator/UpperAirAnimator'
import { getUpperAirPageIdByProductAndLevelId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { upperairLevelId, upperairProductId } = params
	const pageId = getUpperAirPageIdByProductAndLevelId(upperairLevelId, upperairProductId)
	const pageData = await getDataPageContent(pageId)
	return (
		<UpperAirAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
