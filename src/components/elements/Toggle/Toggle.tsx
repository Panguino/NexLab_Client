import styles from './Toggle.module.scss'

interface ToggleProps {
	value: boolean
	onClick: (value: boolean) => void
}

const Toggle = ({ value, onClick }: ToggleProps) => {
	return (
		<div
			className={`${styles.toggle} ${value ? styles.active : ''}`}
			onClick={() => {
				onClick(!value)
			}}
		>
			<div className={`${styles.circle} ${value ? styles.active : ''}`} />
		</div>
	)
}
export default Toggle
