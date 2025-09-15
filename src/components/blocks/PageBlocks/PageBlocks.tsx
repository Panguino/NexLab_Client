import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { AnimatorBackgroundHero } from './AnimatorBackgroundHero/AnimatorBackgroundHero'
import { ClassesOverview } from './ClassesOverview/ClassesOverview'
import { Degrees } from './Degrees/Degrees'
import { FeaturePanels } from './FeaturePanels/FeaturePanels'
import { Footer } from './Footer/Footer'
import { InfoWithCloud } from './InfoWithCloud/InfoWithCloud'
import { PageHeading } from './PageHeading/PageHeading'
import { RichTextPageBlock } from './RichTextPageBlock/RichTextPageBlock'
import { SimpleCta } from './SimpleCta/SimpleCta'
import { StaffGrid } from './StaffGrid/StaffGrid'
import { StormChasingInfo } from './StormChasingInfo/StormChasingInfo'
import { StormChasingSchedule } from './StormChasingSchedule/StormChasingSchedule'
import { TwoPanelIconInfo } from './TwoPanelIconInfo/TwoPanelIconInfo'

export const PageBlocks = ({ blocks }) => {
	//console.log('PageBlocks', blocks)
	return (
		<ScrollArea>
			{blocks.map((block, index) => {
				//console.log('block', block)
				switch (block?.type) {
					case 'FeaturePanels':
						return <FeaturePanels key={index} {...block} />
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
					case 'Staff':
						return <StaffGrid key={index} {...block} />
					case 'AnimatorBackgroundHero':
						return <AnimatorBackgroundHero key={index} {...block} />
					case 'StormChasingInfo':
						return <StormChasingInfo key={index} {...block} />
					case 'SimpleCta':
						return <SimpleCta key={index} {...block} />
					case 'ClassesOverview':
						return <ClassesOverview key={index} {...block} />
					default:
						return null
				}
			})}
			<Footer />
		</ScrollArea>
	)
}
