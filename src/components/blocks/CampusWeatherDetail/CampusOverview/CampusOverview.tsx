import { Animator } from '@/components/elements/Animator/Animator'
import { CurrentConditions } from '../CurrentConditions/CurrentConditions'
import styles from './CampusOverview.module.scss'

interface ICampusOverviewProps {
	campusImage: string
	currentConditions: any
	radarImageSequence: string[]
}

export const CampusOverview = ({ campusImage, currentConditions, radarImageSequence }: ICampusOverviewProps) => {
	return (
		<div className={styles.campusOverview}>
			<div className={styles.campusImageContainer} style={{ backgroundImage: `url('${campusImage}')` }} />
			<CurrentConditions {...currentConditions} />
			<Animator frames={radarImageSequence} autoPlay hideControls interval={0.1} />
		</div>
	)
}
