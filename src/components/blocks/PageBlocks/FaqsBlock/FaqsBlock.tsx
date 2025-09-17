// Note: avoid importing server-only modules at the top level to keep Storybook/Chromatic happy
// We'll dynamically import getFAQsByTagIds inside the async server component.

import { Accordian } from '@/components/elements/Accordian/Accordian'
import { Button, ButtonType } from '@/components/elements/Button/Button'
import { RichText } from '@/components/elements/RichText/RichText'
import { RootNode } from '@strapi/blocks-react-renderer/dist/BlocksRenderer'
import styles from './FaqsBlock.module.scss'

interface Tag {
	name: string
	documentId: string
}

export interface FaqItem {
	id: string
	question: string
	answer: RootNode[]
}

interface FaqsBlockProps {
	introText?: string
	tags: Tag[]
	buttons: ButtonType[]
}

interface FaqsBlockViewProps {
	introText?: string
	buttons: ButtonType[]
	faqs: FaqItem[]
}

export const FaqsBlockView = ({ introText, buttons, faqs }: FaqsBlockViewProps) => {
	return (
		<section className={styles.faqsBlock}>
			<div className={styles.container}>
				<div className={styles.layout}>
					<div className={styles.left}>
						{introText && <div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />}
						{buttons && buttons.length > 0 && (
							<div className={styles.buttons}>
								{buttons.map((b, i) => (
									<Button key={i} {...b} />
								))}
							</div>
						)}
					</div>
					<div className={styles.right}>
						<div className={styles.accordionList}>
							{faqs.map((faq, idx) => (
								<Accordian key={faq.id} initiallyClosed={idx !== 0} variant="line" title={faq.question}>
									<div className={styles.answer}>
										<RichText text={faq.answer} />
									</div>
								</Accordian>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

// In Storybook, alias '@/components/blocks/PageBlocks/FaqsBlock/FaqsBlock' -> './FaqsBlock.storybook'
// The async server component below will not be executed in Storybook thanks to webpack aliasing.
export const FaqsBlock = async ({ introText, tags, buttons }: FaqsBlockProps) => {
	const tagIds = (tags || []).map((t) => t.documentId).filter(Boolean)
	let faqs: FaqItem[] = []
	if (tagIds.length) {
		const { getFAQsByTagIds } = await import('@/apollo/strapi/getFAQsByTags')
		faqs = await getFAQsByTagIds(tagIds)
	}
	return <FaqsBlockView introText={introText} buttons={buttons} faqs={faqs} />
}

export default FaqsBlock
