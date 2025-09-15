'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from '../AnimatorSettings.module.scss'

const ForecastCompareRunsAnimatorSettings = () => {
	const forecastFrameRate = useRootStore.use.forecastFrameRate()
	const setForecastFrameRate = useRootStore.use.setForecastFrameRate()
	const forecastLastFrameDwellTime = useRootStore.use.forecastLastFrameDwellTime()
	const setForecastLastFrameDwellTime = useRootStore.use.setForecastLastFrameDwellTime()
	const forecastLastFrameDwell = useRootStore.use.forecastLastFrameDwell()
	const setForecastLastFrameDwell = useRootStore.use.setForecastLastFrameDwell()

	return (
		<div className={styles.animatorSettings}>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{forecastFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={forecastFrameRate} unitStep={1} onChange={setForecastFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={forecastLastFrameDwell} onChange={setForecastLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{forecastLastFrameDwellTime} sec</b>
				<RangeInput minValue={0.1} maxValue={5} value={forecastLastFrameDwellTime} unitStep={0.1} onChange={setForecastLastFrameDwellTime} />
			</div>
		</div>
	)
}

export default ForecastCompareRunsAnimatorSettings
