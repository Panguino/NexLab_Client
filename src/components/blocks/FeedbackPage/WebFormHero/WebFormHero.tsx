import styles from './WebFormHero.module.scss'

export const WebFormHero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.heroContent}>
					<h1>Contact NEXLAB</h1>
					<p>
						Submit your feedback using the form below. For a more collaborative experience with faster responses and community
						interaction, we recommend joining our Discord community.
					</p>
					{/* <div className={styles.discordCTA}>
						<FontAwesomeIcon icon={faDiscord} className={styles.discordIcon} />
						<span>Prefer Discord?</span>
						<Button label="Join Our Community" link="https://discord.gg/8NKZKEXpMv" target="_blank" />
					</div> */}
				</div>
			</div>
		</section>
	)
}
