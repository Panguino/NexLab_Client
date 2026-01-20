'use client'
import Checkbox from '@/components/elements/Checkbox/Checkbox'
import RangeInput from '@/components/elements/RangeInput/RangeInput'
import { useRootStore } from '@/store/useRootStore'
import styles from '../AnimatorSettings.module.scss'

interface ClimateSeasonalAnimatorSettingsProps {
	refreshData: () => void
}

const ClimateSeasonalAnimatorSettings = ({ refreshData }: ClimateSeasonalAnimatorSettingsProps) => {
	const climateSeasonalFrameRate = useRootStore.use.climateSeasonalFrameRate()
	const setClimateSeasonalFrameRate = useRootStore.use.setClimateSeasonalFrameRate()
	const climateSeasonalLastFrameDwellTime = useRootStore.use.climateSeasonalLastFrameDwellTime()
	const setClimateSeasonalLastFrameDwellTime = useRootStore.use.setClimateSeasonalLastFrameDwellTime()
	const climateSeasonalLastFrameDwell = useRootStore.use.climateSeasonalLastFrameDwell()
	const setClimateSeasonalLastFrameDwell = useRootStore.use.setClimateSeasonalLastFrameDwell()

	return (
		<div className={styles.animatorSettings}>
			<p>Animation Speed (slow/fast)</p>
			<div className={styles.group}>
				<b>{climateSeasonalFrameRate} fps</b>
				<RangeInput minValue={1} maxValue={20} value={climateSeasonalFrameRate} unitStep={1} onChange={setClimateSeasonalFrameRate} />
			</div>
			<p>Last Frame Dwell Time (slow/fast)</p>
			<div className={styles.padding}>
				<Checkbox label={'Last Frame Dwell Enabled'} value={climateSeasonalLastFrameDwell} onChange={setClimateSeasonalLastFrameDwell} />
			</div>
			<div className={styles.group}>
				<b>{climateSeasonalLastFrameDwellTime} sec</b>
				<RangeInput
					minValue={0.1}
					maxValue={5}
					value={climateSeasonalLastFrameDwellTime}
					unitStep={0.1}
					onChange={setClimateSeasonalLastFrameDwellTime}
				/>
			</div>
		</div>
	)
}

export default ClimateSeasonalAnimatorSettings
