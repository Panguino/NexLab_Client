import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.section}>
					<h4>Location</h4>
					<p>
						College of DuPage NEXLAB
						<br />
						425 Fawell Boulevard
						<br />
						Berg Instructional Center (BIC)
						<br />
						BIC 3501
						<br />
						Glen Ellyn, IL 60137
					</p>
				</div>
				<div className={styles.section}>
					<h4>Contact</h4>
					<p>630-942-2590</p>
					<Link href="/feedback">Feedback</Link>
				</div>
				<div className={styles.section}>
					<h4>Follow Us</h4>
					<p>find us on social media.</p>
					<Link href="#">LinkedIn</Link>
					<br />
					<Link href="#">Twitter</Link>
					<br />
					<Link href="#">Facebook</Link>
				</div>
				<div className={styles.section}>
					<h4>Other Links</h4>
					<p>other helpful links</p>
					<Link href="/privacy-policy">Privacy Policy</Link>
					<br />
					<Link href="/terms-of-use"> Terms of Use</Link>
					<br />
					<Link href="/faqs">faqs</Link>
				</div>
			</div>
			<div className={styles.copyRight}>© {new Date().getFullYear()} College of DuPage NEXLAB</div>
		</div>
	)
}
