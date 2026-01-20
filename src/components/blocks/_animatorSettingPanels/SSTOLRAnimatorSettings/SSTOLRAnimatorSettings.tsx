'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from '../AnimatorSettings.module.scss'

const SSTOLRAnimatorSettings = () => {
	const climateSSTOLRNumberOfFrames = useRootStore.use.climateSSTOLRNumberOfFrames()
	const setClimateSSTOLRNumberOfFrames = useRootStore.use.setClimateSSTOLRNumberOfFrames()
	const climateSSTOLRFrameRate = useRootStore.use.climateSSTOLRFrameRate()
	const setClimateSSTOLRFrameRate = useRootStore.use.setClimateSSTOLRFrameRate()
	const climateSSTOLRLastFrameDwellTime = useRootStore.use.climateSSTOLRLastFrameDwellTime()
	const setClimateSSTOLRLastFrameDwellTime = useRootStore.use.setClimateSSTOLRLastFrameDwellTime()
	const climateSSTOLRLastFrameDwell = useRootStore.use.climateSSTOLRLastFrameDwell()
	const setClimateSSTOLRLastFrameDwell = useRootStore.use.setClimateSSTOLRLastFrameDwell()

	return (
		<div className={styles.animatorSettings}>
			<p>Number of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{climateSSTOLRNumberOfFrames} frames</b>
				<RangeInput minValue={1} maxValue={200} value={climateSSTOLRNumberOfFrames} unitStep={1} onChange={setClimateSSTOLRNumberOfFrames} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{climateSSTOLRFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={climateSSTOLRFrameRate} unitStep={1} onChange={setClimateSSTOLRFrameRate} />
			</div>
			<p>Last Frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={climateSSTOLRLastFrameDwell} onChange={setClimateSSTOLRLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{climateSSTOLRLastFrameDwellTime} sec</b>
				<RangeInput
					minValue={0.1}
					maxValue={5}
					value={climateSSTOLRLastFrameDwellTime}
					unitStep={0.1}
					onChange={setClimateSSTOLRLastFrameDwellTime}
				/>
			</div>
		</div>
	)
}

export default SSTOLRAnimatorSettings
