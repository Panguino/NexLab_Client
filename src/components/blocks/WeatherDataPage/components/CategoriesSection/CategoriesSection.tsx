'use client'

import Link from 'next/link'
import styles from './CategoriesSection.module.scss'

export const CategoriesSection = () => {
	const categories = [
		{
			title: 'Analysis',
			text: 'Surface & upper-air maps, soundings, and mesoanalysis for current setups.',
			link: '/weather-data/analysis',
			img: '/images/previews/analysis-overview.jpg',
		},
		{
			title: 'Satellite & Radar',
			text: 'Regional composites for quick situational awareness during active weather.',
			link: '/weather-data/satellite-mosaic-radar',
			img: '/images/previews/sat-radar.jpg',
		},
		{
			title: 'NEXRAD Dual-Pol',
			text: 'Z, ZDR, CC, KDP and more for storm interrogation and hazard identification.',
			link: '/weather-data/nexrad-dual-pol-radar',
			img: '/images/previews/dual-pol.jpg',
		},
		{
			title: 'Numerical Models',
			text: 'Short- to medium-range guidance and loops tuned for mesoscale forecasting.',
			link: '/weather-data/forecast-models',
			img: '/images/previews/models.jpg',
		},
		{
			title: 'Text Products',
			text: 'SPC, WPC, NHC, AFDs, and specialized bulletins — all in one place.',
			link: '/weather-data/text-hazards-outlooks',
			img: '/images/previews/text-products.jpg',
		},
	]

	return (
		<section className={styles.categories}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Explore by Category</h2>
					<p>Start with one of our core hubs and drill into the products you need.</p>
				</div>

				<ul className={styles.cardGrid} role="list">
					{categories.map((cat, i) => (
						<li key={i} className={styles.card}>
							<Link className={styles.cardLink} href={cat.link} aria-label={`Open ${cat.title}`}>
								<div className={styles.cardMedia}>
									<img src={cat.img} alt={`${cat.title} preview`} />
								</div>
								<div className={styles.cardBody}>
									<h3 className={styles.cardTitle}>{cat.title}</h3>
									<p className={styles.cardText}>{cat.text}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
