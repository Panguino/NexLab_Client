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

// Figma design SVG assets for hurricane icons (reserved for future use)
// const FIGMA_HURRICANE_ICONS = {
// 	TS: 'http://localhost:3845/assets/73db89ce4bbdfdb542e8d17a70160443250c6a9b.svg', // Tropical Storm
// 	CAT1: 'http://localhost:3845/assets/73db89ce4bbdfdb542e8d17a70160443250c6a9b.svg', // Category 1
// 	CAT2: 'http://localhost:3845/assets/2a1bbc28941e155d3942c3ee20df8a3c5c567fb0.svg', // Category 2
// 	CAT3: 'http://localhost:3845/assets/0d335261204ec0f3222cae98d9d38755757ae577.svg', // Category 3
// 	CAT4: 'http://localhost:3845/assets/8555bbcaab87269d27282735732044b64f5f200c.svg', // Category 4
// 	CAT5: 'http://localhost:3845/assets/a8777ab22d600b5bb6271d472739f8961e967a17.svg', // Category 5
// }

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
			// Category can be: 1-5 (numeric), 'TS' (Tropical Storm = 0), 'TD' (Tropical Depression = -1), 'PTC' (Post-Tropical = -1)
			let categoryNum = 0
			if (typeof d.category === 'number') {
				categoryNum = Math.min(5, Math.max(0, d.category))
			} else if (d.category === 'TS') {
				categoryNum = 0 // Tropical Storm
			} else if (d.category === 'TD') {
				categoryNum = -1 // Tropical Depression
			} else if (d.category === 'PTC') {
				categoryNum = -1 // Post-Tropical Cyclone (treat as TD for icon purposes)
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
	}) as any
}

/**
 * Hurricane icon mapping for DeckGL
 * Maps category numbers to icon positions in the atlas
 */
