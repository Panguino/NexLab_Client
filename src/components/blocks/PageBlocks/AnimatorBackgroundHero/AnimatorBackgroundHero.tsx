import { Button, ButtonType } from '@/components/elements/Button/Button'
import styles from './AnimatorBackgroundHero.module.scss'

interface IAnimatorBackgroundHeroProps {
	text?: string
	buttons?: ButtonType[]
}

export const AnimatorBackgroundHero = ({ text, buttons = [] }: IAnimatorBackgroundHeroProps) => {
	return (
		<section className={styles.hero}>
			<div className={styles.inner}>
				{text && <div className={styles.text} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: text || '' }} />}
				{buttons && buttons.length > 0 && (
					<div className={styles.buttons}>
						{buttons.map((b, i) => (
							<Button key={i} {...b} />
						))}
					</div>
				)}
			</div>
			{/* Hook for future Animator background layering */}
			<div className={styles.bgOverlay} />
		</section>
	)
}
