import { DegreeInfo } from '../../DegreeInfo/DegreeInfo'
import styles from './Degrees.module.scss'

export const Degrees = ({ degrees }) => {
	console.log(degrees)
	return (
		<div className={styles.degrees}>
			{degrees.map((d, index) => {
				const { Title, Buttons, Description } = d.attributes
				return <DegreeInfo key={index} Title={Title} Buttons={Buttons} Description={Description} />
			})}
		</div>
	)
}
