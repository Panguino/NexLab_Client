/**
 * HurricaneLayer Component
 * Renders tropical storm/hurricane icons on the map using DeckGL IconLayer
 * Supports hover tooltips and intensity-based styling
 * Also renders forecast tracks, cone of uncertainty, and watch/warning areas
 *
 * Uses SVG assets from Figma design for hurricane icons
 */

import { GeoJsonLayer, IconLayer, LineLayer, PolygonLayer } from '@deck.gl/layers'
import { CATEGORY_COLORS, ForecastTrack } from '../types/tropicalProductsTypes'
import { ProcessedStormData } from '../types/tropicalStormTypes'
import {
	bestTrackPointsToGeoJSON,
	bestTrackToGeoJSON,
	coneToGeoJSON,
	forecastPointsToGeoJSON,
	forecastTrackToGeoJSON,
	watchWarningsToGeoJSON,
} from '../utils/tropicalProductsParser'

// Figma design SVG assets for hurricane icons
const FIGMA_HURRICANE_ICONS = {
	TS: 'http://localhost:3845/assets/73db89ce4bbdfdb542e8d17a70160443250c6a9b.svg', // Tropical Storm
	CAT1: 'http://localhost:3845/assets/73db89ce4bbdfdb542e8d17a70160443250c6a9b.svg', // Category 1
	CAT2: 'http://localhost:3845/assets/2a1bbc28941e155d3942c3ee20df8a3c5c567fb0.svg', // Category 2
	CAT3: 'http://localhost:3845/assets/0d335261204ec0f3222cae98d9d38755757ae577.svg', // Category 3
	CAT4: 'http://localhost:3845/assets/8555bbcaab87269d27282735732044b64f5f200c.svg', // Category 4
	CAT5: 'http://localhost:3845/assets/a8777ab22d600b5bb6271d472739f8961e967a17.svg', // Category 5
}

/**
 * Create a DeckGL IconLayer for rendering hurricane icons
 * @param storms - Array of processed storm data
 * @param iconAtlas - Pre-loaded icon atlas canvas
 * @returns DeckGL IconLayer
 */
export function createHurricaneLayer(storms: ProcessedStormData[], iconAtlas: HTMLCanvasElement): IconLayer {
	// Convert storms to GeoJSON-like format for DeckGL
	const data = storms.map((storm) => ({
		position: [storm.longitude, storm.latitude],
		...storm,
	}))

	return new IconLayer({
		id: 'hurricane-layer',
		data,
		pickable: true,
		sizeScale: 15,
		sizeMinPixels: 20,
		sizeMaxPixels: 100,
		getPosition: (d: any) => d.position,
		getIcon: (d: any) => {
			// Convert category to numeric value
			// Category can be: 1-5 (numeric), 'TS' (Tropical Storm = 0), 'PTC' (Post-Tropical = 0)
			let categoryNum = 0
			if (typeof d.category === 'number') {
				categoryNum = Math.min(5, Math.max(0, d.category))
			} else if (d.category === 'TS') {
				categoryNum = 0 // Tropical Storm
			} else if (d.category === 'PTC') {
				categoryNum = 0 // Post-Tropical Cyclone
			}
			return categoryNum.toString()
		},
		getSize: (d: any) => d.iconSize,
		getColor: (d: any) => d.color,
		iconAtlas: iconAtlas as any,
		iconMapping: HURRICANE_ICON_MAPPING,
		updateTriggers: {
			getSize: [storms],
			getColor: [storms],
			getIcon: [storms],
		},
	})
}

/**
 * Hurricane icon mapping for DeckGL
 * Maps category numbers to icon positions in the atlas
 */
