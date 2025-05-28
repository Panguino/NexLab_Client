import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import IsentropicAnimator from '@/components/blocks/_animators/IsentropicAnimator/IsentropicAnimator'
import { getIsentropicPageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { isentropicProductId } = params
	const pageId = getIsentropicPageIdByProductId(isentropicProductId)
	const pageData = await getDataPageContent(pageId)
	return (
		<IsentropicAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
