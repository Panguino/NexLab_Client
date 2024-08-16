'use client'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './Checkbox.module.scss'

interface CheckboxProps {
	label: string
	value: boolean
	onChange: (value: boolean) => void
}

const Checkbox = ({ label, value, onChange }: CheckboxProps) => {
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
