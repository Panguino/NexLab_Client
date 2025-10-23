/**
 * County Alerts Story for Animator Component
 * Demonstrates displaying county-level weather alerts on the DeckGL map
 * using real-time hazard data from the NexLab API
 */

import Providers from '@/components/providers/Providers/Providers'
import { createCountyAlertGeoJSON, fetchRealTimeHazards, parseHazardsToCountyMap } from '@/util/dataCalls/alerts/parseCountyAlerts'
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
				console.log('\n' + '='.repeat(80))
				console.log('=== REAL-TIME HAZARDS - MAPPING DEBUG ===')
				console.log('='.repeat(80))

				const hazardsResponse = await fetchRealTimeHazards({ region: 'CONUS' })
				console.log('Total hazards from API:', hazardsResponse.data?.length || 0)

				// Convert hazards to county map
				const countyMap = parseHazardsToCountyMap(hazardsResponse)
				console.log('Counties with hazards:', Object.keys(countyMap).length)
				console.log('Sample county IDs:', Object.keys(countyMap).slice(0, 10))
				console.log('Sample county map entry:', Object.entries(countyMap)[0])

				// Create a single frame with all current hazards
				const geoJSON = createCountyAlertGeoJSON(countyMap)
				if ('features' in geoJSON) {
					console.log('GeoJSON features:', geoJSON.features.length)
					console.log('Features with alerts:', geoJSON.features.filter((f: any) => f.properties?.hasAlert).length)
					console.log(
						'Sample feature with alert:',
						geoJSON.features.find((f: any) => f.properties?.hasAlert),
					)
					console.log(
						'Sample feature without alert:',
						geoJSON.features.find((f: any) => !f.properties?.hasAlert),
					)
				}

				const frame: MapFrame = {
					id: 'current-hazards',
					timestamp: new Date(),
					data: geoJSON,
					metadata: {
						source: 'real-time-hazards',
						totalHazards: hazardsResponse.data?.length || 0,
						countiesAffected: Object.keys(countyMap).length,
					},
				}

				if ('features' in geoJSON) {
					console.log('Frame created:', {
						id: frame.id,
						features: geoJSON.features.length,
						featuresWithAlerts: geoJSON.features.filter((f: any) => f.properties?.hasAlert).length,
						metadata: frame.metadata,
					})
				}
				console.log('='.repeat(80) + '\n')

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

				console.log('Total hazards:', hazardsResponse.data?.length)
				console.log('Frost Advisories found:', frostAdvisories.length)
				console.log('Frost Advisories:', frostAdvisories)

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
