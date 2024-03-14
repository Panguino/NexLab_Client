import { RichText } from '@/components/elements/RichText/RichText'

import styles from './DegreeInfo.module.scss'

export const DegreeInfo = ({ Title, Buttons, Description }) => {
	return (
		<div className={styles.DegreeInfo}>
			<div className={styles.Info}>
				<h3>{Title}</h3>
				{Buttons.map((button, index) => {
					const { Label, Link, Style } = button
					return (
						<a key={index} href={Link} className={Style}>
							{Label}
						</a>
					)
				})}
			</div>
			<div className={styles.Description}>
				<RichText text={Description} />
			</div>
		</div>
	)
}
