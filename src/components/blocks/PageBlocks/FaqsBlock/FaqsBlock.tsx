import { Button, ButtonType } from '@/components/elements/Button/Button'
import styles from './FaqsBlock.module.scss'

interface Tag {
	name: string
	documentId: string
}

interface FaqsBlockProps {
	introText?: string
	tags: Tag[]
	buttons: ButtonType[]
}

export const FaqsBlock = ({ introText, tags, buttons }: FaqsBlockProps) => {
	return (
		<section className={styles.faqsBlock}>
			<div className={styles.container}>
				{introText && <div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />}
				{tags && tags.length > 0 && (
					<ul className={styles.tags}>
						{tags.map((t) => (
							<li key={t.documentId} className={styles.tag}>
								{t.name}
							</li>
						))}
					</ul>
				)}
				{buttons && buttons.length > 0 && (
					<div className={styles.buttons}>
						{buttons.map((b, i) => (
							<Button key={i} {...b} />
						))}
					</div>
				)}
			</div>
		</section>
	)
}

export default FaqsBlock
