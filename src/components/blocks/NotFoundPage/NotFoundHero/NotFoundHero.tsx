'use client'

import { Button } from '@/components/elements/Button/Button'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import styles from './NotFoundHero.module.scss'

export const NotFoundHero = () => {
	const router = useRouter()

	const handleGoBack = () => {
		router.back()
	}

	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.errorBannerWrapper}>
					<div className={styles.errorBanner}>
						<FontAwesomeIcon icon={faTriangleExclamation} className={styles.warningIcon} />
						<span className={styles.errorCode}>404 - Page Not Found</span>
					</div>
				</div>

				<div className={styles.container}>
					<div className={styles.heroContent}>
						<p className={styles.description}>
							We really hate to rain on your parade but we couldn't find the page you were looking for. The page may have been moved,
							deleted, or the URL might be incorrect.
						</p>

						<p className={styles.suggestion}>
							Try using your browser's back button to return to the previous page, or visit our homepage to navigate to where you'd like
							to go.
						</p>

						<div className={styles.heroActions}>
							<Button label="Return to Homepage" link="/" target="_self" />
							<Button label="Go Back" onClick={handleGoBack} variantClassName={styles.secondaryButton} />
						</div>

						<div className={styles.feedbackSection}>
							<FontAwesomeIcon icon={faCommentDots} className={styles.feedbackIcon} />
							<span>
								If this problem persists, please visit our{' '}
								<a href="/feedback" className={styles.feedbackLink}>
									feedback page
								</a>{' '}
								to report the issue.
							</span>
						</div>
					</div>
				</div>

				<div className={styles.heroImage}>
					<img src="/img/sad-rain.png" alt="404 Error" className={styles.image} />
					<div className={styles.imageCredit}>
						Credit:{' '}
						<a href="https://pixabay.com/users/elisariva-1348268/" target="_blank" rel="noopener noreferrer">
							ElisaRiva @ Pixabay
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
