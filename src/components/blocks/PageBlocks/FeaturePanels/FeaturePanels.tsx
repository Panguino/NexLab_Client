import { Button } from '@/components/elements/Button/Button'
import styles from './FeaturePanels.module.scss'

interface IFeaturePanels {
	title: string
	description: string
	buttons: ButtonType[]
	featurePanels: FeaturePanel[]
}

type FeaturePanel = {
	title: string
	description: string
	href: string
	image: string | null
	linkText: string
}

type ButtonType = {
	label: string
	link: string
	target: string
}

export const FeaturePanels = ({ title, description, buttons, featurePanels }: IFeaturePanels) => {
	return (
		<div className={styles.featurePanels}>
			<h2>{title}</h2>
			<p>{description}</p>
			<div className={styles.panels}>
				{featurePanels.map(({ title, description, href, image, linkText }, index) => {
					return (
						<div className={styles.panel} key={index} style={{ backgroundImage: `url(${image})` }}>
							<h3>{title}</h3>
							<p>{description}</p>
							{href && linkText && <a href={href}>{linkText}</a>}
						</div>
					)
				})}
			</div>
			{buttons.length > 0 && (
				<div className={styles.buttons}>
					{buttons.map((button, index) => {
						return <Button key={index} {...button} />
					})}
				</div>
			)}
		</div>
	)
}
