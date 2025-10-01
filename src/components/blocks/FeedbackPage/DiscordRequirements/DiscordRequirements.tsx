import { Button } from '@/components/elements/Button/Button'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faComments, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './DiscordRequirements.module.scss'

export const DiscordRequirements = () => {
	return (
		<section id="requirements" className={styles.requirements}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>How to Submit Feedback</h2>
					<p>Follow these simple steps to share your thoughts and suggestions with our team.</p>
				</div>

				<div className={styles.steps}>
					<div className={styles.step}>
						<div className={styles.stepIcon}>
							<FontAwesomeIcon icon={faDiscord} />
						</div>
						<div className={styles.stepContent}>
							<h3>1. Join Our Discord</h3>
							<p>
								Click the link below to join our Discord community. You'll get access to exclusive channels and direct communication
								with our development team.
							</p>
							<Button label="Join Discord: https://discord.gg/8NKZKEXpMv" link="https://discord.gg/8NKZKEXpMv" target="_blank" />
						</div>
					</div>

					<div className={styles.step}>
						<div className={styles.stepIcon}>
							<FontAwesomeIcon icon={faUser} />
						</div>
						<div className={styles.stepContent}>
							<h3>2. Login & Link Your Account</h3>
							<p>
								Make sure you're logged into your NexLab account and have linked it with Discord. This helps us track feedback and
								follow up with you directly.
							</p>
							<Button label="Go to Dashboard Settings" link="/dashboard" target="_self" />
						</div>
					</div>

					<div className={styles.step}>
						<div className={styles.stepIcon}>
							<FontAwesomeIcon icon={faComments} />
						</div>
						<div className={styles.stepContent}>
							<h3>3. Post in NexLab Beta Test Channel</h3>
							<p>
								Navigate to the <strong>#nexlab-beta-test</strong> channel in our Discord server. This is where all feedback, bug
								reports, and feature requests should be posted.
							</p>
						</div>
					</div>
				</div>

				<div className={styles.guidelines}>
					<h3>Feedback Guidelines</h3>
					<ul>
						<li>Search existing messages before posting to avoid duplicates</li>
						<li>Use relevant tags when available (e.g., #bug, #feature-request, #ui)</li>
						<li>Be respectful and constructive in your feedback</li>
						<li>Provide specific details and steps to reproduce issues</li>
						<li>Include screenshots or examples when helpful</li>
					</ul>
				</div>

				<div className={styles.callToAction}>
					<h3>Ready to Share Your Feedback?</h3>
					<p>Join our community and help us make NexLab even better!</p>
					<Button label="Join Discord Community" link="https://discord.gg/8NKZKEXpMv" target="_blank" />
				</div>
			</div>
		</section>
	)
}
