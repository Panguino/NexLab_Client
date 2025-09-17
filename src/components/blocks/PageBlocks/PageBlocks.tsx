import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { AnimatorBackgroundHero } from './AnimatorBackgroundHero/AnimatorBackgroundHero'
import { ClassesOverview } from './ClassesOverview/ClassesOverview'
import { Degrees } from './Degrees/Degrees'
import { FaqsBlock } from './FaqsBlock/FaqsBlock'
import { FeatureData as FeatureDataBlock } from './FeatureData/FeatureData'
import { FeaturePanels } from './FeaturePanels/FeaturePanels'
import { Footer } from './Footer/Footer'
import { Gallery as GalleryBlock } from './Gallery/Gallery'
import { ImageBlock } from './ImageBlock/ImageBlock'
import { InfoWithCloud } from './InfoWithCloud/InfoWithCloud'
import { PageHeading } from './PageHeading/PageHeading'
import { RichTextPageBlock } from './RichTextPageBlock/RichTextPageBlock'
import { SimpleCta } from './SimpleCta/SimpleCta'
import { StaffGrid } from './StaffGrid/StaffGrid'
import { StormChasingInfo } from './StormChasingInfo/StormChasingInfo'
import { StormChasingSchedule } from './StormChasingSchedule/StormChasingSchedule'
import { Testimonials as TestimonialsBlock } from './Testimonials/Testimonials'
import { TwoColumnRichText as TwoColumnRichTextBlock } from './TwoColumnRichText/TwoColumnRichText'
import { TwoPanelIconInfo } from './TwoPanelIconInfo/TwoPanelIconInfo'
import { VideoBlock } from './VideoBlock/VideoBlock'

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
					case 'Image':
						return <ImageBlock key={index} {...block} />
					case 'FeatureData':
						return <FeatureDataBlock key={index} {...block} />
					case 'Faqs':
						return <FaqsBlock key={index} {...block} />
					case 'Testimonials':
						return <TestimonialsBlock key={index} {...block} />
					case 'TwoColumnRichText':
						return <TwoColumnRichTextBlock key={index} {...block} />
					case 'Gallery':
						return <GalleryBlock key={index} {...block} />
					case 'Video':
						return <VideoBlock key={index} {...block} />
					default:
						return null
				}
			})}
			<Footer />
		</ScrollArea>
	)
}
