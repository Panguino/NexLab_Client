/**
 * County Alerts Story for Animator Component
 * Demonstrates displaying county-level weather alerts on the DeckGL map
 * with animation over time using the animator scrubber/timeline controls
 */

import Providers from '@/components/providers/Providers/Providers'
import { createCountyAlertFramesFromAPI, createMockCountyAlertFrames } from '@/util/dataCalls/alerts/createCountyAlertFrames'
import { fetchCountyAlertsLastHours } from '@/util/dataCalls/alerts/parseCountyAlerts'
import type { Meta, StoryFn } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Animator } from './Animator'
import { MapFrame } from './AnimatorMapMachine'

const meta: Meta<typeof Animator> = {
	title: 'Components/Animator/County Alerts',
	component: Animator,
	decorators: [
		(Story) => (
			<Providers>
				<div style={{ height: '100vh' }}>
					<Story />
				</div>
			</Providers>
		),
	],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Animator component displaying county-level weather alerts on a DeckGL map with timeline scrubber controls.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta

/**
 * Mock County Alerts - No API required
 * Shows how county alerts are displayed with colors based on hazard type
 * Use the scrubber to navigate through alert frames
 */
export const MockCountyAlerts: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [debugInfo, setDebugInfo] = useState<string>('')

	useEffect(() => {
		// Create mock frames
		const mockFrames = createMockCountyAlertFrames()

		console.log('=== MOCK COUNTY ALERTS DEBUG ===')
		console.log('Total frames created:', mockFrames.length)

		mockFrames.forEach((frame, index) => {
			console.log(`\n--- Frame ${index} ---`)
			console.log('Frame ID:', frame.id)
			console.log('Timestamp:', frame.timestamp)
			console.log('Frame data type:', frame.data?.type)
			console.log('Frame features count:', frame.data?.features?.length)
			console.log('Frame metadata:', frame.metadata)

			if (frame.data?.features) {
				console.log('Sample features:')
				frame.data.features.slice(0, 3).forEach((feature, fIdx) => {
					console.log(`  Feature ${fIdx}:`, {
						id: feature.properties?.id,
						alertColor: feature.properties?.alertColor,
						hasAlert: feature.properties?.hasAlert,
						alerts: feature.properties?.alerts?.length || 0,
					})
				})
			}
		})

		const debugMsg = `Frames: ${mockFrames.length}, Features per frame: ${mockFrames[0]?.data?.features?.length || 0}`
		setDebugInfo(debugMsg)
		setFrames(mockFrames)
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading mock county alert data...</p>
			</div>
		)
	}

	return (
		<div>
			<div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px', fontSize: '12px' }}>
				<strong>Debug Info:</strong> {debugInfo}
			</div>
			<Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={false} interval={500} />
		</div>
	)
}

MockCountyAlerts.parameters = {
	docs: {
		description: {
			story: 'Mock county alerts showing 4 frames of simulated weather alerts. Use the scrubber timeline to navigate between frames. Counties are colored based on their active weather alerts (red for tornado, blue for severe, orange for fire, cyan for winter).',
		},
	},
}

/**
 * Real API Data - Last 24 Hours
 * Fetches live alert data from the NexLab API for the last 24 hours
 * Use the scrubber to navigate through the alert timeline
 */
