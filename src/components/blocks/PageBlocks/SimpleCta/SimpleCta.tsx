import { Button, ButtonType } from '@/components/elements/Button/Button'
import styles from './SimpleCta.module.scss'

interface ISimpleCtaProps {
	introText?: string
	button?: ButtonType
}

export const SimpleCta = ({ introText, button }: ISimpleCtaProps) => {
	return (
		<section className={styles.simpleCta}>
			<div className={styles.container}>
				{introText && <div className={styles.intro} dangerouslySetInnerHTML={{ __html: introText }} />}
				{button && (
					<div className={styles.action}>
						<Button {...button} />
					</div>
				)}
			</div>
		</section>
	)
}
