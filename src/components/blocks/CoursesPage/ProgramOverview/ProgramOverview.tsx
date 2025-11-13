'use client'

import { faChartLine, faCloud, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ProgramOverview.module.scss'

export const ProgramOverview = () => {
	const features = [
		{
			icon: faGraduationCap,
			title: 'Foundations first',
			description:
				'We start with a qualitative understanding of the atmosphere, weather phenomena, climate, and forecasting. There are no high-level math prerequisites to begin; we introduce the math you need along the way so you can focus on concepts first.',
		},
		{
			icon: faCloud,
			title: 'Hands-on with real data',
			description: "From day one you'll analyze observations, radar/satellite, and model output, applying concepts directly to live weather.",
		},
		{
			icon: faChartLine,
			title: 'Clear transfer runway',
			description:
				"After two years (paired with your general education and calculus), you'll be prepared to transfer and thrive in upper-division meteorology courses.",
		},
	]

	return (
		<section className={styles.programOverview}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>How the Program Works</h2>
					<p>A concept-first approach that ramps up the math when you're ready.</p>
				</div>

				<div className={styles.featureGrid}>
					{features.map((feature, index) => (
						<div key={index} className={styles.featurePanel}>
							<div className={styles.panelIcon}>
								<FontAwesomeIcon icon={feature.icon} />
							</div>
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
