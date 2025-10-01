import { getFAQOverview } from '@/apollo/strapi/getFAQOverview'
import { getFAQs } from '@/apollo/strapi/getFAQs'
import { FAQs } from '@/components/blocks/FAQs/FAQs'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'

const Page = async () => {
	const faqs = await getFAQs()
	const faqOverview = await getFAQOverview()

	return (
		<ScrollArea>
			<FAQs title={faqOverview.Title} body={faqOverview.Body} faqs={faqs} />
			<Footer />
		</ScrollArea>
	)
}

export default Page
