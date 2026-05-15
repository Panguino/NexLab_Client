'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from '../AnimatorSettings.module.scss'

const ForecastSoundingAnimatorSettings = () => {
	const forecastSoundingFrameRate = useRootStore.use.forecastSoundingFrameRate()
	const setForecastSoundingFrameRate = useRootStore.use.setForecastSoundingFrameRate()
	const forecastSoundingLastFrameDwellTime = useRootStore.use.forecastSoundingLastFrameDwellTime()
	const setForecastSoundingLastFrameDwellTime = useRootStore.use.setForecastSoundingLastFrameDwellTime()
	const forecastSoundingLastFrameDwell = useRootStore.use.forecastSoundingLastFrameDwell()
	const setForecastSoundingLastFrameDwell = useRootStore.use.setForecastSoundingLastFrameDwell()

	return (
		<div className={styles.animatorSettings}>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{forecastSoundingFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={forecastSoundingFrameRate} unitStep={1} onChange={setForecastSoundingFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={forecastSoundingLastFrameDwell} onChange={setForecastSoundingLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{forecastSoundingLastFrameDwellTime} sec</b>
				<RangeInput
					minValue={0.1}
					maxValue={5}
					value={forecastSoundingLastFrameDwellTime}
					unitStep={0.1}
					onChange={setForecastSoundingLastFrameDwellTime}
				/>
			</div>
		</div>
	)
}

export default ForecastSoundingAnimatorSettings
