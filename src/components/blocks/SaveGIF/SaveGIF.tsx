import React, { useEffect, useState } from 'react'
import styles from './SaveGIF.module.scss'

interface SaveGIFProps {
	gifSaveName?: string
	onGifSave: (filename: string) => void
	framesAvailable: boolean
}

const SaveGIF: React.FC<SaveGIFProps> = ({ gifSaveName = 'animation.gif', onGifSave, framesAvailable }) => {
	const [filename, setFilename] = useState(gifSaveName)
	const [error, setError] = useState('')
	const [isButtonDisabled, setIsButtonDisabled] = useState(!gifSaveName)

	useEffect(() => {
		setIsButtonDisabled(!filename)
	}, [filename])

	const handleSave = () => {
		if (!framesAvailable) {
			// setError('No frames available for saving.')
			// return
		}
		if (!filename || /[<>:"/\\|?*]/.test(filename)) {
			setError('Invalid filename.')
			return
		}
		setError('')
		onGifSave(filename)
	}

	return (
		<div className={styles.saveGifComponent}>
			<div className={styles.inputWrapper}>
				<div className={styles.instructionWrapper}>
					<h4 className={styles.instructionTitle}>Instructions:</h4>
					<p className={styles.instructionText}>
						The GIF will use the current animation settings (e.g., frame rate, start/end frames, dwell times). Please adjust the settings
						in the animator to achieve the desired output before saving.
					</p>
				</div>
				<div className={styles.filenameWrapper}>
					<label className={styles.filenameLabel} htmlFor="filename-input">
						Filename:
					</label>
					<input
						id="filename-input"
						type="text"
						value={filename}
						onChange={(e) => setFilename(e.target.value)}
						className={styles.filenameInput}
					/>
				</div>
				<div className={styles.saveButtonWrapper}>
					<button onClick={handleSave} className={styles.saveButton} disabled={isButtonDisabled}>
						Save GIF
					</button>
				</div>
			</div>
			{error && <p className={styles.errorMessage}>{error}</p>}
		</div>
	)
}

export default SaveGIF
