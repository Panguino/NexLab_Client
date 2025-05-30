'use client'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from './NexradAnimatorSettings.module.scss'

const NexradAnimatorSettings = () => {
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const setNexradFrameRate = useRootStore.use.setNexradFrameRate()
	const setNexradNumberOfFrames = useRootStore.use.setNexradNumberOfFrames()

	return (
		<div className={styles.NexradAnimatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{nexradNumberOfFrames}</b>
				<RangeInput minValue={1} maxValue={200} value={nexradNumberOfFrames} onChange={(value) => setNexradNumberOfFrames(value)} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{nexradFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={nexradFrameRate} unitStep={1} onChange={setNexradFrameRate} />
			</div>
		</div>
	)
}

export default NexradAnimatorSettings
