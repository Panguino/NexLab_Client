import { Button } from '@/components/elements/Button/Button'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './FeedbackHero.module.scss'

export const FeedbackHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.heroInner}>
				<div className={styles.container}>
					<div className={styles.heroContent}>
						<div className={styles.discordBanner}>
							<FontAwesomeIcon icon={faDiscord} className={styles.discordIcon} />
							<span>Feedback is now collected exclusively via Discord</span>
						</div>
						<h1>Share Your Feedback</h1>
						<p>
							We've moved all feedback collection to our Discord community to foster better collaboration and faster responses. Discord
							server and share your thoughts in the NexLab Beta Test channel.
						</p>
						<div className={styles.heroActions}>
							<Button label="Join Discord Community" link="https://discord.gg/8NKZKEXpMv" target="_blank" />
							<Button label="Learn More About Requirements" link="#requirements" target="_self" />
						</div>
					</div>
				</div>
				<div className={styles.heroImage}>
					<img src="/img/discord_community.png" alt="Discord Community" className={styles.image} />
				</div>
			</div>
		</section>
	)
}
