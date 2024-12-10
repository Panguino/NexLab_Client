import { Button } from '@/components/elements/Button/Button'
import React, { useEffect, useState } from 'react'
import styles from './SaveGIF.module.scss'

interface SaveGIFProps {
	gifSaveName?: string
	doGifSave: (filename: string) => void
	framesAvailable: any[] | undefined
}

const SaveGIF: React.FC<SaveGIFProps> = ({ gifSaveName = 'animation.gif', doGifSave, framesAvailable }) => {
	const [filename, setFilename] = useState(gifSaveName)
	const [error, setError] = useState('')
	const [isButtonDisabled, setIsButtonDisabled] = useState(!gifSaveName)
	const [buttonText, setButtonText] = useState('Save GIF')

	useEffect(() => {
		setIsButtonDisabled(!filename)
	}, [filename])

	const handleSave = () => {
		if (!framesAvailable || framesAvailable.length === 0) {
			setError('No frames available for saving.')
			return
		}
		if (!filename || /[<>:"/\\|?*]/.test(filename)) {
			setError('Invalid filename.')
			return
		}
		setError('')
		doGifSave(filename)
		setButtonText('Saved!')
		setIsButtonDisabled(true)
	}
	const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilename(e.target.value)
		setButtonText('Save GIF')
		setIsButtonDisabled(!e.target.value)
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
					<input id="filename-input" type="text" value={filename} onChange={handleFilenameChange} className={styles.filenameInput} />
					{error && <p className={styles.errorMessage}>{error}</p>}
				</div>
				<div className={styles.saveButtonWrapper}>
					<Button label={buttonText} onClick={handleSave} disabled={isButtonDisabled} />
					{/* <button onClick={handleSave} className={styles.saveButton} disabled={isButtonDisabled}>
						{buttonText}
					</button> */}
				</div>
			</div>
		</div>
	)
}

export default SaveGIF
