'use client'

import { PageLinkCard } from '@/components/elements/PageLinkCard/PageLinkCard'
import { TEXT_SECTIONS } from '@/data/text/landing-page'
import styles from './TextProductsLanding.module.scss'

export const TextProductsLanding = () => {
	return (
		<section className={styles.textProductsLanding}>
			<div className={styles.header}>
				<div className={styles.eyebrow}>Weather Data</div>
				<h1 className={styles.title}>Text Products & Outlooks</h1>
				<p className={styles.subtitle}>
					Access the full spectrum of NWS text products, from real-time hazard alerts to extended climate outlooks. Organized by category
					for quick navigation to the information you need.
				</p>
			</div>

			<div className={styles.grid}>
				{TEXT_SECTIONS.map((section) => (
					<PageLinkCard
						key={section.id}
						id={section.id}
						name={section.name}
						description={section.description}
						icon={section.icon}
						linkUrl={section.linkUrl}
					/>
				))}
			</div>
		</section>
	)
}

export default TextProductsLanding
