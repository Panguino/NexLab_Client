'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import MultiButtonToggle from '@/components/elements/MultiButtonToggle/MultiButtonToggle'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useIntervalWithCountdown } from '@/hooks/useIntervalWithCountdown'
import { useRootStore } from '@/store/useRootStore'
import { formatTimeMstoMinutesAndSeconds } from '@/util/time'
import styles from '../AnimatorSettings.module.scss'

const ForecastAnimatorSettings = ({ refreshData }) => {
	const forecastFrameRate = useRootStore.use.forecastFrameRate()
	const setForecastFrameRate = useRootStore.use.setForecastFrameRate()
	const forecastLastFrameDwellTime = useRootStore.use.forecastLastFrameDwellTime()
	const setForecastLastFrameDwellTime = useRootStore.use.setForecastLastFrameDwellTime()
	const forecastLastFrameDwell = useRootStore.use.forecastLastFrameDwell()
	const setForecastLastFrameDwell = useRootStore.use.setForecastLastFrameDwell()
	const forecastDataRefreshActive = useRootStore.use.forecastDataRefreshActive()
	const forecastDataRefreshInterval = useRootStore.use.forecastDataRefreshInterval()
	const setForecastDataRefreshInterval = useRootStore.use.setForecastDataRefreshInterval()
	const setForecastDataRefreshActive = useRootStore.use.setForecastDataRefreshActive()

	const refreshAlertData = async () => {
		if (forecastDataRefreshActive && refreshData) {
			refreshData()
		}
	}
	const { timeRemaining } = useIntervalWithCountdown(refreshAlertData, forecastDataRefreshInterval * 60 * 1000)

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
			<p>Refresh Settings</p>
			<div className={styles.padding}>
				<Checkbox
					label={`Enable auto-refresh ${forecastDataRefreshActive ? `(${formatTimeMstoMinutesAndSeconds(timeRemaining)})` : ''}`}
					value={forecastDataRefreshActive}
					onChange={setForecastDataRefreshActive}
				/>
			</div>
			<div className={styles.group}>
				<MultiButtonToggle
					options={[
						{ label: '1 min', value: 1 },
						{ label: '2 min', value: 2 },
						{ label: '5 min', value: 5 },
						{ label: '10 min', value: 10 },
					]}
					value={forecastDataRefreshInterval}
					onChange={setForecastDataRefreshInterval}
					inactive={!forecastDataRefreshActive}
				/>
			</div>
		</div>
	)
}

export default ForecastAnimatorSettings
