'use client'
import { getHazards } from '@/apollo/data/getHazards'
import { useIntervalWithCountdown } from '@/hooks/useIntervalWithCountdown'
import { useRootStore } from '@/store/useRootStore'
import { prepareAlertsFromAPI } from '@/util/hazardMapUtils'
import Checkbox from '../Checkbox/Checkbox'
import MultiButtonToggle from '../MultiButtonToggle/MultiButtonToggle'
import styles from './AutoRefreshToggler.module.scss'

const AutoRefreshToggler = () => {
	const setHazardRefreshActive = useRootStore.use.setHazardRefreshActive()
	const setHazardRefreshInterval = useRootStore.use.setHazardRefreshInterval()
	const hazardRefreshInterval = useRootStore.use.hazardRefreshInterval()
	const hazardRefreshActive = useRootStore.use.hazardRefreshActive()
	const slideoutPanelIsOpen = useRootStore.use.slideoutPanelIsOpen()
	const setAllHazards = useRootStore.use.setAllHazards()

	const refreshAlertData = async () => {
		if (hazardRefreshActive && !slideoutPanelIsOpen) {
			const conusCountiesData = await getHazards()
			const alerts = prepareAlertsFromAPI(conusCountiesData)
			setAllHazards(alerts)
		}
	}
	const { timeRemaining } = useIntervalWithCountdown(refreshAlertData, hazardRefreshInterval * 60 * 1000)

	const formatTime = (time) => {
		const timeInSeconds = Math.floor(time / 1000)
		const minutes = Math.floor(timeInSeconds / 60)
		const seconds = timeInSeconds % 60
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}

	return (
		<div className={styles.AutoRefreshToggler}>
			<Checkbox label={`Enable auto-refresh (${formatTime(timeRemaining)})`} value={hazardRefreshActive} onChange={setHazardRefreshActive} />
			<MultiButtonToggle
				options={[
					{ label: '1 min', value: 1 },
					{ label: '2 min', value: 2 },
					{ label: '5 min', value: 5 },
					{ label: '10 min', value: 10 },
				]}
				value={hazardRefreshInterval}
				onChange={setHazardRefreshInterval}
				inactive={!hazardRefreshActive}
			/>
		</div>
	)
}

export default AutoRefreshToggler
