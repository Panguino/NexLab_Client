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
			<div style={{ width: 460, height: 460 }}>
				<Animator
					imageInfo={{ width: 900, height: 900 }}
					frames={radarImageSequence}
					autoPlay
					hideControls
					interval={1000 / 15}
					hideZoomControls
				/>
			</div>
		</div>
	)
}
