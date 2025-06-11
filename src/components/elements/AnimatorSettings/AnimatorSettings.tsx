'use client'

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { FloatingInfoPanel } from '../FloatingInfoPanel/FloatingInfoPanel'
import styles from './AnimatorSettings.module.scss'

const AnimatorSettings = ({ title, children }) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={styles.AnimatorSettings}>
			<div className={styles.GearIconContainer}>
				<FontAwesomeIcon
					icon={faGear}
					className={styles.GearIcon}
					onClick={() => {
						if (!open) {
							setOpen(true)
						}
					}}
					style={{ pointerEvents: open ? 'none' : 'auto' }} // fix issue with "click outside to close" floating panel
				/>
			</div>
			<FloatingInfoPanel
				className={styles.AnimatorSettingsPanel}
				title={title}
				style={{ visibility: open ? 'visible' : 'hidden' }}
				onClose={() => {
					setOpen(false)
				}}
			>
				{children}
			</FloatingInfoPanel>
		</div>
	)
}

export default AnimatorSettings
