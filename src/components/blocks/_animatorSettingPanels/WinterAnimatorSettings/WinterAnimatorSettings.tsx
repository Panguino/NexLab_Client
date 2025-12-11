'use client'

import Checkbox from '@/components/elements/Checkbox/Checkbox'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from '../AnimatorSettings.module.scss'

const WinterAnimatorSettings = () => {
	const winterFrameRate = useRootStore.use.winterFrameRate()
	const setWinterFrameRate = useRootStore.use.setWinterFrameRate()
	const winterLastFrameDwellTime = useRootStore.use.winterLastFrameDwellTime()
	const setWinterLastFrameDwellTime = useRootStore.use.setWinterLastFrameDwellTime()
	const winterLastFrameDwell = useRootStore.use.winterLastFrameDwell()
	const setWinterLastFrameDwell = useRootStore.use.setWinterLastFrameDwell()

	return (
		<div className={styles.animatorSettings}>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{winterFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={20} value={winterFrameRate} unitStep={1} onChange={setWinterFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={winterLastFrameDwell} onChange={setWinterLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{winterLastFrameDwellTime} sec</b>
				<RangeInput minValue={0.1} maxValue={5} value={winterLastFrameDwellTime} unitStep={0.1} onChange={setWinterLastFrameDwellTime} />
			</div>
		</div>
	)
}

export default WinterAnimatorSettings
