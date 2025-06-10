'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import MultiButtonToggle from '@/components/elements/MultiButtonToggle/MultiButtonToggle'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useIntervalWithCountdown } from '@/hooks/useIntervalWithCountdown'
import { useRootStore } from '@/store/useRootStore'
import { formatTimeMstoMinutesAndSeconds } from '@/util/time'
import styles from '../AnimatorSettings.module.scss'

const NexradAnimatorSettings = ({ refreshData }) => {
	const nexradNumberOfFrames = useRootStore.use.nexradNumberOfFrames()
	const nexradFrameRate = useRootStore.use.nexradFrameRate()
	const setNexradFrameRate = useRootStore.use.setNexradFrameRate()
	const setNexradNumberOfFrames = useRootStore.use.setNexradNumberOfFrames()
	const nexradLastFrameDwellTime = useRootStore.use.nexradLastFrameDwellTime()
	const setNexradLastFrameDwellTime = useRootStore.use.setNexradLastFrameDwellTime()
	const nexradLastFrameDwell = useRootStore.use.nexradLastFrameDwell()
	const setNexradLastFrameDwell = useRootStore.use.setNexradLastFrameDwell()
	const nexradDataRefreshActive = useRootStore.use.nexradDataRefreshActive()
	const nexradDataRefreshInterval = useRootStore.use.nexradDataRefreshInterval()
	const setNexradDataRefreshInterval = useRootStore.use.setNexradDataRefreshInterval()
	const setNexradDataRefreshActive = useRootStore.use.setNexradDataRefreshActive()

	const refreshAlertData = async () => {
		if (nexradDataRefreshActive && refreshData) {
			refreshData()
		}
	}
	const { timeRemaining } = useIntervalWithCountdown(refreshAlertData, nexradDataRefreshInterval * 60 * 1000)

	return (
		<div className={styles.animatorSettings}>
			<p>Number Of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{nexradNumberOfFrames}</b>
				<RangeInput minValue={1} maxValue={200} value={nexradNumberOfFrames} onChangeEnd={(value) => setNexradNumberOfFrames(value)} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{nexradFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={nexradFrameRate} unitStep={1} onChange={setNexradFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={nexradLastFrameDwell} onChange={setNexradLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{nexradLastFrameDwellTime} sec</b>
				<RangeInput minValue={0.1} maxValue={5} value={nexradLastFrameDwellTime} unitStep={0.1} onChange={setNexradLastFrameDwellTime} />
			</div>
			<p>Refresh Settings</p>
			<div className={styles.padding}>
				<Checkbox
					label={`Enable auto-refresh ${nexradDataRefreshActive ? `(${formatTimeMstoMinutesAndSeconds(timeRemaining)})` : ''}`}
					value={nexradDataRefreshActive}
					onChange={setNexradDataRefreshActive}
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
					value={nexradDataRefreshInterval}
					onChange={setNexradDataRefreshInterval}
					inactive={!nexradDataRefreshActive}
				/>
			</div>
		</div>
	)
}

export default NexradAnimatorSettings
