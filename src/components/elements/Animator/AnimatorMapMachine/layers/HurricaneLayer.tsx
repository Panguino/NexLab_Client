/**
 * HurricaneLayer Component
 * Renders tropical storm/hurricane icons on the map using DeckGL IconLayer
 * Supports hover tooltips and intensity-based styling
 * Also renders forecast tracks, cone of uncertainty, and watch/warning areas
 */

import { GeoJsonLayer, IconLayer, LineLayer, PolygonLayer } from '@deck.gl/layers'
import { ForecastTrack } from '../types/tropicalProductsTypes'
import { ProcessedStormData } from '../types/tropicalStormTypes'
import {
	bestTrackPointsToGeoJSON,
	bestTrackToGeoJSON,
	coneToGeoJSON,
	forecastPointsToGeoJSON,
	forecastTrackToGeoJSON,
	watchWarningsToGeoJSON,
} from '../utils/tropicalProductsParser'

/**
 * Create a DeckGL IconLayer for rendering hurricane icons
 * @param storms - Array of processed storm data
 * @param onHover - Callback when hovering over a storm
 * @returns DeckGL IconLayer
 */
export function createHurricaneLayer(storms: ProcessedStormData[], onHover?: (info: any) => void): IconLayer {
	console.log('[HurricaneLayer] createHurricaneLayer called with', storms.length, 'storms')

	// Convert storms to GeoJSON-like format for DeckGL
	const data = storms.map((storm) => ({
		position: [storm.longitude, storm.latitude],
		...storm,
	}))

	console.log('[HurricaneLayer] Converted data:', data)
	data.forEach((d: any, idx: number) => {
		console.log(
			`[HurricaneLayer] Storm ${idx}: name=${d.name}, category=${d.category}, pos=[${d.position[0]}, ${d.position[1]}], iconSize=${d.iconSize}, color=${d.color}`,
		)
		console.log('[HurricaneLayer] Full storm object:', d)
	})

	// Get icon image for rendering
	const iconAtlas = getHurricaneIconImage()
	console.log('[HurricaneLayer] Icon atlas:', iconAtlas)
	console.log('[HurricaneLayer] Icon atlas src:', iconAtlas.src)
	console.log('[HurricaneLayer] Icon atlas complete:', iconAtlas.complete)
	console.log('[HurricaneLayer] Icon mapping:', HURRICANE_ICON_MAPPING)

	const layer = new IconLayer({
		id: 'hurricane-layer',
		data,
		pickable: true,
		sizeScale: 15,
		sizeMinPixels: 20,
		sizeMaxPixels: 100,
		getPosition: (d: any) => {
			console.log('[HurricaneLayer] getPosition called for', d.name)
			return d.position
		},
		getIcon: (d: any) => {
			// Use category as icon key (0-5)
			const category = Math.min(5, Math.max(0, d.category || 0))
			const iconKey = category.toString()
			console.log('[HurricaneLayer] getIcon called for', d.name, '- category:', category, 'iconKey:', iconKey)
			return iconKey
		},
		getSize: (d: any) => {
			console.log('[HurricaneLayer] getSize called for', d.name, '- size:', d.iconSize)
			return d.iconSize
		},
		getColor: (d: any) => {
			console.log('[HurricaneLayer] getColor called for', d.name, '- color:', d.color)
			return d.color
		},
		iconAtlas: iconAtlas,
		iconMapping: HURRICANE_ICON_MAPPING,
		onHover: onHover,
		updateTriggers: {
			getSize: [storms],
			getColor: [storms],
			getIcon: [storms],
		},
	})

	console.log('[HurricaneLayer] IconLayer created:', layer)
	return layer
}

/**
 * Hurricane icon mapping for DeckGL
 * Maps category numbers to icon positions in the atlas
 */
export const HURRICANE_ICON_MAPPING: Record<string, any> = {
	'0': { x: 0, y: 0, width: 128, height: 128, mask: true }, // TS
	'1': { x: 128, y: 0, width: 128, height: 128, mask: true }, // Cat 1
	'2': { x: 256, y: 0, width: 128, height: 128, mask: true }, // Cat 2
	'3': { x: 384, y: 0, width: 128, height: 128, mask: true }, // Cat 3
	'4': { x: 512, y: 0, width: 128, height: 128, mask: true }, // Cat 4
	'5': { x: 640, y: 0, width: 128, height: 128, mask: true }, // Cat 5
}

/**
 * Generate hurricane icon SVG
 * Creates a simple hurricane/cyclone icon
 */
export function generateHurricaneIconSVG(): string {
	return `
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer spiral -->
      <circle cx="64" cy="64" r="50" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3"/>
      <!-- Middle spiral -->
      <circle cx="64" cy="64" r="35" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/>
      <!-- Inner eye -->
      <circle cx="64" cy="64" r="15" fill="currentColor" opacity="0.8"/>
      <!-- Center dot -->
      <circle cx="64" cy="64" r="5" fill="white"/>
    </svg>
  `
}

