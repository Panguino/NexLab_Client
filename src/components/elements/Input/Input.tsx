import React from 'react'
import styles from './Input.module.scss'

export interface InputProps {
	label?: string | null
	value: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ label, value, onChange }) => {
	return (
		<>
			{label && (
				<label className={styles.label} htmlFor="input-field">
					{label}:
				</label>
			)}
			<input id="input-field" type="text" value={value} onChange={onChange} className={styles.input} />
		</>
	)
}

export default Input
