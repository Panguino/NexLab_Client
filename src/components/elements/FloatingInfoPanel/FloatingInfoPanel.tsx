import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import styles from './FloatingInfoPanel.module.scss'

interface FloatingInfoPanelProps {
	title: string
	onClose: () => void
	children: React.ReactNode
}

export const FloatingInfoPanel: React.FC<FloatingInfoPanelProps> = ({ title, onClose, children }) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if ((event.target as HTMLElement).closest(`.${styles.floatingInfoPanel}`) === null) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return (
		<div className={styles.floatingInfoPanel}>
			<div className={styles.header}>
				<h2>{title}</h2>
				<button className={styles.closeButton} onClick={onClose}>
					<FontAwesomeIcon icon={faTimes} />
				</button>
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
