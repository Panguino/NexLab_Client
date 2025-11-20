import { useCallback } from 'react'

/**
 * useClickDetection - Hook to manage click handlers for map regions
 *
 * Handles:
 * - Storm icon clicks
 * - CWA zone clicks
 */
export const useClickDetection = (onStormClick?: (stormId: string) => void, onCwaClick?: (cwaId: string, wfoId: string) => void) => {
	const handleStormClick = useCallback(
		(stormId: string) => {
			if (onStormClick) {
				onStormClick(stormId)
			}
		},
		[onStormClick],
	)

	const handleCwaClick = useCallback(
		(cwaId: string, wfoId: string) => {
			if (onCwaClick) {
				onCwaClick(cwaId, wfoId)
			}
		},
		[onCwaClick],
	)

	return {
		handleStormClick,
		handleCwaClick,
	}
}
