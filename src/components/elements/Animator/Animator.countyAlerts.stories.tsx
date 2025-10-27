/**
 * County Alerts Story for Animator Component
 * Demonstrates displaying county-level weather alerts on the DeckGL map
 * using real-time hazard data from the NexLab API
 */

import { getHazards } from '@/apollo/data/getHazards'
import Providers from '@/components/providers/Providers/Providers'
import { createMockCountyAlertFrames } from '@/util/dataCalls/alerts/createCountyAlertFrames'
import {
	createCoastalAlertGeoJSON,
	createCountyAlertGeoJSON,
	fetchRealTimeHazards,
	parseHazardsToCoastalMap,
	parseHazardsToCountyMap,
} from '@/util/dataCalls/alerts/parseCountyAlerts'
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
				component: 'Animator component displaying county-level weather alerts on a DeckGL map using real-time hazard data.',
			},
		},
	},
	tags: ['autodocs'],
}

export default meta

/**
 * Mock County Alerts - Test with Simulated Data
 * Uses mock data with Summit County (49053) having 2+ alerts for testing animation
 * No API required - perfect for testing and debugging
 */
export const MockCountyAlerts: StoryFn<typeof Animator> = () => {
	const frames = createMockCountyAlertFrames()

	return (
		<Animator
			frames={frames}
			mode="map"
			mapRegion="conus"
			imageInfo={{ width: 1200, height: 800 }}
			autoPlay={false}
			interval={500}
			startFrame={0}
		/>
	)
}

MockCountyAlerts.parameters = {
	docs: {
		description: {
			story: 'Mock data with simulated county alerts including Summit County, Utah (49053) with 2+ alerts for testing multi-alert animation. No API required.',
		},
	},
}

/**
 * Real-Time Hazards - All Active Hazards
 * Fetches live hazard data from the /api/hazards endpoint
 * Displays all active weather hazards across CONUS on the map
 */
export const RealTimeHazards: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)

				const hazardsResponse = await fetchRealTimeHazards({ region: 'CONUS' })

				// Filter to only active alerts (not expired)
				const now = new Date()
				const activeHazards = (hazardsResponse.data || []).filter((hazard) => {
					return isAlertActiveAtTime(hazard, now)
				})

				// Convert active hazards to county map
				const activeHazardsResponse = {
					...hazardsResponse,
					data: activeHazards,
				}
				const countyMap = parseHazardsToCountyMap(activeHazardsResponse)

				// Create a single frame with all current hazards
				const geoJSON = createCountyAlertGeoJSON(countyMap)

				// Parse coastal/offshore hazards (using active hazards only)
				const coastalMap = parseHazardsToCoastalMap(activeHazardsResponse)

				// Fetch coastal geometry from GraphQL API
				let coastalGeoJSON: any = null
				try {
					const graphqlData = await getHazards()
					const coastalFeatures: any[] = []

					if (graphqlData && graphqlData.getRegions) {
						graphqlData.getRegions.forEach((region: any) => {
							// Process coasts
							if (region && region.coasts) {
								region.coasts.forEach((coast: any) => {
									if (coast && coast.type && coast.geometry) {
										const feature = {
											type: 'Feature',
											geometry: coast.geometry,
											properties: {
												ID: coast.properties?.ID,
												NAME: coast.properties?.NAME,
												type: 'coast',
											},
										}
										coastalFeatures.push(feature)
									}
								})
							}
							// Process offshores
							if (region && region.offshores) {
								region.offshores.forEach((offshore: any) => {
									if (offshore && offshore.type && offshore.geometry) {
										const feature = {
											type: 'Feature',
											geometry: offshore.geometry,
											properties: {
												ID: offshore.properties?.ID,
												NAME: offshore.properties?.NAME,
												type: 'offshore',
											},
										}
										coastalFeatures.push(feature)
									}
								})
							}
						})
					}

					if (coastalFeatures.length > 0) {
						coastalGeoJSON = createCoastalAlertGeoJSON(coastalFeatures, coastalMap)
					}
				} catch (err) {
					console.error('Error fetching coastal geometry from GraphQL:', err)
				}

				const frame: MapFrame = {
					id: 'current-hazards',
					timestamp: new Date(),
					data: geoJSON,
					coastalData: coastalGeoJSON || undefined,
					metadata: {
						source: 'real-time-hazards',
						totalHazards: activeHazards.length,
						totalHazardsFromAPI: hazardsResponse.data?.length || 0,
						countiesAffected: Object.keys(countyMap).length,
						coastalRegionsAffected: Object.keys(coastalMap).length,
					},
				}

				setFrames([frame])
				setError(null)
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Failed to fetch hazards'
				console.error('Error fetching hazards:', err)
				setError(errorMsg)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading real-time hazard data...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
				<p style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</p>
				<p style={{ fontSize: '12px', color: '#666' }}>Check browser console for details</p>
			</div>
		)
	}

	return <Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={false} interval={500} />
}

