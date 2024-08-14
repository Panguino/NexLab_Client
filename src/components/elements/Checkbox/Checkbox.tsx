'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Checkbox.module.scss'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const Checkbox = ({ label, value, onChange }) => {
	return (
		<div
			className={styles.Checkbox}
			onClick={() => {
				onChange(!value)
			}}
		>
			<div className={styles.check}>{value ? <FontAwesomeIcon icon={faCheck} /> : null}</div> <span>{label}</span>
		</div>
	)
}

export default Checkbox
