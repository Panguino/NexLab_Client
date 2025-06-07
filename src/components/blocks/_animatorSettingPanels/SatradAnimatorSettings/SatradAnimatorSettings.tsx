'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import MultiButtonToggle from '@/components/elements/MultiButtonToggle/MultiButtonToggle'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useIntervalWithCountdown } from '@/hooks/useIntervalWithCountdown'
import { useRootStore } from '@/store/useRootStore'
import { formatTimeMstoMinutesAndSeconds } from '@/util/time'
import styles from './SatradAnimatorSettings.module.scss'

const SatradAnimatorSettings = ({ refreshData }) => {
	const satradNumberOfFrames = useRootStore.use.satradNumberOfFrames()
	const satradFrameRate = useRootStore.use.satradFrameRate()
	const setSatradFrameRate = useRootStore.use.setSatradFrameRate()
	const setSatradNumberOfFrames = useRootStore.use.setSatradNumberOfFrames()

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
		<div className={styles.SatradAnimatorSettings}>
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
			<p>Refresh Settings</p>
			<div className={styles.padding}>
				<Checkbox
					label={`Enable auto-refresh ${satradDataRefreshActive ? `(${formatTimeMstoMinutesAndSeconds(timeRemaining)})` : ''}`}
					value={satradDataRefreshActive}
					onChange={setSatradDataRefreshActive}
				/>
			</div>
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
	)
}

export default SatradAnimatorSettings