RealTimeHazards.parameters = {
	docs: {
		description: {
			story: 'Real-time hazard data from the /api/hazards endpoint. Shows all active weather hazards across the CONUS region with county-level coloring based on hazard type and level.',
		},
	},
}

/**
 * Filtered Hazards - Frost Advisories Only
 * Fetches real-time hazard data and filters to show only Frost Advisories
 * Demonstrates how to filter hazards by type and level
 */
export const FrostAdvisories: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				// Fetch all hazards and filter for Frost Advisories
				const hazardsResponse = await fetchRealTimeHazards({ region: 'CONUS' })

				// Filter for Frost Advisories only
				const frostAdvisories =
					hazardsResponse.data?.filter((hazard) => hazard.event?.toLowerCase().includes('frost') && hazard.hazardLevel === 'ADVISORY') || []

				// Create a filtered response
				const filteredResponse = {
					...hazardsResponse,
					data: frostAdvisories,
				}

				// Convert to county map
				const countyMap = parseHazardsToCountyMap(filteredResponse)

				// Create a single frame with filtered hazards
				const geoJSON = createCountyAlertGeoJSON(countyMap)
				const frame: MapFrame = {
					id: 'frost-advisories',
					timestamp: new Date(),
					data: geoJSON,
					metadata: {
						source: 'frost-advisories',
						totalHazards: frostAdvisories.length,
						countiesAffected: Object.keys(countyMap).length,
					},
				}

				setFrames([frame])
				setError(null)
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Failed to fetch hazards'
				console.error('Error fetching hazards:', err)
				setError(errorMsg)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Loading frost advisories...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
				<p style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</p>
				<p style={{ fontSize: '12px', color: '#666' }}>Check browser console for details</p>
			</div>
		)
	}

	if (frames.length === 0 || frames[0].metadata?.totalHazards === 0) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>No frost advisories currently active</p>
			</div>
		)
	}

	return <Animator frames={frames} mode="map" mapRegion="conus" imageInfo={{ width: 1200, height: 800 }} autoPlay={false} interval={500} />
}

FrostAdvisories.parameters = {
	docs: {
		description: {
			story: 'Filtered hazard data showing only Frost Advisories. Demonstrates how to filter real-time hazard data by event type and level. Counties with active frost advisories are highlighted on the map.',
		},
	},
}

/**
 * Check if an alert is active at a given frame time
 * Compares frame time against alert's effective/expires or onset/ends times
 */
function isAlertActiveAtTime(alert: any, frameTime: Date): boolean {
	// Try to get start and end times from various properties
	const startTimeStr = alert.effective || alert.onset || alert.sent
	const endTimeStr = alert.expires || alert.ends

	if (!startTimeStr || !endTimeStr) {
		// If we don't have time info, assume alert is active
		return true
	}

	try {
		const startTime = new Date(startTimeStr)
		const endTime = new Date(endTimeStr)

		// Check if frameTime is between startTime and endTime (inclusive)
		return frameTime >= startTime && frameTime <= endTime
	} catch (e) {
		// If date parsing fails, assume alert is active
		console.warn('Failed to parse alert times:', { startTimeStr, endTimeStr, error: e })
		return true
	}
}

/**
 * Historical Timeline - Scrubable Hazard History
 * Generates multiple frames of hazard data over time to simulate historical progression
 * Allows scrubbing through the timeline to see how hazards evolved
 * Filters alerts based on their effective/expires times
 */
