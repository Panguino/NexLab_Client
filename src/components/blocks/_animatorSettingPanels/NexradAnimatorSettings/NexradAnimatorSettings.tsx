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
			<RangeInput minValue={1} maxValue={200} value={nexradNumberOfFrames} onChange={(value) => setNexradNumberOfFrames(value)} />
			<p>Animation Speed</p>
			<RangeInput minValue={0.01} maxValue={1} value={nexradFrameRate} unitStep={0.01} onChange={(value) => setNexradFrameRate(value)} />
		</div>
	)
}

export default NexradAnimatorSettings
