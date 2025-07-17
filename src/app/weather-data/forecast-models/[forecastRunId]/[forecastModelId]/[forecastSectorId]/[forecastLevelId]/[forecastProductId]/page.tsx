import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import ForecastAnimator from '@/components/blocks/_animators/ForecastAnimator/ForecastAnimator'
import { getForecastPageIdByParams } from '@/util/weatherDataPageLookup'

const Page = async ({ params }) => {
	const { forecastModelId: modelId, forecastLevelId: levelId, forecastProductId: productId } = params
	const pageId = getForecastPageIdByParams(modelId, levelId, productId)
	const pageData = await getDataPageContent(pageId)
	return (
		<ForecastAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}
export default Page
