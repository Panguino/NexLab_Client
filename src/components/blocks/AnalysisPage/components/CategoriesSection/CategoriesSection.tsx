'use client'

import Link from 'next/link'
import styles from './CategoriesSection.module.scss'

export const CategoriesSection = () => {
	const categories = [
		{
			title: 'Surface Maps',
			text: 'Fronts, pressure, wind, temperature, and dewpoint to locate boundaries and synoptic features.',
			link: '/weather-data/analysis#surface-maps',
			img: '/images/previews/analysis-surface.jpg',
		},
		{
			title: 'Upper Air Maps',
			text: '850–300 mb height, wind, temperature, and vorticity for pattern recognition and jet dynamics.',
			link: '/weather-data/analysis#upper-air',
			img: '/images/previews/analysis-upperair.jpg',
		},
		{
			title: 'Soundings',
			text: 'Observed RAOB profiles and derived indices to assess instability, shear, and moisture.',
			link: '/weather-data/analysis#soundings',
			img: '/images/previews/analysis-sounding.jpg',
		},
		{
			title: 'RAP Mesoanalysis',
			text: 'Real-time CAPE, shear, lapse rates, convergence, and composite parameters for mesoscale setups.',
			link: '/weather-data/analysis#rap-meso',
			img: '/images/previews/analysis-rapmeso.jpg',
		},
		{
			title: 'Isentropic Analysis',
			text: 'Diagnose ascent/descent and moisture transport on theta surfaces for precipitation forecasting.',
			link: '/weather-data/analysis#isentropic',
			img: '/images/previews/analysis-isentropic.jpg',
		},
	]

	return (
		<section className={styles.categories}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Explore Analysis Tools</h2>
					<p>Five complementary views of the current atmosphere.</p>
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
									<span className={styles.cardCTA}>Open →</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
