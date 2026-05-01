'use client'

import { SpotterNetworkReport, TrackerData } from '@/types/tracker'
import { getConvectiveOutlookData } from '@/util/dataCalls/stormChasing/query-convective-outlook'
import { getSpotterNetworkData } from '@/util/dataCalls/stormChasing/query-spotter-network'
import { getTrackerData } from '@/util/dataCalls/stormChasing/query-tracker'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import styles from './StormChaseTrackerMap.module.scss'

const TrackerMap = dynamic(() => import('@/components/elements/TrackerMap/TrackerMap'), {
	ssr: false,
})

const StormChaseTrackerMap = () => {
	const [trackerData, setTrackerData] = useState<TrackerData | null>(null)
	const [convectiveData, setConvectiveData] = useState<object | null>(null)
	const [spotterNetworkData, setSpotterNetworkData] = useState<SpotterNetworkReport[]>([])
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [trackerResult, convectiveResult, spotterNetworkResult] = await Promise.allSettled([
					getTrackerData(),
					getConvectiveOutlookData(),
					getSpotterNetworkData(),
				])

				if (trackerResult.status === 'fulfilled') {
					setTrackerData(trackerResult.value)
				} else {
					setError('Unable to load tracker data.')
				}
				if (convectiveResult.status === 'fulfilled') {
					setConvectiveData(convectiveResult.value)
				}
				if (spotterNetworkResult.status === 'fulfilled') {
					setSpotterNetworkData(spotterNetworkResult.value)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) {
		return <div className={styles.StormChaseTrackerMap}>Loading tracker...</div>
	}

	if (error || !trackerData) {
		return <div className={styles.StormChaseTrackerMap}>{error || 'No tracker data available.'}</div>
	}

	return (
		<div className={styles.StormChaseTrackerMap}>
			<TrackerMap data={trackerData} convectiveOutlookData={convectiveData} spotterNetworkData={spotterNetworkData} />
		</div>
	)
}

export default StormChaseTrackerMap