export const RealDataLast24Hours: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [debugInfo, setDebugInfo] = useState<string>('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				console.log('=== FETCHING REAL API DATA (24 hours) ===')

				const apiResponse = await fetchCountyAlertsLastHours(24)
				console.log('API Response received:', apiResponse)
				console.log('API Response success:', apiResponse.success)
				console.log('API Response data:', apiResponse.data)
				console.log('Alert count:', Object.keys(apiResponse.data?.alerts || {}).length)
				console.log('Timeline entries:', apiResponse.data?.timeline?.length || 0)

				const alertFrames = createCountyAlertFramesFromAPI(apiResponse)
				console.log('Frames created:', alertFrames.length)

				alertFrames.forEach((frame, index) => {
					console.log(`\n--- Frame ${index} ---`)
					console.log('Frame ID:', frame.id)
					console.log('Features count:', frame.data?.features?.length)
					console.log('Metadata:', frame.metadata)
				})

				setDebugInfo(`API Alerts: ${Object.keys(apiResponse.data?.alerts || {}).length}, Frames: ${alertFrames.length}`)
				setFrames(alertFrames)
				setError(null)
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Failed to fetch alerts'
				setError(errorMsg)
				console.error('Error fetching alerts:', err)
				setDebugInfo(`Error: ${errorMsg}`)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading county alerts from API (last 24 hours)...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
					<p>Error loading alerts: {error}</p>
					<p style={{ fontSize: '12px', marginTop: '10px' }}>
						Make sure the API endpoint is accessible at <code>https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com</code>
					</p>
					<p style={{ fontSize: '12px', marginTop: '10px' }}>Check browser console for detailed logs</p>
				</div>
			</div>
		)
	}

	if (frames.length === 0) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<div style={{ textAlign: 'center', padding: '20px' }}>
					<p>No alerts available for the last 24 hours</p>
					<p style={{ fontSize: '12px', marginTop: '10px' }}>Debug: {debugInfo}</p>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px', fontSize: '12px' }}>
				<strong>Debug Info:</strong> {debugInfo}
			</div>
			<Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={false} interval={500} />
		</div>
	)
}

RealDataLast24Hours.parameters = {
	docs: {
		description: {
			story: 'Live county alerts from the last 24 hours fetched from the NexLab API. Use the scrubber to navigate through the alert timeline. Each frame represents a point in time with counties colored by their active alerts.',
		},
	},
}

/**
 * Real API Data - Last 6 Hours
 * Fetches live alert data from the NexLab API for the last 6 hours
 */
export const RealDataLast6Hours: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const apiResponse = await fetchCountyAlertsLastHours(6)
				const alertFrames = createCountyAlertFramesFromAPI(apiResponse)
				setFrames(alertFrames)
				setError(null)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch alerts')
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading county alerts from API (last 6 hours)...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<div style={{ textAlign: 'center', color: 'red' }}>
					<p>Error loading alerts: {error}</p>
				</div>
			</div>
		)
	}

	if (frames.length === 0) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>No alerts available for the last 6 hours</p>
			</div>
		)
	}

	return <Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={false} interval={500} />
}

RealDataLast6Hours.parameters = {
	docs: {
		description: {
			story: 'Live county alerts from the last 6 hours fetched from the NexLab API. Use the scrubber to navigate through the alert timeline.',
		},
	},
}

/**
 * Real API Data - Last Hour
 * Fetches live alert data from the NexLab API for the last hour
 * FULL CONSOLE DUMP - See browser console for complete API response
 */
