'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import MultiButtonToggle from '@/components/elements/MultiButtonToggle/MultiButtonToggle'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useIntervalWithCountdown } from '@/hooks/useIntervalWithCountdown'
import { useRootStore } from '@/store/useRootStore'
import { formatTimeMstoMinutesAndSeconds } from '@/util/time'
import styles from '../AnimatorSettings.module.scss'

interface MRMSAnimatorSettingsProps {
	refreshData: () => void
}

const MRMSAnimatorSettings = ({ refreshData }: MRMSAnimatorSettingsProps) => {
	const mrmsNumberOfFrames = useRootStore.use.mrmsNumberOfFrames()
	const setMrmsNumberOfFrames = useRootStore.use.setMrmsNumberOfFrames()
	const analysisFrameRate = useRootStore.use.analysisFrameRate()
	const setAnalysisFrameRate = useRootStore.use.setAnalysisFrameRate()
	const analysisLastFrameDwellTime = useRootStore.use.analysisLastFrameDwellTime()
	const setAnalysisLastFrameDwellTime = useRootStore.use.setAnalysisLastFrameDwellTime()
	const analysisLastFrameDwell = useRootStore.use.analysisLastFrameDwell()
	const setAnalysisLastFrameDwell = useRootStore.use.setAnalysisLastFrameDwell()
	const analysisDataRefreshActive = useRootStore.use.analysisDataRefreshActive()
	const analysisDataRefreshInterval = useRootStore.use.analysisDataRefreshInterval()
	const setAnalysisDataRefreshInterval = useRootStore.use.setAnalysisDataRefreshInterval()
	const setAnalysisDataRefreshActive = useRootStore.use.setAnalysisDataRefreshActive()

	const refreshMRMSData = async () => {
		if (analysisDataRefreshActive && refreshData) {
			refreshData()
		}
	}
	const { timeRemaining } = useIntervalWithCountdown(refreshMRMSData, analysisDataRefreshInterval * 60 * 1000)

	return (
		<div className={styles.animatorSettings}>
			<p>Number of Frames (1-200)</p>
			<div className={styles.group}>
				<b>{mrmsNumberOfFrames} frames</b>
				<RangeInput minValue={1} maxValue={200} value={mrmsNumberOfFrames} unitStep={1} onChange={setMrmsNumberOfFrames} />
			</div>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{analysisFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={40} value={analysisFrameRate} unitStep={1} onChange={setAnalysisFrameRate} />
			</div>
			<p>Last frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={analysisLastFrameDwell} onChange={setAnalysisLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{analysisLastFrameDwellTime} sec</b>
				<RangeInput minValue={0.1} maxValue={5} value={analysisLastFrameDwellTime} unitStep={0.1} onChange={setAnalysisLastFrameDwellTime} />
			</div>
			<p>Refresh Settings</p>
			<div className={styles.padding}>
				<Checkbox
					label={`Enable auto-refresh ${analysisDataRefreshActive ? `(${formatTimeMstoMinutesAndSeconds(timeRemaining)})` : ''}`}
					value={analysisDataRefreshActive}
					onChange={setAnalysisDataRefreshActive}
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
					value={analysisDataRefreshInterval}
					onChange={setAnalysisDataRefreshInterval}
					inactive={!analysisDataRefreshActive}
				/>
			</div>
		</div>
	)
}

export default MRMSAnimatorSettings
