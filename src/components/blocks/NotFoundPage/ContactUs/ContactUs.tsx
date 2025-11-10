import { Button } from '@/components/elements/Button/Button'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ContactUs.module.scss'

export const ContactUs = () => {
	return (
		<section className={styles.contactUs}>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.iconWrapper}>
						<FontAwesomeIcon icon={faCommentDots} className={styles.icon} />
					</div>
					<div className={styles.textContent}>
						<h3>Still Can't Find What You're Looking For?</h3>
						<p>
							If you're repeatedly receiving this 'Page Not Found' error for something that is directly linked from within the site,
							please let us know. We want to fix broken links and improve your experience.
						</p>
						<p>
							You can notify us by using Discord or our Web Form by following the instructions on our{' '}
							<a href="/feedback" className={styles.link}>
								Feedback page
							</a>
							.
						</p>
					</div>
					<div className={styles.buttonWrapper}>
						<Button label="Report an Issue" link="/feedback" target="_self" />
					</div>
				</div>
			</div>
		</section>
	)
}
