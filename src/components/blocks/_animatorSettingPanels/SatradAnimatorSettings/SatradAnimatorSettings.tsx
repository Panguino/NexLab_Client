'use client'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from './SatradAnimatorSettings.module.scss'

const SatradAnimatorSettings = () => {
	const satradNumberOfFrames = useRootStore.use.satradNumberOfFrames()
	const satradFrameRate = useRootStore.use.satradFrameRate()
	const setSatradFrameRate = useRootStore.use.setSatradFrameRate()
	const setSatradNumberOfFrames = useRootStore.use.setSatradNumberOfFrames()

	const frameDurationMs = 16 + (1000 - 16) * satradFrameRate
	const fps = 1000 / frameDurationMs

	return (
		<div className={styles.SatradAnimatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{satradNumberOfFrames}</b>
				<RangeInput minValue={1} maxValue={200} value={satradNumberOfFrames} onChangeEnd={(value) => setSatradNumberOfFrames(value)} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{fps >= 1 ? Math.floor(fps) : fps.toFixed(1)} fps</b>
				<RangeInput
					minValue={0.01}
					maxValue={0.99}
					value={1 - satradFrameRate}
					unitStep={0.01}
					onChange={(value) => setSatradFrameRate(1 - value)}
				/>
			</div>
		</div>
	)
}

export default SatradAnimatorSettings
