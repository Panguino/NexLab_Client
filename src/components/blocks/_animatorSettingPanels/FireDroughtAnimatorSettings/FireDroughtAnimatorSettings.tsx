'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import { useState } from 'react'
import styles from '../AnimatorSettings.module.scss'

const FireDroughtAnimatorSettings = () => {
	const fireAnalysisNumberOfFrames = useRootStore.use.fireAnalysisNumberOfFrames()
	const fireAnalysisFrameRate = useRootStore.use.fireAnalysisFrameRate()
	const setFireAnalysisFrameRate = useRootStore.use.setFireAnalysisFrameRate()
	const setFireAnalysisNumberOfFrames = useRootStore.use.setFireAnalysisNumberOfFrames()
	const fireAnalysisLastFrameDwellTime = useRootStore.use.fireAnalysisLastFrameDwellTime()
	const setFireAnalysisLastFrameDwellTime = useRootStore.use.setFireAnalysisLastFrameDwellTime()
	const fireAnalysisLastFrameDwell = useRootStore.use.fireAnalysisLastFrameDwell()
	const setFireAnalysisLastFrameDwell = useRootStore.use.setFireAnalysisLastFrameDwell()
	const [displayNumberOfFrames, setDisplayNumberOfFrames] = useState(fireAnalysisNumberOfFrames)

	return (
		<div className={styles.animatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{displayNumberOfFrames}</b>
				<RangeInput
					minValue={1}
					maxValue={200}
					value={displayNumberOfFrames}
					onChange={(value) => setDisplayNumberOfFrames(value)}
					onChangeEnd={(value) => {
						setDisplayNumberOfFrames(value)
						setFireAnalysisNumberOfFrames(value)
					}}
				/>
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{fireAnalysisFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={fireAnalysisFrameRate} unitStep={1} onChange={setFireAnalysisFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={fireAnalysisLastFrameDwell} onChange={setFireAnalysisLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{fireAnalysisLastFrameDwellTime} sec</b>
				<RangeInput
					minValue={0.1}
					maxValue={5}
					value={fireAnalysisLastFrameDwellTime}
					unitStep={0.1}
					onChange={setFireAnalysisLastFrameDwellTime}
				/>
			</div>
		</div>
	)
}

export default FireDroughtAnimatorSettings
