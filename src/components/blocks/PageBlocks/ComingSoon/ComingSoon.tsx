import styles from './ComingSoon.module.scss'

export type ComingSoonProps = {
	pageName: string
	purpose: string
	etaText?: string
	className?: string
	fullWidth?: boolean
}

export const ComingSoon = ({ pageName, purpose, etaText, className, fullWidth = false }: ComingSoonProps) => {
	const rootClass = `${styles.comingSoon} ${fullWidth ? styles.fullWidth : ''} ${className || ''}`.trim()
	return (
		<section className={rootClass}>
			<div className={styles.inner}>
				<div className={styles.eyebrow}>Coming soon</div>
				<h1 className={styles.title}>{pageName}</h1>
				<p className={styles.purpose}>{purpose}</p>
				{etaText && <div className={styles.eta}>{etaText}</div>}

				<div className={styles.card} aria-hidden>
					<div className={styles.iconWrap}>
						<svg className={styles.icon} viewBox="0 0 24 24" width="48" height="48" fill="none">
							<circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
							<path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<div className={styles.cardText}>We’re building this experience now. Check back soon.</div>
				</div>
			</div>
		</section>
	)
}

export default ComingSoon
