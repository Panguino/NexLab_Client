import { getFAQsByTagIds } from '@/apollo/strapi/getFAQsByTags'
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

export const FaqsBlock = async ({ introText, tags, buttons }: FaqsBlockProps) => {
	const tagIds = (tags || []).map((t) => t.documentId).filter(Boolean)
	const faqs: FaqItem[] = tagIds.length ? await getFAQsByTagIds(tagIds) : []
	return <FaqsBlockView introText={introText} buttons={buttons} faqs={faqs} />
}

export default FaqsBlock
