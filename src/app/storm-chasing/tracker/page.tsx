import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import PageContentWrapper from '@/components/layout/PageContentWrapper/PageContentWrapper'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import TrackerPageLayout from '@/components/layout/TrackerPageLayout/TrackerPageLayout'

const Page = () => {
	return (
		<ScrollArea>
			<PageContentWrapper>
				<TrackerPageLayout />
			</PageContentWrapper>
			<Footer />
		</ScrollArea>
	)
}

export default Page
