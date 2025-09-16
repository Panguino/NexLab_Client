import { Button, ButtonType } from '@/components/elements/Button/Button'
import styles from './SimpleCta.module.scss'

interface ISimpleCtaProps {
	introText?: string
	button?: ButtonType
}

export const SimpleCta = ({ introText, button }: ISimpleCtaProps) => {
	const hasAction = !!(button && (button.link || button.onClick))
	return (
		<section className={styles.simpleCta}>
			<div className={styles.container}>
				{introText && <div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />}
				{hasAction && (
					<div className={styles.action}>
						<Button {...(button as ButtonType)} />
					</div>
				)}
			</div>
		</section>
	)
}
