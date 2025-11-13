'use client'

import { Button } from '@/components/elements/Button/Button'
import styles from './CoursesHero.module.scss'

export const CoursesHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.container}>
					<div className={styles.heroContent}>
						<h1>Classes &amp; Course Pathways</h1>
						<p>
							Welcome to COD Meteorology Course Content — our collegiate program is dedicated to providing a comprehensive foundation in
							the atmospheric sciences within your first two years of college. Whether you're a currently registered or aspiring
							student, explore the course material to better understand what we offer and how each class builds your skills. Continue
							below for a program overview and a suggested year-by-year plan for students intending to major in Meteorology.
						</p>
						<div className={styles.heroActions}>
							<Button label="Browse Class Notes & Labs" link="/academics/classes-notes" target="_self" />
							<Button label="Explore NEXLAB Tools" link="/tools" target="_self" />
						</div>
					</div>
				</div>
				<div className={styles.heroImage}>
					<img
						src="https://s3.amazonaws.com/screenshotsandvideos/ShareX/2025/07/opera_2025-07-30_13-08-01.png"
						alt="Weather analysis illustration"
					/>
				</div>
			</div>
		</section>
	)
}
