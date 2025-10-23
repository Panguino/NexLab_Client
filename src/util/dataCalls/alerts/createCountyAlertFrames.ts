/**
 * Create MapFrame objects from county alert data
 * Transforms alerts into animator frames for timeline visualization
 */

import { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine'
import { AlertsAPIResponse, CountyAlertMap, createCountyAlertGeoJSON, parseAlertsToCountyMap } from './parseCountyAlerts'

/**
 * Create a single MapFrame from county alert data
 */
export const createCountyAlertFrame = (
	countyAlertMap: CountyAlertMap,
	timestamp: Date,
	frameId: string,
	metadata?: Record<string, any>,
): MapFrame => {
	const geoJSON = createCountyAlertGeoJSON(countyAlertMap)

	return {
		id: frameId,
		timestamp,
		data: geoJSON,
		metadata: {
			alertCount: Object.keys(countyAlertMap).length,
			...metadata,
		},
	}
}

/**
 * Create MapFrames from API response with timeline data
 * Groups alerts by timestamp to create animation frames
 */
export const createCountyAlertFramesFromAPI = (apiResponse: AlertsAPIResponse): MapFrame[] => {
	if (!apiResponse.data?.timeline || apiResponse.data.timeline.length === 0) {
		// If no timeline, create a single frame with all current alerts
		const countyMap = parseAlertsToCountyMap(apiResponse)
		return [
			createCountyAlertFrame(
				countyMap,
				new Date(),
				'frame-current',
				{ source: 'current-alerts' },
			),
		]
	}

	// Create frames for each timeline entry
	const frames: MapFrame[] = []
	const timelineEntries = apiResponse.data.timeline

	timelineEntries.forEach((entry, index) => {
		const timestamp = new Date(entry.timestamp)

		// For each timeline entry, we need to reconstruct the alert state at that time
		// This is a simplified approach - in production, you'd need the full alert state
		const countyMap = parseAlertsToCountyMap(apiResponse)

		frames.push(
			createCountyAlertFrame(
				countyMap,
				timestamp,
				`frame-${index}`,
				{
					timelineIndex: index,
					totalFrames: timelineEntries.length,
				},
			),
		)
	})

	return frames
}

/**
 * Create mock MapFrames for testing
 * Simulates alerts changing over time
 */
export const createMockCountyAlertFrames = (): MapFrame[] => {
	const mockCountyMaps: CountyAlertMap[] = [
		// Frame 1: Few alerts
		{
			'48001': {
				color: [255, 0, 0, 255], // Red - Tornado Warning
				alerts: [{ event: 'Tornado Warning', headline: 'Tornado Warning for Anderson County' }],
				headline: 'Tornado Warning for Anderson County',
			},
			'40001': {
				color: [50, 150, 255, 255], // Light blue - Severe Watch
				alerts: [{ event: 'Severe Thunderstorm Watch', headline: 'Severe Watch for Adair County' }],
				headline: 'Severe Watch for Adair County',
			},
		},
		// Frame 2: More alerts
		{
			'48001': {
				color: [255, 0, 0, 255], // Red - Tornado Warning
				alerts: [{ event: 'Tornado Warning', headline: 'Tornado Warning for Anderson County' }],
				headline: 'Tornado Warning for Anderson County',
			},
			'40001': {
				color: [0, 100, 225, 255], // Blue - Severe Warning
				alerts: [{ event: 'Severe Thunderstorm Warning', headline: 'Severe Warning for Adair County' }],
				headline: 'Severe Warning for Adair County',
			},
			'20001': {
				color: [232, 100, 0, 255], // Dark orange - Fire Advisory
				alerts: [{ event: 'Fire Weather Advisory', headline: 'Fire Advisory for Allen County' }],
				headline: 'Fire Advisory for Allen County',
			},
		},
		// Frame 3: Alerts clearing
		{
			'48001': {
				color: [255, 100, 100, 255], // Light red - Tornado Watch
				alerts: [{ event: 'Tornado Watch', headline: 'Tornado Watch for Anderson County' }],
				headline: 'Tornado Watch for Anderson County',
			},
			'20001': {
				color: [232, 100, 0, 255], // Dark orange - Fire Advisory
				alerts: [{ event: 'Fire Weather Advisory', headline: 'Fire Advisory for Allen County' }],
				headline: 'Fire Advisory for Allen County',
			},
		},
		// Frame 4: Most alerts cleared
		{
			'20001': {
				color: [232, 100, 0, 255], // Dark orange - Fire Advisory
				alerts: [{ event: 'Fire Weather Advisory', headline: 'Fire Advisory for Allen County' }],
				headline: 'Fire Advisory for Allen County',
			},
		},
	]

	const now = new Date()
	return mockCountyMaps.map((countyMap, index) => {
		const timestamp = new Date(now.getTime() + index * 3600000) // 1 hour apart
		return createCountyAlertFrame(
			countyMap,
			timestamp,
			`frame-${index}`,
			{
				frameNumber: index + 1,
				totalFrames: mockCountyMaps.length,
			},
		)
	})
}

/**
 * Merge multiple alert responses into a single timeline
 * Useful for combining data from different time periods
 */
export const mergeAlertFrames = (frames: MapFrame[]): MapFrame[] => {
	// Sort by timestamp
	const sorted = [...frames].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

	// Deduplicate by timestamp (keep first occurrence)
	const seen = new Set<number>()
	return sorted.filter((frame) => {
		const time = frame.timestamp.getTime()
		if (seen.has(time)) return false
		seen.add(time)
		return true
	})
}

/**
 * Create frames with interpolation for smoother animation
 * Adds intermediate frames between existing frames
 */
export const interpolateAlertFrames = (frames: MapFrame[], interpolationCount: number = 2): MapFrame[] => {
	if (frames.length < 2) return frames

	const result: MapFrame[] = []

	for (let i = 0; i < frames.length - 1; i++) {
		result.push(frames[i])

		const current = frames[i]
		const next = frames[i + 1]
		const timeDiff = next.timestamp.getTime() - current.timestamp.getTime()

		// Create intermediate frames
		for (let j = 1; j <= interpolationCount; j++) {
			const ratio = j / (interpolationCount + 1)
			const intermediateTime = new Date(current.timestamp.getTime() + timeDiff * ratio)

			// For now, just use the current frame's data
			// In a more sophisticated implementation, you could blend the data
			result.push({
				id: `${current.id}-interp-${j}`,
				timestamp: intermediateTime,
				data: current.data,
				metadata: {
					...current.metadata,
					interpolated: true,
					interpolationRatio: ratio,
				},
			})
		}
	}

	// Add the last frame
	result.push(frames[frames.length - 1])

	return result
}

