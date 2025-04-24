import styles from './CurrentValue.module.scss'

interface ICurrentValueProps {
	label: string
	value: number
	unit?: string | null
	specialUnit1?: string | null
	specialUnit2?: string | null
}

export const CurrentValue = ({ label, value, unit, specialUnit1, specialUnit2 }: ICurrentValueProps) => {
	return (
		<div className={styles.parameter}>
			<div className={styles.label}>{label}</div>
			<div className={styles.valueContainer}>
				<div className={styles.value}>
					{value}
					{unit && <sup>{unit}</sup>}
				</div>
				{(specialUnit1 || specialUnit2) && (
					<div className={styles.specialUnit}>
						{specialUnit1 && <div>{specialUnit1}</div>}
						{specialUnit2 && <div>{specialUnit2}</div>}
					</div>
				)}
			</div>
		</div>
	)
}
