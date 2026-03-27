'use client'

import { TrackerData, TrackerMapLayer } from '@/types/tracker'
import { getTrackerData } from '@/util/dataCalls/stormChasing/query-tracker'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import styles from './StormChaseTrackerMap.module.scss'

const TrackerMap = dynamic(() => import('@/components/elements/TrackerMap/TrackerMap'), {
	ssr: false,
})

const DEFAULT_LAYERS: TrackerMapLayer[] = [
	{
		id: 'convective-outlook',
		label: 'Convective Outlook',
		description:
			'Categorical outlooks issued by the Storm Prediction Center (SPC) depicting areas of expected severe weather risk, ranging from Marginal to High threat levels.',
		active: false,
	},
	{
		id: 'convective-watches',
		label: 'Convective Watches',
		description:
			'Active Tornado and Severe Thunderstorm Watch polygons issued by the SPC when conditions are favorable for severe weather development in a specific area.',
		active: false,
	},
	{
		id: 'live-radar',
		label: 'Live Radar',
		description: 'Real-time composite NEXRAD radar reflectivity mosaic showing current precipitation intensity across the area.',
		active: false,
	},
	{
		id: 'spotter-reports',
		label: 'Spotter Reports',
		description: 'Real-time storm reports submitted by trained NWS spotters and the public, including tornadoes, hail, and damaging winds.',
		active: false,
	},
]

const StormChaseTrackerMap = () => {
	const [trackerData, setTrackerData] = useState<TrackerData | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [layers, setLayers] = useState<TrackerMapLayer[]>(DEFAULT_LAYERS)

	const handleToggleLayer = (layerId: string) => {
		setLayers((prev) => prev.map((layer) => (layer.id === layerId ? { ...layer, active: !layer.active } : layer)))
	}

	useEffect(() => {
		const fetchTrackerData = async () => {
			try {
				const data = await getTrackerData()
				setTrackerData(data)
			} catch (err) {
				console.error('Failed to fetch tracker data:', err)
				setError('Unable to load tracker data.')
			} finally {
				setLoading(false)
			}
		}

		fetchTrackerData()
	}, [])

	if (loading) {
		return <div className={styles.StormChaseTrackerMap}>Loading tracker...</div>
	}

	if (error || !trackerData) {
		return <div className={styles.StormChaseTrackerMap}>{error || 'No tracker data available.'}</div>
	}

	return (
		<div className={styles.StormChaseTrackerMap}>
			<TrackerMap data={trackerData} layers={layers} onToggleLayer={handleToggleLayer} />
		</div>
	)
}

export default StormChaseTrackerMap