export const RealDataLastHour: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [debugInfo, setDebugInfo] = useState<string>('')

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				console.log('\n' + '='.repeat(80))
				console.log('=== REAL API DATA - LAST HOUR - FULL CONSOLE DUMP ===')
				console.log('='.repeat(80))
				console.log('Fetching from: https://api-data-nexlab-staging-1108a5c77b75.herokuapp.com/api/alerts/history/last?hours=1')
				console.log('Timestamp:', new Date().toISOString())
				console.log('='.repeat(80))

				const apiResponse = await fetchCountyAlertsLastHours(1)

				console.log('\n📥 COMPLETE API RESPONSE:')
				console.log(JSON.stringify(apiResponse, null, 2))

				console.log('\n📊 API RESPONSE STRUCTURE:')
				console.log('Success:', apiResponse.success)
				console.log('Data type:', typeof apiResponse.data)
				console.log('Data keys:', Object.keys(apiResponse.data || {}))

				if (apiResponse.data) {
					console.log('\n🚨 ALERTS OBJECT:')
					const alertsObj = apiResponse.data.alerts || {}
					console.log('Total alerts:', Object.keys(alertsObj).length)
					console.log('Alert IDs:', Object.keys(alertsObj).slice(0, 10))
					console.log('Sample alert:', Object.values(alertsObj)[0])

					console.log('\n📅 TIMELINE ARRAY:')
					const timeline = apiResponse.data.timeline || []
					console.log('Timeline entries:', timeline.length)
					if (timeline.length > 0) {
						console.log('First timeline entry:', timeline[0])
						console.log('Last timeline entry:', timeline[timeline.length - 1])
					}

					console.log('\n🔍 DETAILED ALERTS BREAKDOWN:')
					Object.entries(alertsObj).forEach(([alertId, alert]: [string, any], index) => {
						if (index < 5) {
							console.log(`\nAlert ${index + 1} (${alertId}):`, {
								event: alert.event,
								headline: alert.headline,
								status: alert.status,
								countyId: alert.countyId || alert.county_id || alert.properties?.countyId,
								areaDesc: alert.areaDesc,
								properties: alert.properties ? Object.keys(alert.properties) : 'none',
							})
						}
					})
					if (Object.keys(alertsObj).length > 5) {
						console.log(`\n... and ${Object.keys(alertsObj).length - 5} more alerts`)
					}
				}

				console.log('\n' + '='.repeat(80))
				console.log('Creating frames from API response...')
				const alertFrames = createCountyAlertFramesFromAPI(apiResponse)
				console.log('Frames created:', alertFrames.length)
				alertFrames.forEach((frame, idx) => {
					console.log(`Frame ${idx}:`, {
						id: frame.id,
						timestamp: frame.timestamp,
						features: frame.data?.features?.length,
						metadata: frame.metadata,
					})
				})
				console.log('='.repeat(80) + '\n')

				setDebugInfo(`Alerts: ${Object.keys(apiResponse.data?.alerts || {}).length}, Frames: ${alertFrames.length}`)
				setFrames(alertFrames)
				setError(null)
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Failed to fetch alerts'
				console.error('\n❌ ERROR FETCHING ALERTS:')
				console.error(err)
				setError(errorMsg)
				setDebugInfo(`Error: ${errorMsg}`)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading county alerts from API (last hour)...</p>
				<p style={{ fontSize: '12px', marginTop: '10px' }}>Check browser console for full API response dump</p>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
					<p>Error loading alerts: {error}</p>
					<p style={{ fontSize: '12px', marginTop: '10px' }}>Check browser console for error details</p>
				</div>
			</div>
		)
	}

	if (frames.length === 0) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<div style={{ textAlign: 'center', padding: '20px' }}>
					<p>No alerts available for the last hour</p>
					<p style={{ fontSize: '12px', marginTop: '10px' }}>Debug: {debugInfo}</p>
					<p style={{ fontSize: '12px', marginTop: '10px' }}>Check browser console for full API response</p>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px', fontSize: '12px' }}>
				<strong>Debug Info:</strong> {debugInfo}
				<br />
				<strong>📋 Check browser console (F12) for complete API response dump</strong>
			</div>
			<Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={false} interval={500} />
		</div>
	)
}

RealDataLastHour.parameters = {
	docs: {
		description: {
			story: 'Live county alerts from the last hour fetched from the NexLab API. Use the scrubber to navigate through the alert timeline.',
		},
	},
}

/**
 * Mock County Alerts with AutoPlay
 * Automatically plays through the alert frames
 */
export const MockCountyAlertsAutoPlay: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const mockFrames = createMockCountyAlertFrames()
		setFrames(mockFrames)
		setIsLoading(false)
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading mock county alert data...</p>
			</div>
		)
	}

	return <Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={true} interval={1000} />
}

MockCountyAlertsAutoPlay.parameters = {
	docs: {
		description: {
			story: 'Mock county alerts with auto-play enabled. The animation will automatically cycle through the alert frames. Use the play/pause button to control playback and the scrubber to manually navigate.',
		},
	},
}