export const HURRICANE_ICON_MAPPING: Record<string, any> = {
	'-1': { x: 0, y: 0, width: 128, height: 128, mask: false }, // TD (Tropical Depression)
	'0': { x: 128, y: 0, width: 128, height: 128, mask: false }, // TS (Tropical Storm)
	'1': { x: 256, y: 0, width: 128, height: 128, mask: false }, // Cat 1
	'2': { x: 384, y: 0, width: 128, height: 128, mask: false }, // Cat 2
	'3': { x: 512, y: 0, width: 128, height: 128, mask: false }, // Cat 3
	'4': { x: 640, y: 0, width: 128, height: 128, mask: false }, // Cat 4
	'5': { x: 768, y: 0, width: 128, height: 128, mask: false }, // Cat 5
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
 * Get size multiplier based on category (intensity) - reserved for future use
 */
// function getSizeMultiplier(category: number): number {
// 	// TS: 0.8x, Cat1: 0.9x, Cat2: 1.0x, Cat3: 1.1x, Cat4: 1.2x, Cat5: 1.3x
// 	return 0.8 + category * 0.1
// }

/**
 * Convert RGB array to hex color string
 */
function rgbToHex(rgb: [number, number, number, number]): string {
	return `#${rgb[0].toString(16).padStart(2, '0')}${rgb[1].toString(16).padStart(2, '0')}${rgb[2].toString(16).padStart(2, '0')}`
}

/**
 * SVG path data for each hurricane category
 * Extracted from src/assets/icons/hurricane/[1-5].svg
 */
const HURRICANE_SVG_PATHS: Record<number, { paths: string[]; viewBox: string; centerCircle: string }> = {
	1: {
		viewBox: '0 0 90 144',
		paths: [
			'M45 117.116C69.8528 117.116 90 96.9169 90 72C90 47.0831 69.8528 26.884 45 26.884C20.1472 26.884 0 47.0831 0 72C0 96.9169 20.1472 117.116 45 117.116Z',
			'M37.2962 72C16.9507 37.7018 66.3249 0 70.5803 0C45.73 0 0 21.9987 0 72C0 72.1012 0 72.2083 0 72.3094H37.2903C37.2903 72.2083 37.3437 72.0893 37.2903 72H37.2962Z',
			'M52.7038 72C73.0434 106.298 23.6692 144 19.4138 144C44.2641 144 89.9941 122.001 89.9941 72C89.9941 71.8988 89.9941 71.7917 89.9941 71.6906H52.7038C52.7038 71.7917 52.6504 71.9107 52.7038 72Z',
		],
		centerCircle:
			'M63.0896 90.133C73.0794 80.1175 73.0794 63.8791 63.0896 53.8636C53.0999 43.8481 36.9033 43.8481 26.9136 53.8636C16.9239 63.8791 16.9239 80.1175 26.9136 90.1329C36.9033 100.148 53.0999 100.148 63.0896 90.133Z',
	},
	2: {
		viewBox: '0 0 144 144',
		paths: [
			'M72 117.116C96.9169 117.116 117.116 96.9169 117.116 72C117.116 47.0831 96.9169 26.884 72 26.884C47.0831 26.884 26.884 47.0831 26.884 72C26.884 96.9169 47.0831 117.116 72 117.116Z',
			'M64.2764 72C43.8783 37.7018 93.3798 0 97.6463 0C72.7319 0 26.884 21.9987 26.884 72C26.884 72.1012 26.884 72.2083 26.884 72.3094H64.2704C64.2704 72.2083 64.324 72.0893 64.2704 72H64.2764Z',
			'M79.7236 72C100.116 106.298 50.6142 144 46.3478 144C71.2621 144 117.11 122.001 117.11 72C117.11 71.8988 117.11 71.7917 117.11 71.6906H79.7236C79.7236 71.7917 79.6701 71.9107 79.7236 72Z',
			'M72 79.7236C37.7018 100.122 0 50.6201 0 46.3537C0 71.2681 21.9987 117.116 72 117.116C72.1012 117.116 72.2083 117.116 72.3094 117.116V79.7296C72.2083 79.7296 72.0893 79.676 72 79.7296V79.7236Z',
			'M72 64.2763C106.298 43.8843 144 93.3858 144 97.6522C144 72.7378 122.001 26.8899 72 26.8899C71.8988 26.8899 71.7917 26.8899 71.6906 26.8899V64.2763C71.7917 64.2763 71.9107 64.3299 72 64.2763Z',
		],
		centerCircle:
			'M90.1346 90.1347C100.15 80.1192 100.15 63.8808 90.1346 53.8653C80.1191 43.8498 63.8807 43.8498 53.8652 53.8653C43.8498 63.8808 43.8498 80.1192 53.8652 90.1347C63.8807 100.15 80.1191 100.15 90.1346 90.1347Z',
	},
	3: {
		viewBox: '0 0 150 144',
		paths: [
			'M75 117.116C99.8975 117.116 120.081 96.9169 120.081 72C120.081 47.0831 99.8975 26.884 75 26.884C50.1025 26.884 29.9191 47.0831 29.9191 72C29.9191 96.9169 50.1025 117.116 75 117.116Z',
			'M67.2824 72C46.9003 37.7018 96.3632 0 100.632 0C75.7313 0 29.9191 21.9987 29.9191 72C29.9191 72.1012 29.9191 72.2083 29.9191 72.3094H67.2764C67.2764 72.2083 67.3299 72.0893 67.2764 72H67.2824Z',
			'M82.7176 72C103.094 106.298 53.6309 144 49.3678 144C74.2627 144 120.075 122.001 120.075 72C120.075 71.8988 120.075 71.7917 120.075 71.6906H82.7176C82.7176 71.7917 82.6641 71.9107 82.7176 72Z',
			'M71.1828 78.718C31.3164 79.4915 23.0161 17.8274 25.1268 14.1203C12.8191 35.7798 9.28136 86.5071 52.7212 111.225C52.8104 111.279 52.8996 111.326 52.9887 111.374L71.4563 78.8727C71.3671 78.8191 71.2898 78.718 71.1888 78.718H71.1828Z',
			'M78.8172 65.282C118.684 64.5084 126.984 126.173 124.873 129.88C137.181 108.22 140.719 57.4929 97.2788 32.7749C97.1896 32.7213 97.1004 32.6737 97.0113 32.6261L78.5437 65.1273C78.6329 65.1808 78.7102 65.282 78.8112 65.282H78.8172Z',
			'M78.9183 78.6585C59.7194 113.635 2.16426 90.1011 0 86.4238C12.6288 107.899 54.8082 136.247 97.8674 110.886C97.9566 110.832 98.0458 110.779 98.135 110.725L79.1858 78.5038C79.0966 78.5573 78.9718 78.5692 78.9183 78.6585Z',
			'M71.0877 65.3415C90.2866 30.365 147.842 53.8989 150.006 57.5762C137.377 36.1012 95.1978 7.74745 52.1385 33.1141C52.0493 33.1676 51.9601 33.2212 51.8709 33.2747L70.8201 65.4962C70.9093 65.4427 71.0342 65.4308 71.0877 65.3415Z',
		],
		centerCircle:
			'M93.1231 90.1379C103.131 80.1224 103.131 63.8841 93.1231 53.8686C83.1154 43.8531 66.8898 43.8531 56.8821 53.8686C46.8744 63.8841 46.8744 80.1224 56.8821 90.1379C66.8898 100.153 83.1154 100.153 93.1231 90.1379Z',
	},
	4: {
		viewBox: '0 0 144 144',
		paths: [
			'M72 117.116C96.9169 117.116 117.116 96.9169 117.116 72C117.116 47.0831 96.9169 26.884 72 26.884C47.0831 26.884 26.884 47.0831 26.884 72C26.884 96.9169 47.0831 117.116 72 117.116Z',
			'M64.2763 72C43.8783 37.7018 93.3798 0 97.6463 0C72.7319 0 26.884 21.9987 26.884 72C26.884 72.1012 26.884 72.2083 26.884 72.3094H64.2704C64.2704 72.2083 64.324 72.0893 64.2704 72H64.2763Z',
			'M79.7236 72C100.116 106.298 50.6142 144 46.3478 144C71.2621 144 117.11 122.001 117.11 72C117.11 71.8988 117.11 71.7917 117.11 71.6906H79.7236C79.7236 71.7917 79.6701 71.9107 79.7236 72Z',
			'M66.5375 77.4625C27.8598 67.6324 36.2083 5.96828 39.2251 2.95142C21.6059 20.5706 4.74247 68.5428 40.0998 103.9C40.1712 103.972 40.2486 104.043 40.32 104.114L66.7577 77.6767C66.6863 77.6053 66.6387 77.4863 66.5375 77.4565V77.4625Z',
			'M77.4625 66.5375C116.14 76.3676 107.792 138.032 104.775 141.049C122.394 123.429 139.258 75.4572 103.9 40.0998C103.829 40.0284 103.751 39.957 103.68 39.8856L77.2423 66.3233C77.3137 66.3947 77.3613 66.5137 77.4625 66.5435V66.5375Z',
			'M72 79.7237C37.7018 100.122 0 50.6202 0 46.3538C0 71.2681 21.9987 117.116 72 117.116C72.1012 117.116 72.2083 117.116 72.3094 117.116V79.7296C72.2083 79.7296 72.0893 79.6761 72 79.7296V79.7237Z',
			'M72 64.2763C106.298 43.8843 144 93.3858 144 97.6522C144 72.7378 122.001 26.8899 72 26.8899C71.8988 26.8899 71.7917 26.8899 71.6906 26.8899V64.2763C71.7917 64.2763 71.9107 64.3299 72 64.2763Z',
			'M77.4625 77.4625C67.6324 116.14 5.96828 107.792 2.95142 104.775C20.5706 122.394 68.5428 139.258 103.9 103.9C103.972 103.829 104.043 103.751 104.114 103.68L77.6767 77.2423C77.6053 77.3137 77.4863 77.3613 77.4565 77.4625H77.4625Z',
			'M66.5375 66.5375C76.3676 27.8599 138.032 36.2083 141.049 39.2251C123.429 21.606 75.4572 4.74251 40.0998 40.0999C40.0284 40.1713 39.957 40.2486 39.8856 40.32L66.3233 66.7577C66.3947 66.6863 66.5137 66.6387 66.5435 66.5375H66.5375Z',
		],
		centerCircle:
			'M83.2506 95.0446C95.9801 88.8332 101.264 73.4787 95.0528 60.7492C88.8414 48.0197 73.4869 42.7357 60.7574 48.9471C48.0279 55.1584 42.7439 70.5129 48.9552 83.2424C55.1666 95.9719 70.5211 101.256 83.2506 95.0446Z',
	},
	5: {
		viewBox: '0 0 144 138',
		paths: [
			'M72 111.495C95.4772 111.495 114.509 92.4694 114.509 69C114.509 45.5306 95.4772 26.5048 72 26.5048C48.5228 26.5048 29.4907 45.5306 29.4907 69C29.4907 92.4694 48.5228 111.495 72 111.495Z',
			'M64.7226 69C45.5032 36.6943 92.1445 1.18262 96.1645 1.18262C72.6896 1.18262 29.4907 21.9034 29.4907 69C29.4907 69.0953 29.4907 69.1962 29.4907 69.2915H64.717C64.717 69.1962 64.7675 69.0841 64.717 69H64.7226Z',
			'M79.2774 69C98.4912 101.306 51.8499 136.817 47.8299 136.817C71.3048 136.817 114.504 116.097 114.504 69C114.504 68.9047 114.504 68.8038 114.504 68.7086H79.2774C79.2774 68.8038 79.2269 68.9159 79.2774 69Z',
			'M66.1243 73.2932C31.5315 58.564 48.2056 2.37081 51.4518 0C32.5015 13.8549 9.87323 56.0755 37.6932 94.0868C37.7493 94.1653 37.8109 94.2438 37.867 94.3222L66.2981 73.5286C66.242 73.4502 66.214 73.3325 66.1243 73.2932Z',
			'M77.8757 64.7012C112.468 79.4361 95.7944 135.624 92.5482 137.994C111.499 124.139 134.127 81.9189 106.307 43.9076C106.251 43.8291 106.189 43.7506 106.133 43.6722L77.7019 64.4658C77.758 64.5442 77.786 64.6619 77.8757 64.7012Z',
			'M69.7798 75.9274C33.1462 84.385 13.5231 29.1559 14.751 25.3278C7.59694 47.6795 14.1735 95.1237 59.0487 109.477C59.1441 109.505 59.2338 109.533 59.3291 109.562L70.0657 76.0171C69.9704 75.9891 69.8807 75.905 69.791 75.9274H69.7798Z',
			'M74.2202 62.0669C110.859 53.615 130.477 108.844 129.255 112.672C136.409 90.3204 129.832 42.8763 84.9569 28.5225C84.8615 28.4945 84.7718 28.4665 84.6765 28.4329L73.9399 61.9773C74.0352 62.0053 74.1249 62.0893 74.2146 62.0669H74.2202Z',
			'M74.2987 75.9051C49.6913 104.327 1.26709 71.2868 0 67.4755C7.40632 89.7488 40.7039 124.184 85.411 109.326C85.5007 109.298 85.596 109.264 85.6857 109.231L74.5678 75.8154C74.4781 75.8434 74.3548 75.8322 74.2931 75.9051H74.2987Z',
			'M69.7013 62.095C94.3031 33.6733 142.727 66.7133 144 70.5245C136.594 48.2513 103.296 13.8157 58.589 28.6739C58.4993 28.7019 58.404 28.7355 58.3143 28.7692L69.4322 62.1847C69.5219 62.1566 69.6452 62.1678 69.7069 62.095H69.7013Z',
			'M77.915 73.2372C74.7136 110.688 16.1078 112.398 12.8391 110.055C31.924 123.725 79.1092 132.037 106.553 93.745C106.61 93.6665 106.666 93.588 106.722 93.5096L78.0832 72.9962C78.0271 73.0747 77.9206 73.1363 77.915 73.2316V73.2372Z',
			'M66.085 64.7628C69.2864 27.3119 127.892 25.6025 131.161 27.9453C112.076 14.2753 64.8908 5.96347 37.4465 44.2551C37.3904 44.3335 37.3344 44.412 37.2783 44.4905L65.9168 65.0038C65.9729 64.9254 66.0794 64.8637 66.085 64.7684V64.7628Z',
		],
		centerCircle:
			'M95.5168 74.5454C98.5824 61.5609 90.5381 48.5506 77.5493 45.486C64.5605 42.4213 51.5458 50.463 48.4802 63.4475C45.4146 76.4319 53.4589 89.4423 66.4477 92.5069C79.4365 95.5715 92.4511 87.5299 95.5168 74.5454Z',
	},
}

/**
 * Draw tropical depression icon (simple donut/ring)
 */
function drawTropicalDepression(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, color: string, scale: number): void {
	const outerRadius = 50 * scale
	const innerRadius = 30 * scale

	ctx.save()

	// Draw outer circle (green for tropical depression)
	ctx.fillStyle = color
	ctx.beginPath()
	ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2)
	ctx.fill()

	// Draw inner white circle
	ctx.fillStyle = 'white'
	ctx.beginPath()
	ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2)
	ctx.fill()

	ctx.restore()
}

