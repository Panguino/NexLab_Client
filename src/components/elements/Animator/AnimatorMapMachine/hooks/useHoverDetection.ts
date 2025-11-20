import { useCallback, useState } from 'react'

// Import booleanPointInPolygon for point-in-polygon detection
let booleanPointInPolygon: any = null
try {
	const turf = require('@turf/turf')
	booleanPointInPolygon = turf.booleanPointInPolygon
} catch (e) {
	console.warn('Failed to load @turf/turf')
}

/**
 * Find which county, coastal region, or CWA zone a given lat/long point is in
 * Uses point-in-polygon detection with Turf.js
 * Returns object with id and type ('county', 'coastal', or 'cwa')
 */
function findRegionAtPoint(
	latitude: number,
	longitude: number,
	coastalData?: any,
	cwaData?: any,
): { id: string; type: 'county' | 'coastal' | 'cwa'; wfoId?: string } | null {
	if (!booleanPointInPolygon) return null

	const point = [longitude, latitude]

	// First search through CWA zones if available
	if (cwaData && cwaData.features) {
		const cwaFeatures = cwaData.features || []
		for (const feature of cwaFeatures) {
			try {
				if (booleanPointInPolygon(point, feature)) {
					const cwaId = feature.properties?.CWA
					const wfoId = feature.properties?.FULLSTAID
					if (cwaId) {
						return { id: cwaId, type: 'cwa', wfoId }
					}
				}
			} catch (e) {
				continue
			}
		}
	}

	// Then search through coastal data if available
	if (coastalData && coastalData.features) {
		const coastalFeatures = coastalData.features || []
		for (const feature of coastalFeatures) {
			try {
				if (booleanPointInPolygon(point, feature)) {
					const regionId = feature.properties?.id || feature.properties?.ID
					if (regionId) {
						return { id: regionId, type: 'coastal' }
					}
				}
			} catch (e) {
				continue
			}
		}
	}

	// Finally search through counties data (imported in the component)
	// This will be passed as a parameter
	return null
}

/**
 * useHoverDetection - Hook to manage hover state for map regions
 *
 * Handles:
 * - County hover detection
 * - CWA zone hover detection
 * - Coastal region hover detection
 * - Tooltip state
 */
export const useHoverDetection = () => {
	const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null)
	const [hoveredCwaId, setHoveredCwaId] = useState<string | null>(null)
	const [hoveredCwaWfoId, setHoveredCwaWfoId] = useState<string | null>(null)
	const [tooltipVisible, setTooltipVisible] = useState(false)
	const [tooltipTitle, setTooltipTitle] = useState('')
	const [tooltipAlerts, setTooltipAlerts] = useState<any[]>([])

	// CWA tooltip state
	const [cwaTooltipVisible, setCwaTooltipVisible] = useState(false)
	const [cwaTooltipInfo, setCwaTooltipInfo] = useState<any>(null)

	const detectRegionAtPoint = useCallback(findRegionAtPoint, [])

	const clearHover = useCallback(() => {
		setHoveredCountyId(null)
		setHoveredCwaId(null)
		setHoveredCwaWfoId(null)
		setTooltipVisible(false)
		setCwaTooltipVisible(false)
		setCwaTooltipInfo(null)
	}, [])

	return {
		hoveredCountyId,
		setHoveredCountyId,
		hoveredCwaId,
		setHoveredCwaId,
		hoveredCwaWfoId,
		setHoveredCwaWfoId,
		tooltipVisible,
		setTooltipVisible,
		tooltipTitle,
		setTooltipTitle,
		tooltipAlerts,
		setTooltipAlerts,
		cwaTooltipVisible,
		setCwaTooltipVisible,
		cwaTooltipInfo,
		setCwaTooltipInfo,
		detectRegionAtPoint,
		clearHover,
	}
}
