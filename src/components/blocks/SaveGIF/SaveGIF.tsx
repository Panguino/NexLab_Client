import React, { useState } from 'react'
import './SaveGIF.scss'

interface SaveGIFProps {
	gifSaveName?: string
	onGifSave: (filename: string) => void
	framesAvailable: boolean
}

const SaveGIF: React.FC<SaveGIFProps> = ({ gifSaveName = 'animation.gif', onGifSave, framesAvailable }) => {
	const [filename, setFilename] = useState(gifSaveName)
	const [error, setError] = useState('')

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
		<div className="save-gif-component">
			<div className="input-wrapper">
				<p className="instruction-text">
					The GIF will use the current animation settings (e.g., frame rate, start/end frames, dwell times). Please adjust the settings in
					the animator to achieve the desired output before saving.
				</p>
				<div className="filename-wrapper">
					<label className="filename-label" htmlFor="filename-input">
						Filename:
					</label>
					<input
						id="filename-input"
						type="text"
						value={filename}
						onChange={(e) => setFilename(e.target.value)}
						className="filename-input"
					/>
				</div>
				<div className="save-button-wrapper">
					<button onClick={handleSave} className="save-button">
						Save GIF
					</button>
				</div>
			</div>
			{error && <p className="error-message">{error}</p>}
		</div>
	)
}

export default SaveGIF
