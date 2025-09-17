'use client'

import styles from './YearByYearOverview.module.scss'

export const YearByYearOverview = () => {
	const firstYearCourses = [
		{
			code: '1110',
			title: 'Introduction to Meteorology',
			description: 'Key processes, systems, and terminology that underpin all later study.',
		},
		{
			code: '1111',
			title: 'Climate',
			description: "Earth's climate system, variability, and change in a societal context.",
		},
		{
			code: '1115',
			title: 'Severe & Unusual Weather',
			description: 'Thunderstorms, tornadoes, hurricanes, radar basics, and hazard awareness.',
		},
		{
			code: '1116 & 1117',
			title: 'Weather Analysis & Forecasting I & II',
			description: 'Reading maps and soundings, interpreting models, and issuing local forecasts.',
		},
		{
			code: '1119',
			title: 'Weather Impacts',
			description: 'U.S. weather hazards, impacts, preparedness, and mitigation.',
		},
		{
			code: '1112',
			title: 'Storm Chasing / Thunderstorm Lab (Intro)',
			description: 'Field-based learning that connects classroom concepts to live weather.',
		},
	]

	const secondYearCourses = [
		{
			code: '2116 & 2117',
			title: 'Advanced Weather Analysis & Forecasting I & II',
			description: 'Independent event analysis, hand analysis mastery, and verification.',
		},
		{
			code: '2114',
			title: 'Aviation Meteorology',
			description: 'Flight-critical weather hazards, METAR/TAF interpretation, and aviation products.',
		},
		{
			code: '2118',
			title: 'Severe Weather Map Analysis (Lab)',
			description: 'Hands-on severe forecasting and nowcasting with real-time radar and data.',
		},
		{
			code: '2115',
			title: 'Mesoscale Meteorology',
			description: 'Local-to-regional weather features, convective systems, and mesoscale analysis tools.',
		},
		{
			code: '2110',
			title: 'Intermediate Meteorology',
			description: 'Bridges to quantitative dynamics/thermodynamics used in upper-division study.',
		},
		{
			code: '2112',
			title: 'Thunderstorm Lab (Advanced Chasing)',
			description: 'Field leadership and advanced responsibilities for returning students.',
		},
	]

	return (
		<section className={styles.yearByYear}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Year-by-Year Overview</h2>
					<p>Start with strong qualitative intuition, then level up the quantitative side.</p>
				</div>

				<div className={styles.yearBlocks}>
					<article className={styles.yearBlock}>
						<h3>First Year: Build the Core</h3>
						<p>
							We immediately focus on foundational aspects of the atmosphere and weather while introducing the math you need, when you
							need it. You'll practice with real data and begin testing your forecasting intuition.
						</p>
						<div className={styles.courseGrid}>
							{firstYearCourses.map((course, index) => (
								<div key={index} className={styles.courseCard}>
									<h4>
										{course.code} — {course.title}
									</h4>
									<p>{course.description}</p>
								</div>
							))}
						</div>
					</article>

					<article className={styles.yearBlock}>
						<h3>Second Year: Level Up the Science</h3>
						<p>
							Keep strengthening your conceptual understanding while we guide you through higher-level quantitative ideas that support
							advanced forecasting and analysis—without restrictive math prerequisites to enroll.
						</p>
						<div className={styles.courseGrid}>
							{secondYearCourses.map((course, index) => (
								<div key={index} className={styles.courseCard}>
									<h4>
										{course.code} — {course.title}
									</h4>
									<p>{course.description}</p>
								</div>
							))}
						</div>
						<p className={styles.advisingTip}>
							<strong>Advising tip:</strong> Pair these with general education and calculus to be fully transfer-ready. Always check the
							COD catalog for the latest prerequisites and credit details.
						</p>
					</article>
				</div>
			</div>
		</section>
	)
}
