import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import NexradAnimator from '@/components/blocks/NexradAnimator/NexradAnimator'
import { getDataPageIdByProductId } from '@/util/weatherDataPageLookup'

const Page = async ({ params }) => {
	const { productId, siteId } = params
	const pageId = getDataPageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	console.log(pageData)
	return (
		<NexradAnimator
			productId={productId}
			siteId={siteId}
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}
export default Page