export const HURRICANE_ICON_MAPPING: Record<string, any> = {
	'0': { x: 0, y: 0, width: 128, height: 128, mask: false }, // TS
	'1': { x: 128, y: 0, width: 128, height: 128, mask: false }, // Cat 1
	'2': { x: 256, y: 0, width: 128, height: 128, mask: false }, // Cat 2
	'3': { x: 384, y: 0, width: 128, height: 128, mask: false }, // Cat 3
	'4': { x: 512, y: 0, width: 128, height: 128, mask: false }, // Cat 4
	'5': { x: 640, y: 0, width: 128, height: 128, mask: false }, // Cat 5
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
 * Get size multiplier based on category (intensity)
 */
function getSizeMultiplier(category: number): number {
	// TS: 0.8x, Cat1: 0.9x, Cat2: 1.0x, Cat3: 1.1x, Cat4: 1.2x, Cat5: 1.3x
	return 0.8 + category * 0.1
}

/**
 * Convert RGB array to hex color string
 */
function rgbToHex(rgb: [number, number, number, number]): string {
	return `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`
}

/**
 * Load SVG image and colorize it with the given color
 * Returns a promise that resolves to a canvas with the colored SVG
 */
async function loadAndColorizeIcon(svgUrl: string, color: string): Promise<HTMLCanvasElement> {
	return new Promise((resolve) => {
		const img = new Image()
		img.crossOrigin = 'anonymous'

		img.onload = () => {
			const canvas = document.createElement('canvas')
			canvas.width = 144
			canvas.height = 144

			const ctx = canvas.getContext('2d')
			if (!ctx) {
				resolve(canvas)
				return
			}

			// Draw the SVG image
			ctx.drawImage(img, 0, 0, 144, 144)

			// Apply color tint using canvas compositing
			// This creates a colored overlay effect
			ctx.globalCompositeOperation = 'multiply'
			ctx.fillStyle = color
			ctx.fillRect(0, 0, 144, 144)

			resolve(canvas)
		}

		img.onerror = () => {
			// Fallback: create a simple colored circle if SVG fails to load
			const canvas = document.createElement('canvas')
			canvas.width = 144
			canvas.height = 144
			const ctx = canvas.getContext('2d')
			if (ctx) {
				ctx.fillStyle = color
				ctx.beginPath()
				ctx.arc(72, 72, 60, 0, Math.PI * 2)
				ctx.fill()
			}
			resolve(canvas)
		}

		img.src = svgUrl
	})
}

/**
 * Draw category number on top of the icon
 */
function drawCategoryNumber(ctx: CanvasRenderingContext2D, label: string, color: string, sizeMultiplier: number): void {
	// Draw white circle background for number
	const centerCircleRadius = 16 * sizeMultiplier
	ctx.fillStyle = 'white'
	ctx.beginPath()
	ctx.arc(72, 72, centerCircleRadius, 0, Math.PI * 2)
	ctx.fill()

	// Draw colored circle border
	ctx.strokeStyle = color
	ctx.lineWidth = 2
	ctx.beginPath()
	ctx.arc(72, 72, centerCircleRadius, 0, Math.PI * 2)
	ctx.stroke()

	// Draw category number in center
	ctx.fillStyle = color
	ctx.font = `bold ${Math.round(20 * sizeMultiplier)}px Arial`
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillText(label, 72, 72)
}

/**
 * Create icon atlas for DeckGL with multiple hurricane categories
 * Uses Figma design SVG assets and applies colors + numbering
 * Returns a promise that resolves to a canvas with hurricane icons for categories 0-5
 */
export async function createHurricaneIconAtlas(): Promise<HTMLCanvasElement> {
	const canvas = document.createElement('canvas')
	canvas.width = 128 * 6 // 6 categories (0-5)
	canvas.height = 128

	const ctx = canvas.getContext('2d')
	if (!ctx) return canvas

	// Category labels, colors, and Figma SVG assets
	const categories = [
		{ label: 'TS', color: CATEGORY_COLORS[0], svgUrl: FIGMA_HURRICANE_ICONS.TS },
		{ label: '1', color: CATEGORY_COLORS[1], svgUrl: FIGMA_HURRICANE_ICONS.CAT1 },
		{ label: '2', color: CATEGORY_COLORS[2], svgUrl: FIGMA_HURRICANE_ICONS.CAT2 },
		{ label: '3', color: CATEGORY_COLORS[3], svgUrl: FIGMA_HURRICANE_ICONS.CAT3 },
		{ label: '4', color: CATEGORY_COLORS[4], svgUrl: FIGMA_HURRICANE_ICONS.CAT4 },
		{ label: '5', color: CATEGORY_COLORS[5], svgUrl: FIGMA_HURRICANE_ICONS.CAT5 },
	]

	// Load and process each category icon
	for (let category = 0; category <= 5; category++) {
		const startX = category * 128
		const centerX = startX + 64
		const centerY = 64
		const sizeMultiplier = getSizeMultiplier(category)
		const categoryInfo = categories[category]
		const hexColor = rgbToHex(categoryInfo.color)

		try {
			// Load and colorize the Figma SVG asset
			const colorizedIcon = await loadAndColorizeIcon(categoryInfo.svgUrl, hexColor)

			// Draw the colorized icon on the atlas
			ctx.drawImage(colorizedIcon, startX, 0, 128, 128)

			// Draw category number overlay
			ctx.save()
			ctx.translate(centerX, centerY)
			drawCategoryNumber(ctx, categoryInfo.label, hexColor, sizeMultiplier)
			ctx.restore()
		} catch (error) {
			console.error(`Failed to load hurricane icon for category ${category}:`, error)
			// Fallback: draw a simple colored circle
			ctx.fillStyle = hexColor
			ctx.beginPath()
			ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
			ctx.fill()
		}
	}

	return canvas
}

/**
 * Get icon canvas for DeckGL IconLayer
 * Returns a promise that resolves to the canvas
 * Call this once at component mount to pre-load the icons
 */
let cachedIconCanvasPromise: Promise<HTMLCanvasElement> | null = null
let cachedIconCanvas: HTMLCanvasElement | null = null

export function getHurricaneIconCanvasAsync(): Promise<HTMLCanvasElement> {
	if (!cachedIconCanvasPromise) {
		cachedIconCanvasPromise = createHurricaneIconAtlas().then((canvas) => {
			cachedIconCanvas = canvas
			return canvas
		})
	}
	return cachedIconCanvasPromise
}

/**
 * Get icon canvas synchronously (must be pre-loaded via getHurricaneIconCanvasAsync)
 * Returns null if not yet loaded
 */
export function getHurricaneIconCanvasSync(): HTMLCanvasElement | null {
	return cachedIconCanvas
}

/**
 * Initialize hurricane icons (call this at component mount)
 */
export async function initializeHurricaneIcons(): Promise<void> {
	await getHurricaneIconCanvasAsync()
}

/**
 * Get icon URL for DeckGL IconLayer
 * Uses a data URL for the hurricane icon
 */
let cachedIconURL: string | null = null

export async function getHurricaneIconURL(): Promise<string> {
	if (!cachedIconURL) {
		const canvas = await getHurricaneIconCanvasAsync()
		cachedIconURL = canvas.toDataURL()
	}
	return cachedIconURL
}

/**
 * Get icon image for DeckGL IconLayer
 * Returns a promise that resolves to an Image object that DeckGL can use
 */
let cachedIconImage: HTMLImageElement | null = null

export async function getHurricaneIconImage(): Promise<HTMLImageElement> {
	if (!cachedIconImage) {
		const img = new Image()
		img.src = await getHurricaneIconURL()
		// Ensure image is loaded before returning
		return new Promise((resolve, reject) => {
			img.onload = () => {
				cachedIconImage = img
				resolve(img)
			}
			img.onerror = () => {
				console.error('Failed to load hurricane icon image')
				reject(new Error('Failed to load hurricane icon image'))
			}
		})
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
