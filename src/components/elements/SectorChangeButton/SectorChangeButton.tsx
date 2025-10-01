'use client'
import { Button } from '../Button/Button'
import styles from './SectorChangeButton.module.scss'

export type SectorChangeButtonType = {
	label?: string | null
	labelValue?: string | null
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
export const SectorChangeButton = ({ label, labelValue, onClick }: SectorChangeButtonType) => {
	return (
		<div className={styles.sectorChangeButton}>
			<div className={styles.info}>
				<div>{label}</div>
				<div>{labelValue}</div>
			</div>
			<Button onClick={onClick} label="Change" className={styles.changeButton} />
		</div>
	)
}