/**
 * Create icon atlas for DeckGL with multiple hurricane categories
 * Returns a canvas with hurricane icons for categories 0-5
 */
export function createHurricaneIconAtlas(): HTMLCanvasElement {
	console.log('[HurricaneLayer] createHurricaneIconAtlas called')
	const canvas = document.createElement('canvas')
	canvas.width = 128 * 6 // 6 categories (0-5)
	canvas.height = 128

	const ctx = canvas.getContext('2d')
	if (!ctx) {
		console.error('[HurricaneLayer] Failed to get canvas 2D context')
		return canvas
	}

	console.log('[HurricaneLayer] Canvas created:', canvas.width, 'x', canvas.height)

	// Draw each category icon (0-5)
	for (let category = 0; category <= 5; category++) {
		const startX = category * 128
		const centerX = startX + 64
		const centerY = 64

		// Draw red spiral bands (like the reference image)
		ctx.strokeStyle = '#CC0000'
		ctx.lineWidth = 8
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'

		// Draw spiral arms (4 arms)
		for (let i = 0; i < 4; i++) {
			const angle = (i * Math.PI) / 2
			ctx.beginPath()
			ctx.arc(centerX, centerY, 45, angle, angle + Math.PI * 0.6, false)
			ctx.stroke()
		}

		// Draw center circle (white background for number)
		ctx.fillStyle = 'white'
		ctx.beginPath()
		ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
		ctx.fill()

		// Draw red circle border
		ctx.strokeStyle = '#CC0000'
		ctx.lineWidth = 2
		ctx.beginPath()
		ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
		ctx.stroke()

		// Draw category number in center
		ctx.fillStyle = '#CC0000'
		ctx.font = 'bold 24px Arial'
		ctx.textAlign = 'center'
		ctx.textBaseline = 'middle'
		ctx.fillText(category.toString(), centerX, centerY)
	}

	console.log('[HurricaneLayer] Icon atlas canvas created successfully')
	return canvas
}

/**
 * Get icon canvas for DeckGL IconLayer
 * Returns the canvas directly for better compatibility
 */
let cachedIconCanvas: HTMLCanvasElement | null = null

export function getHurricaneIconCanvas(): HTMLCanvasElement {
	if (!cachedIconCanvas) {
		cachedIconCanvas = createHurricaneIconAtlas()
	}
	return cachedIconCanvas
}

/**
 * Get icon URL for DeckGL IconLayer
 * Uses a data URL for the hurricane icon
 */
let cachedIconURL: string | null = null

export function getHurricaneIconURL(): string {
	if (!cachedIconURL) {
		console.log('[HurricaneLayer] getHurricaneIconURL - creating data URL')
		const canvas = getHurricaneIconCanvas()
		cachedIconURL = canvas.toDataURL()
		console.log('[HurricaneLayer] Data URL created, length:', cachedIconURL.length)
	}
	return cachedIconURL
}

/**
 * Get icon image for DeckGL IconLayer
 * Returns an Image object that DeckGL can use directly
 */
let cachedIconImage: HTMLImageElement | null = null

export function getHurricaneIconImage(): HTMLImageElement {
	if (!cachedIconImage) {
		console.log('[HurricaneLayer] getHurricaneIconImage - creating Image object')
		const img = new Image()
		const url = getHurricaneIconURL()
		console.log('[HurricaneLayer] Setting image src to data URL')
		img.src = url
		console.log('[HurricaneLayer] Image object created, src length:', img.src.length)

		// Add load event listener for debugging
		img.onload = () => {
			console.log('[HurricaneLayer] Image loaded successfully')
		}
		img.onerror = () => {
			console.error('[HurricaneLayer] Image failed to load')
		}

		cachedIconImage = img
	}
	return cachedIconImage
}

/**
 * Create a DeckGL LineLayer for the forecast track
 * Color-coded by Saffir-Simpson category
 */
export function createForecastTrackLayer(track: ForecastTrack): LineLayer {
	const geoJSON = forecastTrackToGeoJSON(track)

	return new LineLayer({
		id: 'forecast-track-layer',
		data: [geoJSON],
		pickable: true,
		getSourcePosition: (d: any) => d.geometry.coordinates[0],
		getTargetPosition: (d: any) => d.geometry.coordinates[1],
		getColor: () => [100, 100, 100, 255], // Gray line
		getWidth: 3,
		widthMinPixels: 2,
		widthMaxPixels: 8,
	})
}

/**
 * Create a DeckGL GeoJsonLayer for forecast points
 * Shows each forecast point with intensity-based styling
 * Phase 1 Improvement: Larger circles with better visibility
 */
