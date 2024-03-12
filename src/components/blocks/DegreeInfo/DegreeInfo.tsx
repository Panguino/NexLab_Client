import { RichText } from '@/components/elements/RichText/RichText'
import { Button } from '@/components/elements/Button/Button'
import styles from './DegreeInfo.module.scss'

export const DegreeInfo = ({ Title, Buttons, Description }) => {
	return (
		<div className={styles.DegreeInfo}>
			<div className={styles.Info}>
				<h2>{Title}</h2>
				<div className={styles.ButtonGroup}>
					{Buttons.map((button, index) => {
						const { Label, Link, Style } = button
						return <Button key={index} bURL={Link} Style={Style} Label={Label} />
					})}
				</div>
			</div>
			<div className={styles.Description}>
				<RichText text={Description} />
			</div>
		</div>
	)
}
