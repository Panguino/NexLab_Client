'use client'
import Checkbox from '../Checkbox/Checkbox'
import styles from './AutoRefreshToggler.module.scss'
import MultiButtonToggle from '../MultiButtonToggle/MultiButtonToggle'
import { useRootStore } from '@/store/useRootStore'

const AutoRefreshToggler = () => {
	const hazardRefreshActive = useRootStore.use.hazardRefreshActive()
	const setHazardRefreshActive = useRootStore.use.setHazardRefreshActive()
	const hazardRefreshInterval = useRootStore.use.hazardRefreshInterval()
	const setHazardRefreshInterval = useRootStore.use.setHazardRefreshInterval()
	return (
		<div className={styles.AutoRefreshToggler}>
			<Checkbox label="Enable auto-refresh" value={hazardRefreshActive} onChange={setHazardRefreshActive} />
			<MultiButtonToggle
				options={[
					{ label: '1 min', value: 1 },
					{ label: '2 min', value: 2 },
					{ label: '5 min', value: 5 },
					{ label: '10 min', value: 10 }
				]}
				value={hazardRefreshInterval}
				onChange={setHazardRefreshInterval}
				inactive={!hazardRefreshActive}
			/>
		</div>
	)
}

export default AutoRefreshToggler
