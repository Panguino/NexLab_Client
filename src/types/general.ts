export type zoomState = {
	positionX: number
	positionY: number
	scale: number
	previousScale?: number
}

/**
 * Map zoom state for geographic/map-based animations
 * Used for map mode in Animator component
 */
export type mapZoomState = {
	zoom: number
	latitude: number
	longitude: number
}
