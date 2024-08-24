import styles from './CampusWeatherCurrentValue.module.scss'

export const CampusWeatherCurrentValue = ({ label, value }) => {
	return (
		<div className={styles.parameter}>
			<h4 className={styles.label}>{label}</h4>
			<span className={styles.value}>{value}</span>
		</div>
	)
}
