import { Button, ButtonType } from '@/components/elements/Button/Button'
import Link from 'next/link'
import styles from './FeatureData.module.scss'

type Panel = {
	id: string
	title: string
	description?: string
	background?: { url?: string | null; size?: string | null }
	mainButton?: ButtonType | null
	buttonsTitle?: string
	buttons?: ButtonType[]
}

interface FeatureDataProps {
	introText?: string
	panels: Panel[]
}

export const FeatureData = ({ introText, panels }: FeatureDataProps) => {
	return (
		<section className={styles.featureData}>
			<div className={styles.container}>
				{introText && <div className={styles.intro} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: introText || '' }} />}
				<div className={styles.rows}>
					{panels.map((p) => {
						const hasButtons = Boolean(p.buttons && p.buttons.length > 0)
						return (
							<div className={`${styles.row} ${!hasButtons ? styles.rowSimple : ''}`} key={p.id}>
								{/* Left visual panel */}
								<div className={`${styles.card} ${!hasButtons ? styles.cardVisualOnly : ''}`}>
									{p.background?.url && <div className={styles.media} style={{ backgroundImage: `url(${p.background.url})` }} />}
									{hasButtons && (
										<div className={styles.body}>
											<h3>{p.title}</h3>
											{p.description && <p className={styles.desc}>{p.description}</p>}
											{p.mainButton && (
												<div className={styles.mainButton}>
													<Button {...p.mainButton} className={`${styles.inlineButton} ${p.mainButton?.className || ''}`} />
												</div>
											)}
										</div>
									)}
								</div>

								{/* Right products list or simple content */}
								{hasButtons ? (
									<aside className={styles.side}>
										{p.buttonsTitle && <div className={styles.buttonsTitle}>{p.buttonsTitle}</div>}
										<div className={styles.buttons}>
											{p.buttons!.map((b, i) => (
												<Button key={i} {...b} variantClassName={styles.listButton} />
											))}
										</div>
									</aside>
								) : (
									<aside className={`${styles.side} ${styles.sideSimple}`}>
										<h3>{p.title}</h3>
										{p.description && <p className={styles.desc}>{p.description}</p>}
										{p.mainButton?.link && (
											<Link href={p.mainButton.link} target={p.mainButton.target || undefined} className={styles.linkCTA}>
												{p.mainButton.label || 'Open'}
											</Link>
										)}
									</aside>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

export default FeatureData
