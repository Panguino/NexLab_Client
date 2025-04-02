import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import RAPMesoAnimator from '@/components/blocks/RAPMesoAnimator/RAPMesoAnimator'
import { getRAPMesoPageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { productId } = params
	const pageId = getRAPMesoPageIdByProductId(productId)
	const pageData = await getDataPageContent(pageId)
	// const pageData = await getDataPageContent(13)
	console.log(productId)
	return (
		<RAPMesoAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
