import { getDataPageContent } from '@/apollo/strapi/getDataPageContent'
import SoundingAnimator from '@/components/blocks/_animators/SoundingAnimator/SoundingAnimator'
import { getSoundingPageIdByProductId } from '@/util/weatherDataPageLookup'
const Page = async ({ params }) => {
	const { soundingProductId } = params
	const pageId = getSoundingPageIdByProductId(soundingProductId)
	const pageData = await getDataPageContent(pageId)
	return (
		<SoundingAnimator
			productInfo={{
				info: pageData.productInfo || pageData.SEO.metaTitle,
				image: pageData.ProductImage?.data?.attributes?.url || pageData.SEO.metaImage?.data?.attributes?.url,
				description: pageData.productDescription || pageData.SEO.metaDescription,
			}}
		/>
	)
}

export default Page
