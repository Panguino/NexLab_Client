import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import ForecastSoundingAnimator from '@/components/blocks/_animators/ForecastSoundingAnimator/ForecastSoundingAnimator'
import { getForecastPageIdByParams } from '@/util/weatherDataPageLookup'

const Page = async ({ params }) => {
	const { fcstModel: modelId, fcstLevel: levelId, fcstProduct: productId } = params
	const pageId = getForecastPageIdByParams(modelId, levelId, productId)
	const pageData = await getDataPageContent(pageId)
	return (
		<ForecastSoundingAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}
export default Page
