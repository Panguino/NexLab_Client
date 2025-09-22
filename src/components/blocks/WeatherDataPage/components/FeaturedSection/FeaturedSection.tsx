'use client'

import Link from 'next/link'
import styles from './FeaturedSection.module.scss'

export const FeaturedSection = () => {
	const featured = [
		{
			badge: 'Analysis',
			title: 'Surface Analysis (Fronts & Isobars)',
			text: 'Track synoptic patterns and boundaries at a glance.',
			img: '/images/previews/feat-sfc-analysis.jpg',
			link: '/weather-data/analysis#surface-analysis',
		},
		{
			badge: 'Satellite & Radar',
			title: 'GOES GeoColor Mosaics',
			text: 'True-color daytime and enhanced nighttime views for context.',
			img: '/images/previews/feat-geocolor.jpg',
			link: '/weather-data/satellite-mosaic-radar#geocolor',
		},
		{
			badge: 'NEXRAD Dual-Pol',
			title: 'Dual-Pol Quicklook',
			text: 'Rapid Z, ZDR, CC, and KDP interrogation for severe cells.',
			img: '/images/previews/feat-dualpol-quicklook.jpg',
			link: '/weather-data/nexrad-dual-pol-radar#quicklook',
		},
		{
			badge: 'Numerical Models',
			title: 'HRRR Composite Reflectivity',
			text: 'High-resolution convective timing and structure guidance.',
			img: '/images/previews/feat-hrrr-ref.jpg',
			link: '/weather-data/forecast-models#hrrr-reflectivity',
		},
		{
			badge: 'Numerical Models',
			title: 'GFS 500 mb Heights/Vort',
			text: 'Large-scale pattern evolution and shortwave tracking.',
			img: '/images/previews/feat-gfs-500.jpg',
			link: '/weather-data/forecast-models#gfs-500mb',
		},
		{
			badge: 'Text Products',
			title: 'SPC Convective Outlooks',
			text: 'Day 1–8 severe probabilities and categorical risk areas.',
			img: '/images/previews/feat-spc-outlook.jpg',
			link: '/weather-data/text-hazards-outlooks#spc-outlooks',
		},
	]

	return (
		<section className={styles.featured}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Featured Products</h2>
					<p>A few favorites across our five hubs. Click through for live data and loops.</p>
				</div>
				<ul className={styles.cardGrid} role="list">
					{featured.map((f, i) => (
						<li key={i} className={styles.card}>
							<Link className={styles.cardLink} href={f.link}>
								<div className={styles.cardMedia}>
									<img src={f.img} alt={f.title} />
								</div>
								<div className={styles.cardBody}>
									<span className={styles.badge}>{f.badge}</span>
									<h3 className={styles.cardTitle}>{f.title}</h3>
									<p className={styles.cardText}>{f.text}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
