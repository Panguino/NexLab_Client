/**
 * HurricaneLayer Component
 * Renders tropical storm/hurricane icons on the map using DeckGL IconLayer
 * Supports hover tooltips and intensity-based styling
 */

import { IconLayer } from '@deck.gl/layers'
import { ProcessedStormData } from '../types/tropicalStormTypes'

/**
 * Create a DeckGL IconLayer for rendering hurricane icons
 * @param storms - Array of processed storm data
 * @param onHover - Callback when hovering over a storm
 * @returns DeckGL IconLayer
 */
export function createHurricaneLayer(storms: ProcessedStormData[], onHover?: (info: any) => void): IconLayer {
	// Convert storms to GeoJSON-like format for DeckGL
	const data = storms.map((storm) => ({
		position: [storm.longitude, storm.latitude],
		...storm,
	}))

	// Get icon URL for rendering
	const iconAtlas = getHurricaneIconURL()

	return new IconLayer({
		id: 'hurricane-layer',
		data,
		pickable: true,
		sizeScale: 15,
		sizeMinPixels: 20,
		sizeMaxPixels: 100,
		getPosition: (d: any) => d.position,
		getIcon: () => 'hurricane',
		getSize: (d: any) => d.iconSize,
		getColor: (d: any) => d.color,
		iconAtlas: iconAtlas,
		iconMapping: HURRICANE_ICON_MAPPING,
		onHover: onHover,
		updateTriggers: {
			getSize: [storms],
			getColor: [storms],
		},
	})
}

/**
 * Hurricane icon SVG data for DeckGL
 * Returns icon mapping for use with IconLayer
 */
export const HURRICANE_ICON_MAPPING = {
	hurricane: {
		x: 0,
		y: 0,
		width: 128,
		height: 128,
		mask: true,
	},
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
 * Create icon atlas for DeckGL
 * Returns a canvas with a realistic hurricane icon
 */
export function createHurricaneIconAtlas(): HTMLCanvasElement {
	const canvas = document.createElement('canvas')
	canvas.width = 128
	canvas.height = 128

	const ctx = canvas.getContext('2d')
	if (!ctx) return canvas

	const centerX = 64
	const centerY = 64

	// Draw spiral bands (cloud bands)
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
	ctx.lineWidth = 2

	// Outer spiral band
	ctx.beginPath()
	ctx.arc(centerX, centerY, 48, 0, Math.PI * 2)
	ctx.stroke()

	// Middle spiral band
	ctx.beginPath()
	ctx.arc(centerX, centerY, 36, 0, Math.PI * 2)
	ctx.stroke()

	// Inner spiral band
	ctx.beginPath()
	ctx.arc(centerX, centerY, 24, 0, Math.PI * 2)
	ctx.stroke()

	// Eye wall (darker ring)
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)'
	ctx.lineWidth = 3
	ctx.beginPath()
	ctx.arc(centerX, centerY, 16, 0, Math.PI * 2)
	ctx.stroke()

	// Eye (clear center)
	ctx.fillStyle = 'rgba(100, 150, 200, 0.3)'
	ctx.beginPath()
	ctx.arc(centerX, centerY, 12, 0, Math.PI * 2)
	ctx.fill()

	// Eye highlight
	ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
	ctx.beginPath()
	ctx.arc(centerX - 4, centerY - 4, 4, 0, Math.PI * 2)
	ctx.fill()

	// Add some curved bands to simulate spiral structure
	ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
	ctx.lineWidth = 1.5

	// Curved band 1
	ctx.beginPath()
	ctx.arc(centerX, centerY, 40, 0, Math.PI * 1.5)
	ctx.stroke()

	// Curved band 2
	ctx.beginPath()
	ctx.arc(centerX, centerY, 28, Math.PI * 0.5, Math.PI * 2)
	ctx.stroke()

	return canvas
}

/**
 * Get icon URL for DeckGL IconLayer
 * Uses a data URL for the hurricane icon
 */
let cachedIconURL: string | null = null
let cachedIconImage: HTMLImageElement | null = null

export function getHurricaneIconURL(): string {
	if (!cachedIconURL) {
		const canvas = createHurricaneIconAtlas()
		cachedIconURL = canvas.toDataURL()
	}
	return cachedIconURL
}

/**
 * Get icon image for DeckGL IconLayer
 * Returns an Image object that DeckGL can use directly
 */
export function getHurricaneIconImage(): HTMLImageElement {
	if (!cachedIconImage) {
		const img = new Image()
		img.src = getHurricaneIconURL()
		cachedIconImage = img
	}
	return cachedIconImage
}
