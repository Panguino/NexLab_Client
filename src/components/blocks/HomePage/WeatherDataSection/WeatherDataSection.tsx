'use client'

import Link from 'next/link'
import styles from './WeatherDataSection.module.scss'

export const WeatherDataSection = () => {
	const cards = [
		{
			title: 'Analysis',
			text: 'Surface & upper-air maps, soundings, RAP mesoanalysis, and isentropic tools for diagnosing current setups.',
			link: '/weather-data/analysis',
		},
		{
			title: 'Satellite & Radar',
			text: 'Regional composites and mosaics built for quick situational awareness during active weather.',
			link: '/weather-data/satellite-mosaic-radar',
		},
		{
			title: 'NEXRAD Dual-Pol',
			text: 'Site-level dual-polarization radar products (e.g., ZDR, CC, KDP) for storm interrogation and hazard ID.',
			link: '/weather-data/nexrad-dual-pol-radar',
		},
		{
			title: 'Numerical Models',
			text: 'Model guidance and loops tailored for mesoscale setups, quick comparisons, and forecast confidence.',
			link: '/weather-data/forecast-models',
		},
		{
			title: 'Text Products',
			text: 'NWS/WPC/SPC text products, hazards, outlooks, and specialized bulletins — all in one place.',
			link: '/weather-data/text-hazards-outlooks',
		},
	]

	return (
		<section className={styles.weatherData}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Weather Data</h2>
					<p>Your hub for analysis tools, satellite & radar, dual-pol, forecast models, and text products.</p>
				</div>

				<ul className={styles.cardGrid} role="list">
					{cards.map((card, i) => (
						<li key={i} className={styles.card}>
							<div className={styles.cardBody}>
								<h3 className={styles.cardTitle}>
									<Link href={card.link}>{card.title}</Link>
								</h3>
								<p className={styles.cardText}>{card.text}</p>
								<Link className={styles.cardCTA} href={card.link} aria-label={`Open ${card.title} tools`}>
									Open tools →
								</Link>
							</div>
						</li>
					))}
				</ul>

				<div className={styles.sectionFooter}>
					<Link className={styles.ghostBtn} href="/weather-data">
						Browse all Weather Data
					</Link>
				</div>
			</div>
		</section>
	)
}