export const HistoricalTimeline: StoryFn<typeof Animator> = () => {
	const [frames, setFrames] = useState<MapFrame[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)

				// Fetch current hazards
				const hazardsResponse = await fetchRealTimeHazards({ region: 'CONUS' })

				// Fetch coastal geometry once
				const coastalFeatures: any[] = []
				try {
					const graphqlData = await getHazards()
					if (graphqlData && graphqlData.getRegions) {
						graphqlData.getRegions.forEach((region: any) => {
							if (region && region.coasts) {
								region.coasts.forEach((coast: any) => {
									if (coast && coast.type && coast.geometry) {
										coastalFeatures.push({
											type: 'Feature',
											geometry: coast.geometry,
											properties: {
												ID: coast.properties?.ID,
												NAME: coast.properties?.NAME,
												type: 'coast',
											},
										})
									}
								})
							}
							if (region && region.offshores) {
								region.offshores.forEach((offshore: any) => {
									if (offshore && offshore.type && offshore.geometry) {
										coastalFeatures.push({
											type: 'Feature',
											geometry: offshore.geometry,
											properties: {
												ID: offshore.properties?.ID,
												NAME: offshore.properties?.NAME,
												type: 'offshore',
											},
										})
									}
								})
							}
						})
					}
				} catch (err) {
					console.error('Error fetching coastal geometry:', err)
				}

				// Generate 24 frames (one for each hour going back)
				const generatedFrames: MapFrame[] = []
				const now = new Date()

				for (let i = 0; i < 24; i++) {
					const frameTime = new Date(now.getTime() - i * 60 * 60 * 1000) // Go back i hours

					// Filter hazards based on whether they are active at this frame time
					// An alert is active if the frame time falls between its effective/onset and expires/ends times
					const timeBasedHazards = (hazardsResponse.data || []).filter((hazard) => {
						return isAlertActiveAtTime(hazard, frameTime)
					})

					// Create county map for this frame
					const filteredResponse = {
						...hazardsResponse,
						data: timeBasedHazards,
					}
					const countyMap = parseHazardsToCountyMap(filteredResponse)
					const coastalMap = parseHazardsToCoastalMap(filteredResponse)

					// Create GeoJSON for this frame
					const geoJSON = createCountyAlertGeoJSON(countyMap)
					const coastalGeoJSON = coastalFeatures.length > 0 ? createCoastalAlertGeoJSON(coastalFeatures, coastalMap) : undefined

					const frame: MapFrame = {
						id: `historical-${i}`,
						timestamp: frameTime,
						data: geoJSON,
						coastalData: coastalGeoJSON,
						metadata: {
							source: 'historical-timeline',
							frameIndex: i,
							totalHazards: timeBasedHazards.length,
							countiesAffected: Object.keys(countyMap).length,
							coastalRegionsAffected: Object.keys(coastalMap).length,
							hoursAgo: i,
						},
					}

					generatedFrames.push(frame)
				}

				setFrames(generatedFrames)
				setError(null)
			} catch (err) {
				const errorMsg = err instanceof Error ? err.message : 'Failed to generate historical frames'
				console.error('Error generating frames:', err)
				setError(errorMsg)
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
				<p>Generating historical timeline...</p>
			</div>
		)
	}

	if (error) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
				<p style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</p>
				<p style={{ fontSize: '12px', color: '#666' }}>Check browser console for details</p>
			</div>
		)
	}

	// Generate frame labels with time and date
	const frameLabels = frames.map((frame) => {
		const date = new Date(frame.timestamp)
		const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
		const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
		return `${timeStr}\n${dateStr}`
	})

	return (
		<Animator
			frames={frames}
			mode="map"
			mapRegion="conus"
			imageInfo={{ width: 1200, height: 800 }}
			autoPlay={false}
			interval={500}
			frameLabels={frameLabels}
			displayAllLabels={false}
			startFrame={0}
		/>
	)
}

HistoricalTimeline.parameters = {
	docs: {
		description: {
			story: 'Historical timeline showing 24 hours of hazard data progression. Scrub through the timeline slider to see how weather hazards evolved over the past day. Each frame represents one hour of historical data with simulated hazard changes.',
		},
	},
}