/**
 * Draw hurricane icon from SVG path data
 */
function drawHurricaneFromSVG(
	ctx: CanvasRenderingContext2D,
	centerX: number,
	centerY: number,
	category: number,
	color: string,
	scale: number,
	rotation: number = 0,
): void {
	// Use category 1 for tropical storm (category 0), otherwise use the actual category
	const svgCategory = category === 0 ? 1 : Math.min(5, category)
	const svgData = HURRICANE_SVG_PATHS[svgCategory]

	if (!svgData) return

	// Parse viewBox to get original dimensions
	const viewBoxParts = svgData.viewBox.split(' ').map(Number)
	const svgWidth = viewBoxParts[2]
	const svgHeight = viewBoxParts[3]

	// Calculate scale to fit in our canvas size
	const targetSize = 128 * scale
	const svgScale = targetSize / Math.max(svgWidth, svgHeight)

	// Calculate offset to center the SVG
	const offsetX = centerX - (svgWidth * svgScale) / 2
	const offsetY = centerY - (svgHeight * svgScale) / 2

	ctx.save()

	// Apply rotation around the center point
	if (rotation !== 0) {
		ctx.translate(centerX, centerY)
		ctx.rotate(rotation)
		ctx.translate(-centerX, -centerY)
	}

	ctx.translate(offsetX, offsetY)
	ctx.scale(svgScale, svgScale)

	// Draw hurricane paths in category color
	ctx.fillStyle = color
	for (const pathData of svgData.paths) {
		const path = new Path2D(pathData)
		ctx.fill(path)
	}

	// Draw center circle
	// For categories 1-5: fill with same color as icon
	// For tropical storm (0): keep white
	if (category >= 1) {
		ctx.fillStyle = color
	} else {
		ctx.fillStyle = 'white'
	}
	const centerPath = new Path2D(svgData.centerCircle)
	ctx.fill(centerPath)

	ctx.restore()
}

