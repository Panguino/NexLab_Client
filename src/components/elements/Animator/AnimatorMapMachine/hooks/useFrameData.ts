import { useMemo } from 'react'
import { MapFrame } from '../types'
import { detectAllAffectedRegions } from '../utils/regionDetection'

/**
 * useFrameData - Hook to process frame data and extract alert information
 *
 * Takes the current frame and extracts:
 * - County alert map (county ID -> alert info)
 * - Coastal alert map (coastal region ID -> alert info)
 * - Frame data (GeoJSON)
 * - Coastal data (GeoJSON)
 */
export const useFrameData = (frames: MapFrame[], currentFrame: number, loadedFrames: MapFrame[]) => {
	// Get current frame data
	const activeFrame = currentFrame < 0 ? 0 : currentFrame >= loadedFrames.length ? loadedFrames.length - 1 : currentFrame

	const currentFrameData = useMemo(() => {
		if (loadedFrames.length === 0) return null
		return loadedFrames[activeFrame]?.data || null
	}, [loadedFrames, activeFrame])

	const currentFrameCoastalData = useMemo(() => {
		if (loadedFrames.length === 0) return null
		return loadedFrames[activeFrame]?.coastalData || null
	}, [loadedFrames, activeFrame])

	// Extract alert maps from frame data
	const currentFrameAlertMap = useMemo(() => {
		if (!currentFrameData) return null
		return detectAllAffectedRegions(currentFrameData)
	}, [currentFrameData])

	const currentFrameCoastalAlertMap = useMemo(() => {
		if (!currentFrameCoastalData) return null
		return detectAllAffectedRegions(currentFrameCoastalData)
	}, [currentFrameCoastalData])

	return {
		activeFrame,
		currentFrameData,
		currentFrameCoastalData,
		currentFrameAlertMap,
		currentFrameCoastalAlertMap,
	}
}
