import { Button } from '@/components/elements/Button/Button'
import buttonStyles from '@/styles/buttonStyles.module.scss'
import Link from 'next/link'
import styles from './FeaturePanels.module.scss'

interface IFeaturePanels {
	title: string
	description: string
	buttons: ButtonType[]
	featurePanels: FeaturePanel[]
}

type FeaturePanel = {
	title: string
	description: string
	href?: string
	image: string | null
	linkText?: string
}

type ButtonType = {
	label: string
	link: string
	target: string
}

export const FeaturePanels = ({ title, description, buttons, featurePanels }: IFeaturePanels) => {
	return (
		<div className={styles.featurePanels}>
			<h2>{title}</h2>
			<p>{description}</p>
			<div className={styles.featurePanelsInner}>
				<div className={styles.panels}>
					{featurePanels.map(({ title, description, href, image, linkText }, index) => {
						const Inner = (
							<>
								{/* Background layer for scale-on-hover */}
								<div className={styles.panelBg} style={{ backgroundImage: image ? `url(${image})` : undefined }} />
								<h3>{title}</h3>
								<p>{description}</p>
								{linkText && (
									<div className={styles.cta}>
										<span className={styles.ctaText}>{linkText}</span>
										<svg className={styles.ctaArrow} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
											<path
												d="M13 5l7 7-7 7M5 12h14"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</div>
								)}
							</>
						)

						const panelClass = href ? styles.panel : `${styles.panel} ${styles.noHover}`
						return href ? (
							<Link className={panelClass} key={index} href={href}>
								{Inner}
							</Link>
						) : (
							<div className={panelClass} key={index}>
								{Inner}
							</div>
						)
					})}
				</div>
				{buttons.length > 0 && (
					<div className={styles.buttons}>
						{buttons.map((button, index) => {
							return <Button variantClassName={buttonStyles.blue} key={index} {...button} />
						})}
					</div>
				)}
			</div>
		</div>
	)
}