/**
 * Draw category number on top of the icon
 */
function drawCategoryNumber(
	ctx: CanvasRenderingContext2D,
	label: string,
	color: string,
	centerX: number,
	centerY: number,
	scale: number,
	category: number,
): void {
	// Draw category number in center - scale font size with icon
	const fontSize = Math.round(28 * scale)

	ctx.font = `bold ${fontSize}px Arial`
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'

	// For categories 1-5: use white text with subtle shadow/glow on colored background
	// For tropical storm (TS): use colored text on white background
	// For tropical depression (TD): use colored text on white background
	if (category >= 1) {
		// Use canvas shadow (simple and clean)
		ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
		ctx.shadowBlur = 3
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 1

		// Draw white fill
		ctx.fillStyle = 'white'
		ctx.fillText(label, centerX, centerY)

		// Reset shadow for other drawing operations
		ctx.shadowColor = 'transparent'
		ctx.shadowBlur = 0
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 0
	} else {
		// For TS and TD, use colored text with subtle shadow for depth
		ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
		ctx.shadowBlur = 2
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 1

		ctx.fillStyle = color
		ctx.fillText(label, centerX, centerY)

		// Reset shadow
		ctx.shadowColor = 'transparent'
		ctx.shadowBlur = 0
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 0
	}
}

/**
 * Get scale factor for each category
 * Tropical depression and tropical storms are smallest, Category 5 is capped at 100%
 */
