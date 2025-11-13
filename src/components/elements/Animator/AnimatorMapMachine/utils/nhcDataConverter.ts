/**
 * Utility functions to convert NHC tropical storm data to MapFrame format
 * Handles conversion from raw API data to animated frame-based format
 */

import { MapFrame } from '../types'
import { ProcessedStormData, TropicalStormData, processStormData } from '../types/tropicalStormTypes'

/**
 * Represents a storm track point with time information
 */
export interface StormTrackPoint {
	timestamp: Date
	latitude: number
	longitude: number
	intensity: number
	pressure: number
	movementDir: number
	movementSpeed: number
}

/**
 * Represents a complete storm track
 */
export interface StormTrack {
	id: string
	name: string
	classification: string
	points: StormTrackPoint[]
}

/**
 * Convert raw NHC storm data to a track point
 */
export function stormDataToTrackPoint(data: TropicalStormData): StormTrackPoint {
	return {
		timestamp: new Date(data.lastUpdate),
		latitude: data.latitudeNumeric,
		longitude: data.longitudeNumeric,
		intensity: data.intensity,
		pressure: data.pressure,
		movementDir: data.movementDir,
		movementSpeed: data.movementSpeed,
	}
}

/**
 * Interpolate between two track points
 * Creates intermediate points for smooth animation
 */
export function interpolateTrackPoints(point1: StormTrackPoint, point2: StormTrackPoint, steps: number): StormTrackPoint[] {
	const points: StormTrackPoint[] = []

	for (let i = 0; i <= steps; i++) {
		const t = i / steps
		const timeDiff = point2.timestamp.getTime() - point1.timestamp.getTime()

		points.push({
			timestamp: new Date(point1.timestamp.getTime() + timeDiff * t),
			latitude: point1.latitude + (point2.latitude - point1.latitude) * t,
			longitude: point1.longitude + (point2.longitude - point1.longitude) * t,
			intensity: point1.intensity + (point2.intensity - point1.intensity) * t,
			pressure: point1.pressure + (point2.pressure - point1.pressure) * t,
			movementDir: point1.movementDir + (point2.movementDir - point1.movementDir) * t,
			movementSpeed: point1.movementSpeed + (point2.movementSpeed - point1.movementSpeed) * t,
		})
	}

	return points
}

/**
 * Create a storm track from multiple NHC data points
 * Assumes data points are in chronological order
 */
export function createStormTrack(stormDataPoints: TropicalStormData[]): StormTrack {
	if (stormDataPoints.length === 0) {
		throw new Error('Cannot create track from empty data')
	}

	const firstPoint = stormDataPoints[0]
	const points = stormDataPoints.map(stormDataToTrackPoint)

	return {
		id: firstPoint.id,
		name: firstPoint.name,
		classification: firstPoint.classification,
		points,
	}
}

/**
 * Convert storm tracks to animated MapFrames
 * Creates frames at specified time intervals
 */
export function convertTracksToFrames(
	tracks: StormTrack[],
	frameIntervalMs: number = 6 * 60 * 60 * 1000, // 6 hours default
): MapFrame[] {
	if (tracks.length === 0) {
		return []
	}

	// Find the time range across all tracks
	let minTime = Infinity
	let maxTime = -Infinity

	tracks.forEach((track) => {
		track.points.forEach((point) => {
			const time = point.timestamp.getTime()
			minTime = Math.min(minTime, time)
			maxTime = Math.max(maxTime, time)
		})
	})

	// Generate frames at specified intervals
	const frames: MapFrame[] = []
	let currentTime = minTime

	let frameIndex = 0
	while (currentTime <= maxTime) {
		const frameDate = new Date(currentTime)
		const storms: ProcessedStormData[] = []

		// Get storm position at this frame time
		tracks.forEach((track) => {
			// Find the closest point(s) to this frame time
			let closestPoint: StormTrackPoint | null = null
			let minTimeDiff = Infinity

			track.points.forEach((point) => {
				const timeDiff = Math.abs(point.timestamp.getTime() - currentTime)
				if (timeDiff < minTimeDiff) {
					minTimeDiff = timeDiff
					closestPoint = point
				}
			})

			if (closestPoint) {
				// Convert track point to processed storm data
				const rawData: TropicalStormData = {
					id: track.id,
					name: track.name,
					classification: track.classification as any,
					intensity: Math.round(closestPoint.intensity),
					pressure: Math.round(closestPoint.pressure),
					latitude: closestPoint.latitude.toString(),
					longitude: closestPoint.longitude.toString(),
					latitudeNumeric: closestPoint.latitude,
					longitudeNumeric: closestPoint.longitude,
					movementDir: Math.round(closestPoint.movementDir),
					movementSpeed: Math.round(closestPoint.movementSpeed),
					lastUpdate: frameDate.toISOString(),
				}

				const processedStorm = processStormData(rawData)
				storms.push(processedStorm)
			}
		})

		frames.push({
			id: `frame-${frameIndex}`,
			timestamp: frameDate,
			data: {
				type: 'FeatureCollection',
				features: [],
			},
			tropicalStorms: storms,
			metadata: {
				frameNumber: frameIndex,
				totalFrames: Math.ceil((maxTime - minTime) / frameIntervalMs) + 1,
				timeLabel: frameDate.toISOString(),
			},
		})

		currentTime += frameIntervalMs
		frameIndex++
	}

	return frames
}

/**
 * Convert raw NHC API response to animated frames
 * Main entry point for converting API data
 */
export function convertNHCDataToFrames(nhcData: Record<string, TropicalStormData>, frameIntervalMs: number = 6 * 60 * 60 * 1000): MapFrame[] {
	// Group data by storm ID
	const stormMap = new Map<string, TropicalStormData[]>()

	Object.values(nhcData).forEach((storm) => {
		if (!stormMap.has(storm.id)) {
			stormMap.set(storm.id, [])
		}
		stormMap.get(storm.id)!.push(storm)
	})

	// Create tracks from grouped data
	const tracks = Array.from(stormMap.values())
		.map((stormDataPoints) => createStormTrack(stormDataPoints))
		.filter((track) => track.points.length > 0)

	// Convert tracks to frames
	return convertTracksToFrames(tracks, frameIntervalMs)
}

/**
 * Example usage:
 *
 * // Fetch real NHC data
 * const response = await fetch('https://climate.cod.edu/data/tropical/gis/SampleStorms.json')
 * const nhcData = await response.json()
 *
 * // Convert to frames
 * const frames = convertNHCDataToFrames(nhcData)
 *
 * // Use in Animator
 * <Animator frames={frames} mode="map" ... />
 */
