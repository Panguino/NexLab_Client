import { Button } from '@/components/elements/Button/Button'
import styles from './TwoPanelIconInfo.module.scss'

type IconInfoPanel = {
	icon: string | null
	heading: string
	body: string
	buttonLabel: string
	buttonUrl: string
	buttonTarget: string
	backgroundImage: string | null
}

interface ITwoPanelIconInfo {
	panels: IconInfoPanel[]
}

export const TwoPanelIconInfo = ({ panels }: ITwoPanelIconInfo) => {
	return (
		<div className={styles.twoPanelIconInfo}>
			{panels.map(({ icon, heading, body, buttonLabel, buttonUrl, buttonTarget, backgroundImage }, index) => {
				return (
					<div className={styles.panel} key={index}>
						<div className={styles.backgroundImage} style={{ backgroundImage: `url(${backgroundImage})` }} />
						<div className={styles.content}>
							<div className={styles.icon}>
								<img src={icon} />
							</div>
							<h2>{heading}</h2>
							<p>{body}</p>
							<Button label={buttonLabel} link={buttonUrl} target={buttonTarget} />
						</div>
					</div>
				)
			})}
		</div>
	)
}
