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
			<p className="instruction-text">
				The GIF will use the current animation settings (e.g., frame rate, start/end frames, dwell times). Please adjust the settings in the
				animator to achieve the desired output before saving.
			</p>
			<input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} className="filename-input" />
			<button onClick={handleSave} className="save-button">
				Save GIF
			</button>
			{error && <p className="error-message">{error}</p>}
		</div>
	)
}

export default SaveGIF
