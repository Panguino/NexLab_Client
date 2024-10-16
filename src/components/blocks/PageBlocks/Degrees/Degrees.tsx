import { DegreeInfo } from '../../DegreeInfo/DegreeInfo'
import styles from './Degrees.module.scss'

export const Degrees = ({ degrees }) => {
	return (
		<div className={styles.degrees}>
			{degrees.map((degree, index) => {
				return <DegreeInfo key={index} {...degree} />
			})}
		</div>
	)
}
