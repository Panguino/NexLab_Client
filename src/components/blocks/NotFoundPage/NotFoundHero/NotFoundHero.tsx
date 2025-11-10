'use client'

import { Button } from '@/components/elements/Button/Button'
import { SEARCH_RESULTS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './NotFoundHero.module.scss'

export const NotFoundHero = () => {
	const openSlideoutPanel = useRootStore.use.openSlideoutPanel()

	const handleSearchSite = () => {
		openSlideoutPanel(SEARCH_RESULTS_SLIDEOUT)
	}

	const handleTrySuggestions = () => {
		const suggestionsSection = document.getElementById('suggestions')
		if (suggestionsSection) {
			suggestionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
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
							Let's see if we can help you find what you are looking for. Try using our 'Site Search' feature and use partial page
							titles, product names, or other content keywords to find pages that are available. Otherwise try some of our navigation
							suggestions.
						</p>

						<div className={styles.heroActions}>
							<Button label="Search Site" onClick={handleSearchSite} />
							<Button label="Try Suggestions" onClick={handleTrySuggestions} variantClassName={styles.secondaryButton} />
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
