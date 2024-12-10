import React from 'react'
import styles from './InputText.module.scss'

export interface InputTextProps {
	label?: string | null
	value: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: React.FC<InputTextProps> = ({ label, value, onChange }) => {
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

export default InputText
