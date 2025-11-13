/**
 * StormTrackLayer Component
 * Renders historical storm tracks as lines on the map using DeckGL PathLayer
 */

import { PathLayer } from '@deck.gl/layers'
import { ProcessedStormData } from '../types/tropicalStormTypes'

interface StormTrackPoint {
	position: [number, number]
	stormId: string
}

/**
 * Create a DeckGL PathLayer for rendering storm tracks
 * @param storms - Array of processed storm data (current positions)
 * @param allFrames - All frames to extract historical positions
 * @returns DeckGL PathLayer
 */
export function createStormTrackLayer(storms: ProcessedStormData[], allFrames: any[]): PathLayer {
	// Build track paths from all frames
	const trackPaths: StormTrackPoint[][] = []
	const stormMap = new Map<string, StormTrackPoint[]>()

	// Iterate through all frames to build historical tracks
	allFrames.forEach((frame) => {
		if (frame.tropicalStorms) {
			frame.tropicalStorms.forEach((storm: ProcessedStormData) => {
				if (!stormMap.has(storm.id)) {
					stormMap.set(storm.id, [])
				}
				stormMap.get(storm.id)!.push({
					position: [storm.longitude, storm.latitude],
					stormId: storm.id,
				})
			})
		}
	})

	// Convert map to array of paths
	stormMap.forEach((path) => {
		if (path.length > 1) {
			trackPaths.push(path)
		}
	})

	return new PathLayer({
		id: 'storm-track-layer',
		data: trackPaths,
		pickable: false,
		widthScale: 20,
		widthMinPixels: 2,
		widthMaxPixels: 8,
		getPath: (d: any) => d,
		getColor: (d: any) => {
			// Color based on storm intensity (from first point)
			const firstPoint = d[0]
			const storm = storms.find((s) => s.id === firstPoint.stormId)
			if (storm) {
				// Use storm color but with reduced opacity
				return [...storm.color.slice(0, 3), 100] as [number, number, number, number]
			}
			return [200, 200, 200, 100] as [number, number, number, number]
		},
		getWidth: 1,
		updateTriggers: {
			getColor: [storms],
		},
	})
}
