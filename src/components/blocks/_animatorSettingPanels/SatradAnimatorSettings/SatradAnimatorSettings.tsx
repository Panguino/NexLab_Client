'use client'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from './SatradAnimatorSettings.module.scss'

const SatradAnimatorSettings = () => {
	const satradNumberOfFrames = useRootStore.use.satradNumberOfFrames()
	const satradFrameRate = useRootStore.use.satradFrameRate()
	const setSatradFrameRate = useRootStore.use.setSatradFrameRate()
	const setSatradNumberOfFrames = useRootStore.use.setSatradNumberOfFrames()

	return (
		<div className={styles.SatradAnimatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{satradNumberOfFrames}</b>
				<RangeInput minValue={1} maxValue={200} value={satradNumberOfFrames} onChange={(value) => setSatradNumberOfFrames(value)} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{satradFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={satradFrameRate} unitStep={1} onChange={setSatradFrameRate} />
			</div>
		</div>
	)
}

export default SatradAnimatorSettings
