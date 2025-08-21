import React from 'react'
import styles from './Scrubber.module.scss'

interface IScrubberProps {
	minValue: number
	maxValue: number
	value: number
	onChange: (value: number) => void
	unitStep?: number
	frameLoadStates?: boolean[] // Array indicating which frames are loaded
	placeholderImageUrl?: string // URL of placeholder image to check against
	frames?: string[] // Array of frame URLs to check loading state
	frameLabels?: string[] // Optional labels per frame, displayed above the scrubber
}

const Scrubber: React.FC<IScrubberProps> = ({
	minValue,
	maxValue,
	value,
	onChange,
	unitStep = 1,
	frameLoadStates,
	placeholderImageUrl,
	frames,
	frameLabels,
}) => {
	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(event.target.value, 10)
		onChange(newValue)
	}

	const handleFrameClick = (frameIndex: number) => {
		onChange(frameIndex)
	}

	// Determine if we should show the enhanced scrubber with frame indicators
	const showFrameIndicators = frameLoadStates || (frames && placeholderImageUrl) || (frameLabels && frameLabels.length > 0)

	// Calculate frame load states if not provided but we have frames and placeholder URL
	const getFrameLoadStates = (): boolean[] => {
		if (frameLoadStates) return frameLoadStates
		if (frames && placeholderImageUrl) {
			return frames.map((frame) => frame !== placeholderImageUrl)
		}
		// If labels are provided without load states, assume all loaded for display purposes
		if (frameLabels && frameLabels.length > 0) {
			return new Array(frameLabels.length).fill(true)
		}
		return []
	}

	const loadStates = getFrameLoadStates()

	if (showFrameIndicators && loadStates.length > 0) {
		// Enhanced scrubber with frame indicators and optional labels
		return (
			<div className={styles.timelineScrubber}>
				{frameLabels && frameLabels.length === loadStates.length && (
					<div className={styles.frameLabels}>
						{frameLabels.map((label, index) => (
							<div key={index} className={styles.frameLabel} onClick={() => handleFrameClick(index)} title={label}>
								{label}
							</div>
						))}
					</div>
				)}
				<div className={styles.enhancedScrubber}>
					<div className={styles.frameIndicators}>
						{(() => {
							const totalFrames = loadStates.length
							const percentPerFrame = totalFrames > 0 ? 100 / totalFrames : 0
							const centerLeft = `${(value + 0.5) * percentPerFrame}%`
							const width = totalFrames > 0 ? `max(50px, ${percentPerFrame}%)` : '50px'
							return <div className={styles.scrubTab} style={{ left: centerLeft, width }} />
						})()}
						{loadStates.map((isLoaded, index) => (
							<div
								key={index}
								className={`${styles.frameIndicator} ${isLoaded ? styles.loaded : styles.unloaded}`}
								onClick={() => handleFrameClick(index)}
								title={`Frame ${index + 1} - ${isLoaded ? 'Loaded' : 'Unloaded'}`}
							/>
						))}
					</div>
					<input
						type="range"
						min={minValue}
						max={maxValue}
						step={unitStep}
						value={value}
						onChange={handleSliderChange}
						className={styles.hiddenSlider}
					/>
				</div>
			</div>
		)
	}

	// Default scrubber (existing behavior)
	return (
		<div className={styles.timelineScrubber}>
			<input type="range" min={minValue} max={maxValue} step={unitStep} value={value} onChange={handleSliderChange} className={styles.slider} />
		</div>
	)
}

export default Scrubber
