import { Button, ButtonType } from '@/components/elements/Button/Button'
import buttonStyles from '@/styles/buttonStyles.module.scss'
import styles from './SimpleCta.module.scss'

interface ISimpleCtaProps {
	introText?: string
	buttons?: ButtonType[]
	background?: { url?: string | null; size?: string | null } | null
	backgroundFull?: boolean
}

export const SimpleCta = ({ introText, buttons = [], background, backgroundFull }: ISimpleCtaProps) => {
	const hasButtons = buttons && buttons.length > 0
	const hasBg = Boolean(background?.url)
	return (
		<section className={`${styles.simpleCta} ${backgroundFull ? styles.full : ''} ${hasBg ? styles.hasBg : ''}`.trim()}>
			{hasBg && backgroundFull && <div className={styles.bgFull} style={{ backgroundImage: `url(${background?.url})` }} />}
			<div className={styles.container}>
				{hasBg && !backgroundFull ? (
					<div className={styles.heroBox}>
						<div className={styles.bgSquare} style={{ backgroundImage: `url(${background?.url})` }} />
						<div className={`${styles.content} ${styles.overImage}`}>
							{introText && (
								<div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />
							)}
							{hasButtons && (
								<div className={styles.action}>
									{buttons.map((b, i) => (
										<Button key={i} {...b} variantClassName={buttonStyles.blue} />
									))}
								</div>
							)}
						</div>
					</div>
				) : (
					<div className={`${styles.content} ${hasBg ? styles.overImage : ''}`}>
						{introText && <div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />}
						{hasButtons && (
							<div className={styles.action}>
								{buttons.map((b, i) => (
									<Button key={i} {...b} variantClassName={buttonStyles.blue} />
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	)
}
