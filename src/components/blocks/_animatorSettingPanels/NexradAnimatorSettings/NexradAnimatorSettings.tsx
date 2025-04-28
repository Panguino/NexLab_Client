'use client'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from './NexradAnimatorSettings.module.scss'

const NexradAnimatorSettings = () => {
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const setNexradFrameRate = useRootStore.use.setNexradFrameRate()
	const setNexradNumberOfFrames = useRootStore.use.setNexradNumberOfFrames()

	const frameDurationMs = 16 + (1000 - 16) * nexradFrameRate
	const fps = 1000 / frameDurationMs

	return (
		<div className={styles.NexradAnimatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{nexradNumberOfFrames}</b>
				<RangeInput minValue={1} maxValue={200} value={nexradNumberOfFrames} onChange={(value) => setNexradNumberOfFrames(value)} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{fps >= 1 ? Math.floor(fps) : fps.toFixed(1)} fps</b>
				<RangeInput
					minValue={0.01}
					maxValue={0.99}
					value={1 - nexradFrameRate}
					unitStep={0.01}
					onChange={(value) => setNexradFrameRate(1 - value)}
				/>
			</div>
		</div>
	)
}

export default NexradAnimatorSettings
