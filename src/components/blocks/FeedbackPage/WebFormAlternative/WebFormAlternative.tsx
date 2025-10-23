import { Button } from '@/components/elements/Button/Button'
import { faWpforms } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './WebFormAlternative.module.scss'

export const WebFormAlternative = () => {
	return (
		<section className={styles.alternative}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.iconWrapper}>
						<FontAwesomeIcon icon={faWpforms} className={styles.icon} />
					</div>
					<div className={styles.textContent}>
						<h3>Prefer a Web Form?</h3>
						<p>
							If you're not familiar with Discord or prefer a more traditional approach, you can submit feedback through our web form.
							While Discord allows for faster interaction and community discussion, we understand it may not be for everyone.
						</p>
					</div>
					<div className={styles.buttonWrapper}>
						<Button label="Use Web Form Instead" link="/feedback/webform" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
