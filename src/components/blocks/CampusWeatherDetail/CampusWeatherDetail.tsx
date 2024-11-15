import { Animator } from '@/components/elements/Animator/Animator'
import styles from './CampusWeatherDetail.module.scss'

export const CampusWeatherDetail = ({ children }) => {
	return <div className={styles.CampusWeatherDetail}>{children}</div>
}
