import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import SoundingAnimator from '@/components/blocks/SoundingAnimator/SoundingAnimator'
import { getSoundingPageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { soundingProductId } = params
	const pageId = getSoundingPageIdByProductId(soundingProductId)
	const pageData = await getDataPageContent(pageId)
	return (
		<SoundingAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.url || pageData.SEO.metaImage?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