function getCategoryScale(category: number): number {
	// Scale from 0.6 (TD) to 1.0 (Cat 3-5)
	// TD: 0.6, TS: 0.7, Cat1: 0.8, Cat2: 0.9, Cat3-5: 1.0
	const scales = [0.6, 0.7, 0.8, 0.9, 1.0, 1.0, 1.0]
	// Category -1 is TD, 0 is TS, 1-5 are hurricanes
	const index = Math.min(6, Math.max(0, category + 1))
	return scales[index]
}

/**
 * Generate random rotation for hurricane icons
 * Returns a rotation angle in radians
 */
function getRandomRotation(seed: number): number {
	// Use seed to generate consistent random rotation for each icon position
	// This ensures icons don't change rotation on re-render
	const random = Math.sin(seed * 12345.6789) * 10000
	return (random - Math.floor(random)) * Math.PI * 2
}

/**
 * Create icon atlas for DeckGL with multiple hurricane categories
 * Draws SVG-based hurricane icons with custom colors and category numbers
 * Returns a promise that resolves to a canvas with hurricane icons for categories -1 to 5
 * Category -1: Tropical Depression (TD)
 * Category 0: Tropical Storm (TS)
 * Category 1-5: Hurricane categories
 */
export async function createHurricaneIconAtlas(): Promise<HTMLCanvasElement> {
	const canvas = document.createElement('canvas')
	canvas.width = 128 * 7 // 7 categories (-1 to 5: TD, TS, Cat1-5)
	canvas.height = 128

	const ctx = canvas.getContext('2d')
	if (!ctx) return canvas

	// Category labels and colors
	// TD uses a green color, TS uses light blue, 1-5 use existing colors
	const categories = [
		{ label: 'TD', color: [34, 139, 34, 255] as [number, number, number, number], category: -1 }, // Forest green for TD
		{ label: 'TS', color: CATEGORY_COLORS[0], category: 0 },
		{ label: '1', color: CATEGORY_COLORS[1], category: 1 },
		{ label: '2', color: CATEGORY_COLORS[2], category: 2 },
		{ label: '3', color: CATEGORY_COLORS[3], category: 3 },
		{ label: '4', color: CATEGORY_COLORS[4], category: 4 },
		{ label: '5', color: CATEGORY_COLORS[5], category: 5 },
	]

	// Draw each category icon
	for (let i = 0; i < categories.length; i++) {
		const startX = i * 128
		const centerX = startX + 64
		const centerY = 64
		const categoryInfo = categories[i]
		const hexColor = rgbToHex(categoryInfo.color)
		const scale = getCategoryScale(categoryInfo.category)
		const rotation = getRandomRotation(i)

		// Draw tropical depression as a donut
		if (categoryInfo.category === -1) {
			drawTropicalDepression(ctx, centerX, centerY, hexColor, scale)
		} else {
			// Draw hurricane icon from SVG with random rotation
			drawHurricaneFromSVG(ctx, centerX, centerY, categoryInfo.category, hexColor, scale, rotation)
		}

		// Draw category number overlay
		drawCategoryNumber(ctx, categoryInfo.label, hexColor, centerX, centerY, scale, categoryInfo.category)
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
