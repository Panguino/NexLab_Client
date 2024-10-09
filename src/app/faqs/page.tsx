import { getFAQOverview } from '@/apollo/strapi/getFAQOverview'
import { getFAQs } from '@/apollo/strapi/getFAQs'
import { FAQs } from '@/components/blocks/FAQs/FAQs'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'

const Page = async () => {
	const faqs = await getFAQs()
	const faqOverview = await getFAQOverview()

	return (
		<PageContentWrapper>
			<FAQs title={faqOverview.attributes.Title} body={faqOverview.attributes.Body} faqs={faqs} />
		</PageContentWrapper>
	)
}

export default Page