export function createForecastPointsLayer(track: ForecastTrack): GeoJsonLayer {
	const geoJSON = forecastPointsToGeoJSON(track)

	return new GeoJsonLayer({
		id: 'forecast-points-layer',
		data: geoJSON,
		pickable: true,
		pointRadiusMinPixels: 6,
		pointRadiusMaxPixels: 20,
		getPointRadius: (f: any) => {
			const maxwind = f.properties.maxwind
			// Scale from 8 to 20 pixels based on wind speed (larger than before)
			return 8 + (maxwind / 150) * 12
		},
		getFillColor: (f: any) => {
			const ss = f.properties.ss
			return getCategoryColor(ss)
		},
		// Enhanced outline for better visibility
		getLineColor: [255, 255, 255, 255],
		getLineWidth: 3, // Increased from 2 to 3 for better outline
		lineWidthMinPixels: 2,
		lineWidthMaxPixels: 4,
		updateTriggers: {
			getPointRadius: [track],
			getFillColor: [track],
		},
	})
}

/**
 * Create a DeckGL PolygonLayer for the cone of uncertainty
 */
export function createConeLayer(cone: any[]): PolygonLayer {
	const geoJSON = coneToGeoJSON(cone)

	return new PolygonLayer({
		id: 'cone-layer',
		data: [geoJSON],
		pickable: true,
		stroked: true,
		filled: true,
		getFillColor: [100, 150, 255, 50], // Light blue with 20% opacity
		getLineColor: [100, 150, 255, 200],
		getLineWidth: 2,
		lineWidthMinPixels: 1,
		lineWidthMaxPixels: 3,
	})
}

/**
 * Create a DeckGL PolygonLayer for watch/warning areas
 */
export function createWatchWarningLayer(warnings: any[]): PolygonLayer {
	const geoJSON = watchWarningsToGeoJSON(warnings)

	return new PolygonLayer({
		id: 'watch-warning-layer',
		data: [geoJSON],
		pickable: true,
		stroked: true,
		filled: true,
		getFillColor: (f: any) => {
			const colors = getWatchWarningColors(f.properties.type)
			return colors.fill
		},
		getLineColor: (f: any) => {
			const colors = getWatchWarningColors(f.properties.type)
			return colors.line
		},
		getLineWidth: 2,
		lineWidthMinPixels: 1,
		lineWidthMaxPixels: 3,
		updateTriggers: {
			getFillColor: [warnings],
			getLineColor: [warnings],
		},
	})
}

/**
 * Create a DeckGL LineLayer for best track (historical path)
 */
export function createBestTrackLayer(bestTrack: Record<string, any>): LineLayer {
	const geoJSON = bestTrackToGeoJSON(bestTrack)

	return new LineLayer({
		id: 'best-track-layer',
		data: [geoJSON],
		pickable: true,
		getSourcePosition: (d: any) => d.geometry.coordinates[0],
		getTargetPosition: (d: any) => d.geometry.coordinates[1],
		getColor: [150, 150, 150, 200], // Gray with some transparency
		getWidth: 2,
		widthMinPixels: 1,
		widthMaxPixels: 4,
		dashArray: [5, 5], // Dashed line for historical
	})
}

/**
 * Create a DeckGL GeoJsonLayer for best track points
 */
export function createBestTrackPointsLayer(bestTrack: Record<string, any>): GeoJsonLayer {
	const geoJSON = bestTrackPointsToGeoJSON(bestTrack)

	return new GeoJsonLayer({
		id: 'best-track-points-layer',
		data: geoJSON,
		pickable: true,
		pointRadiusMinPixels: 3,
		pointRadiusMaxPixels: 8,
		getPointRadius: 4,
		getFillColor: [150, 150, 150, 200],
		getLineColor: [100, 100, 100, 255],
		getLineWidth: 1,
		lineWidthMinPixels: 1,
		lineWidthMaxPixels: 2,
	})
}

/**
 * Get color for hurricane category
 */
function getCategoryColor(category: number): [number, number, number, number] {
	const colors: Record<number, [number, number, number, number]> = {
		0: [255, 255, 0, 255], // Yellow - TS
		1: [255, 200, 0, 255], // Orange - Cat 1
		2: [255, 100, 0, 255], // Dark Orange - Cat 2
		3: [255, 0, 0, 255], // Red - Cat 3
		4: [200, 0, 0, 255], // Dark Red - Cat 4
		5: [150, 0, 0, 255], // Very Dark Red - Cat 5
	}
	return colors[category] || [100, 100, 100, 255]
}

/**
 * Get colors for watch/warning areas
 */
function getWatchWarningColors(type: string): { fill: [number, number, number, number]; line: [number, number, number, number] } {
	const colors: Record<string, { fill: [number, number, number, number]; line: [number, number, number, number] }> = {
		HWA: { fill: [255, 0, 0, 50], line: [255, 0, 0, 200] }, // Hurricane Warning - Red
		TWA: { fill: [255, 165, 0, 50], line: [255, 165, 0, 200] }, // Tropical Storm Warning - Orange
		HWR: { fill: [255, 0, 0, 30], line: [255, 0, 0, 150] }, // Hurricane Watch - Light Red
		TWR: { fill: [255, 165, 0, 30], line: [255, 165, 0, 150] }, // Tropical Storm Watch - Light Orange
	}
	return colors[type] || { fill: [100, 100, 100, 50], line: [100, 100, 100, 200] }
}
