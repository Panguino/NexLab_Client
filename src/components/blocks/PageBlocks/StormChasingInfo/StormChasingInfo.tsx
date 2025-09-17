import { CourseCard } from '@/components/elements/CourseCard/CourseCard'
import styles from './StormChasingInfo.module.scss'

// Static Storm Chasing info block based on provided design
// Note: Update heroImageUrl if/when a different asset is provided
const heroImageUrl = '/img/storm_chasing.jpg'

export const StormChasingInfo = () => {
	return (
		<section className={styles.stormChasingInfo}>
			<div className={styles.card}>
				<div className={styles.hero} style={{ backgroundImage: `url(${heroImageUrl})` }}>
					<div className={styles.overlay} />
					<div className={styles.heroContent}>
						<div className={styles.heroLeft}>
							<div className={styles.kicker}>Field Studies:</div>
							<h1 className={styles.heroTitle}>Storm Chasing</h1>
						</div>
						<div className={styles.heroRight}>
							<p>
								Our storm chasing program offers an experience unlike any other. With over 35 years of experience, we aim to bring you
								directly to the phenomena we study. You'll prepare in the classroom, participate in daily forecast discussions, and
								apply your learning in the field under faculty guidance.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.bodySection}>
					<div className={styles.columns}>
						<div className={styles.leftCol}>
							<h3 className={styles.sectionTitle}>Course Options</h3>
							<CourseCard
								code="ESAS 1112"
								title="Storm Chasing / Thunderstorm Lab (Intro)"
								desc="Open to the general public for participants 18+; no prerequisite."
							/>
							<CourseCard
								code="ESAS 2112"
								title="Thunderstorm Lab (Advanced)"
								desc="For returning students; see prerequisites and instructor permission details."
							/>
						</div>

						<div className={styles.rightCol}>
							<h3 className={styles.sectionTitle}>Who its for</h3>
							<ul className={styles.bulletList}>
								<li>
									<strong>Students:</strong> Gain invaluable insight that solidifies knowledge from coursework.
								</li>
								<li>
									<strong>Enthusiasts:</strong> If you love weather, this is a powerful, memorable way to learn.
								</li>
							</ul>

							<h3 className={styles.sectionTitle}>Important Note</h3>
							<p className={styles.noteText}>
								Dates, fees, logistics, and eligibility are posted ahead of each season. Check the Storm Chasing info page for current
								details.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
