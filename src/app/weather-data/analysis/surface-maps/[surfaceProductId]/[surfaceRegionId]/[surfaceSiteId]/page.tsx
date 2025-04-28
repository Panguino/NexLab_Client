import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import SurfaceMapsAnimator from '@/components/blocks/SurfaceMapsAnimator/SurfaceMapsAnimator'
import { getSurfacePageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { surfaceProductId } = params
	const pageId = getSurfacePageIdByProductId(surfaceProductId)
	const pageData = await getDataPageContent(pageId)
	return (
		<SurfaceMapsAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
