import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import SatradAnimator from '@/components/blocks/_animators/SatradAnimator/SatradAnimator'
import { getSatradPageIdByProductId } from '@/util/weatherDataPageLookup'

const Page = async ({ params }) => {
	const { satradProductId: productId } = params
	const pageId = getSatradPageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	return (
		<SatradAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}
export default Page
