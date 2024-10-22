import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { Degrees } from './Degrees/Degrees'
import { Footer } from './Footer/Footer'
import { InfoWithCloud } from './InfoWithCloud/InfoWithCloud'
import { PageHeading } from './PageHeading/PageHeading'
import { RichTextPageBlock } from './RichTextPageBlock/RichTextPageBlock'
import { StormChasingSchedule } from './StormChasingSchedule/StormChasingSchedule'
import { TwoPanelIconInfo } from './TwoPanelIconInfo/TwoPanelIconInfo'

export const PageBlocks = ({ blocks }) => {
	return (
		<ScrollArea>
			{blocks.map((block, index) => {
				switch (block.type) {
					case 'PageHeading':
						return <PageHeading key={index} {...block} />
					case 'InfoWithCloudImage':
						return <InfoWithCloud key={index} {...block} />
					case 'TwoPanelIconInfo':
						return <TwoPanelIconInfo key={index} {...block} />
					case 'StormChasingSchedule':
						return <StormChasingSchedule key={index} {...block} />
					case 'RichText':
						return <RichTextPageBlock key={index} {...block} />
					case 'Degrees':
						return <Degrees key={index} {...block} />
					default:
						return null
				}
			})}
			<Footer />
		</ScrollArea>
	)
}
