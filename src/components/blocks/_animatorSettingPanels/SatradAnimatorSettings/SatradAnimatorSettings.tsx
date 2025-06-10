'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import MultiButtonToggle from '@/components/elements/MultiButtonToggle/MultiButtonToggle'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useIntervalWithCountdown } from '@/hooks/useIntervalWithCountdown'
import { useRootStore } from '@/store/useRootStore'
import { formatTimeMstoMinutesAndSeconds } from '@/util/time'
import styles from '../AnimatorSettings.module.scss'

const SatradAnimatorSettings = ({ refreshData }) => {
	const satradNumberOfFrames = useRootStore.use.satradNumberOfFrames()
	const satradFrameRate = useRootStore.use.satradFrameRate()
	const setSatradFrameRate = useRootStore.use.setSatradFrameRate()
	const setSatradNumberOfFrames = useRootStore.use.setSatradNumberOfFrames()
	const satradLastFrameDwellTime = useRootStore.use.satradLastFrameDwellTime()
	const setSatradLastFrameDwellTime = useRootStore.use.setSatradLastFrameDwellTime()
	const satradLastFrameDwell = useRootStore.use.satradLastFrameDwell()
	const setSatradLastFrameDwell = useRootStore.use.setSatradLastFrameDwell()
	const satradDataRefreshActive = useRootStore.use.satradDataRefreshActive()
	const satradDataRefreshInterval = useRootStore.use.satradDataRefreshInterval()
	const setSatradDataRefreshInterval = useRootStore.use.setSatradDataRefreshInterval()
	const setSatradDataRefreshActive = useRootStore.use.setSatradDataRefreshActive()

	const refreshAlertData = async () => {
		if (satradDataRefreshActive && refreshData) {
			refreshData()
		}
	}
	const { timeRemaining } = useIntervalWithCountdown(refreshAlertData, satradDataRefreshInterval * 60 * 1000)

	return (
		<div className={styles.animatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{satradNumberOfFrames}</b>
				<RangeInput minValue={1} maxValue={200} value={satradNumberOfFrames} onChangeEnd={(value) => setSatradNumberOfFrames(value)} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{satradFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={satradFrameRate} unitStep={1} onChange={setSatradFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={satradLastFrameDwell} onChange={setSatradLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{satradLastFrameDwellTime} sec</b>
				<RangeInput minValue={0.1} maxValue={5} value={satradLastFrameDwellTime} unitStep={0.1} onChange={setSatradLastFrameDwellTime} />
			</div>
			<p>Refresh Settings</p>
			<div className={styles.padding}>
				<Checkbox
					label={`Enable auto-refresh ${satradDataRefreshActive ? `(${formatTimeMstoMinutesAndSeconds(timeRemaining)})` : ''}`}
					value={satradDataRefreshActive}
					onChange={setSatradDataRefreshActive}
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
					value={satradDataRefreshInterval}
					onChange={setSatradDataRefreshInterval}
					inactive={!satradDataRefreshActive}
				/>
			</div>
		</div>
	)
}

export default SatradAnimatorSettings
