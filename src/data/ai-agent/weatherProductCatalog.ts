/**
 * Weather Product Catalog for AI Agent
 *
 * This file provides a comprehensive index of all available weather data products
 * that the AI Agent can access and display. The catalog includes:
 * - Product definitions with descriptions and keywords
 * - Region/sector/site mappings
 * - Example queries for AI context
 */

import { NEXRAD_REGIONS } from '@/data/nexrad/regions'
import { NEXRAD_SITES } from '@/data/nexrad/sites'
import { ProductCatalog, ProductCatalogEntry, RegionEntry, SiteEntry } from './types'

// ============================================================================
// PRODUCT DEFINITIONS
// ============================================================================

const RADAR_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'nexrad-reflectivity',
		name: 'NEXRAD Base Reflectivity',
		category: 'radar',
		description:
			'Real-time radar reflectivity showing precipitation intensity, storm structure, and weather systems. Available from 150+ radar sites across the US.',
		keywords: ['radar', 'reflectivity', 'precipitation', 'storms', 'rain', 'weather', 'nexrad', 'doppler'],
		availableRegions: Object.keys(NEXRAD_REGIONS),
		availableSites: Object.keys(NEXRAD_SITES),
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/nexrad' },
		useCases: ['View current precipitation', 'Track storms', 'Monitor severe weather', 'Check for rain'],
		exampleQueries: [
			'Show me radar for Chicago',
			'What does the radar look like in Texas?',
			'Is it raining in New York?',
			'Show me the storm over Oklahoma',
		],
	},
	{
		id: 'nexrad-velocity',
		name: 'NEXRAD Base Velocity',
		category: 'radar',
		description:
			'Doppler radar velocity showing wind motion within storms. Essential for detecting rotation, mesocyclones, and tornado signatures.',
		keywords: ['velocity', 'rotation', 'tornado', 'mesocyclone', 'doppler', 'wind', 'storm motion'],
		availableRegions: Object.keys(NEXRAD_REGIONS),
		availableSites: Object.keys(NEXRAD_SITES),
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/nexrad' },
		useCases: ['Detect rotation in storms', 'Identify tornado signatures', 'Analyze storm motion'],
		exampleQueries: [
			'Show me velocity data for the storm',
			'Is there rotation in that storm?',
			'Check for tornado signatures near Oklahoma City',
		],
	},
	{
		id: 'nexrad-composite',
		name: 'National Radar Composite',
		category: 'radar',
		description: 'Nationwide composite radar mosaic showing all precipitation across the continental US in a single view.',
		keywords: ['national', 'composite', 'mosaic', 'conus', 'nationwide', 'overview'],
		availableRegions: ['CONUS'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/nexrad/composite' },
		useCases: ['View national weather overview', 'Track large weather systems', 'See all precipitation at once'],
		exampleQueries: ['Show me national radar', 'What does the radar look like across the country?', 'Show me the composite radar'],
	},
]

const SATELLITE_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'satellite-visible',
		name: 'Visible Satellite Imagery',
		category: 'satellite',
		description:
			'Daytime visible satellite imagery from GOES-East and GOES-West showing cloud cover, storm tops, and weather systems as seen from space.',
		keywords: ['satellite', 'visible', 'clouds', 'goes', 'daytime', 'imagery'],
		availableRegions: ['NAMER', 'CONUS', 'PACUS'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/satellite' },
		useCases: ['View cloud cover', 'Track weather systems', 'See storm development'],
		exampleQueries: [
			'Show me satellite view of the Midwest',
			'What do the clouds look like over Florida?',
			'Show me visible satellite for the US',
		],
	},
	{
		id: 'satellite-infrared',
		name: 'Infrared Satellite Imagery',
		category: 'satellite',
		description:
			'Day and night infrared satellite imagery showing cloud top temperatures. Cold (tall) clouds appear bright, indicating thunderstorms.',
		keywords: ['infrared', 'ir', 'satellite', 'night', 'temperature', 'cloud tops'],
		availableRegions: ['NAMER', 'CONUS', 'PACUS'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/satellite' },
		useCases: ['View clouds at night', 'Identify tall thunderstorms', 'Track tropical systems'],
		exampleQueries: ['Show me infrared satellite', 'What does the satellite look like at night?', 'Show me IR imagery of the hurricane'],
	},
	{
		id: 'satellite-water-vapor',
		name: 'Water Vapor Satellite Imagery',
		category: 'satellite',
		description:
			'Water vapor imagery showing moisture in the mid and upper atmosphere. Useful for tracking jet streams, atmospheric rivers, and dry air intrusions.',
		keywords: ['water vapor', 'moisture', 'jet stream', 'atmospheric', 'humidity'],
		availableRegions: ['NAMER', 'CONUS'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/satellite' },
		useCases: ['Track jet stream', 'View atmospheric moisture', 'Identify dry air'],
		exampleQueries: ['Show me water vapor imagery', 'Where is the jet stream?', 'Show me atmospheric moisture'],
	},
]

const TROPICAL_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'tropical-overview',
		name: 'Active Tropical Systems',
		category: 'tropical',
		description:
			'Interactive map showing all active hurricanes, tropical storms, and tropical depressions with forecast tracks from the National Hurricane Center.',
		keywords: ['hurricane', 'tropical', 'storm', 'cyclone', 'nhc', 'atlantic', 'pacific', 'forecast track'],
		availableRegions: ['NAMER', 'Atlantic', 'Pacific'],
		animatorType: 'map',
		dataSource: { type: 'realtime', fetchFunction: 'fetchTropicalStormData' },
		useCases: ['Track hurricanes', 'View tropical forecasts', 'Monitor storm development'],
		exampleQueries: [
			'Are there any active hurricanes?',
			'Show me tropical storms',
			'What hurricanes are out there?',
			'Track the hurricane',
			'Show me the tropical forecast',
		],
	},
]

const ALERTS_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'alerts-national',
		name: 'National Weather Alerts Map',
		category: 'alerts',
		description:
			'Interactive county-level map showing all active weather warnings, watches, and advisories across the US including tornado warnings, severe thunderstorm warnings, and winter weather alerts.',
		keywords: ['alerts', 'warnings', 'watches', 'advisories', 'severe weather', 'tornado warning', 'hazards'],
		availableRegions: ['CONUS'],
		animatorType: 'map',
		dataSource: { type: 'realtime', fetchFunction: 'fetchCountyAlerts' },
		useCases: ['Check weather alerts', 'View warnings', 'Monitor severe weather', 'See hazards'],
		exampleQueries: [
			'What weather alerts are active?',
			'Show me severe weather warnings',
			'Are there any tornado warnings?',
			'What hazards are in my area?',
			'Show me the alerts map',
		],
	},
]

const SURFACE_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'surface-analysis',
		name: 'Surface Analysis',
		category: 'surface',
		description:
			'Surface weather analysis showing fronts, pressure systems, station plots, and current conditions. Essential for understanding current weather patterns.',
		keywords: ['surface', 'fronts', 'pressure', 'cold front', 'warm front', 'high', 'low', 'analysis'],
		availableRegions: ['CONUS', 'NAMER'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/surface' },
		useCases: ['View frontal positions', 'Track pressure systems', 'Analyze current conditions'],
		exampleQueries: ['Show me surface analysis', 'Where are the fronts?', 'Show me the surface map', 'Where is the cold front?'],
	},
	{
		id: 'surface-station-plots',
		name: 'Surface Station Plots',
		category: 'surface',
		description: 'Current weather observations plotted at station locations showing temperature, dewpoint, wind, pressure, and sky conditions.',
		keywords: ['station plots', 'observations', 'metar', 'temperature', 'wind', 'conditions'],
		availableRegions: ['CONUS', 'NAMER'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/surface' },
		useCases: ['View current observations', 'Check station data', 'See actual weather conditions'],
		exampleQueries: ['Show me station plots', 'What are the current observations?', 'Show me surface observations'],
	},
]

const UPPERAIR_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'upperair-500mb',
		name: '500mb Upper Air Analysis',
		category: 'upperair',
		description:
			'500mb (18,000 ft) upper air analysis showing heights, vorticity, and the jet stream. Key level for tracking weather systems and storm potential.',
		keywords: ['500mb', 'upper air', 'jet stream', 'vorticity', 'heights', 'troughs', 'ridges'],
		availableRegions: ['CONUS', 'NAMER'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/upperair' },
		useCases: ['View jet stream', 'Track upper-level systems', 'Analyze weather patterns'],
		exampleQueries: ['Show me 500mb analysis', 'Where is the jet stream?', 'Show me upper air data', 'What does the 500mb look like?'],
	},
	{
		id: 'upperair-850mb',
		name: '850mb Lower Level Analysis',
		category: 'upperair',
		description:
			'850mb (5,000 ft) analysis showing temperature advection, moisture transport, and low-level jets. Important for severe weather and precipitation forecasting.',
		keywords: ['850mb', 'low level jet', 'moisture', 'warm advection', 'theta-e'],
		availableRegions: ['CONUS', 'NAMER'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/upperair' },
		useCases: ['View moisture transport', 'Track low-level jets', 'Analyze warm advection'],
		exampleQueries: ['Show me 850mb analysis', 'Where is the low level jet?', 'Show me moisture transport'],
	},
]

const FORECAST_MODEL_PRODUCTS: ProductCatalogEntry[] = [
	{
		id: 'forecast-nam',
		name: 'NAM Model Forecast',
		category: 'forecast',
		description:
			'North American Mesoscale model forecast showing temperature, precipitation, severe weather parameters, and more out to 84 hours.',
		keywords: ['nam', 'model', 'forecast', 'prediction', 'temperature', 'precipitation'],
		availableRegions: ['CONUS', 'NAMER'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/forecast/nam' },
		useCases: ['View model forecast', 'Check future weather', 'Plan ahead'],
		exampleQueries: ['Show me the NAM forecast', 'What does the model show?', 'What will the weather be tomorrow?'],
	},
	{
		id: 'forecast-gfs',
		name: 'GFS Global Model',
		category: 'forecast',
		description: 'Global Forecast System model showing worldwide weather predictions out to 16 days. Best for long-range forecasting.',
		keywords: ['gfs', 'global', 'model', 'long range', 'forecast', 'extended'],
		availableRegions: ['WORLD', 'NAMER', 'CONUS'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/forecast/gfs' },
		useCases: ['View long-range forecast', 'Check extended outlook', 'Global weather patterns'],
		exampleQueries: ['Show me the GFS forecast', 'What does the long range forecast show?', 'Show me the extended forecast'],
	},
	{
		id: 'forecast-hrrr',
		name: 'HRRR High-Resolution Model',
		category: 'forecast',
		description:
			'High-Resolution Rapid Refresh model with hourly updates and 3km resolution. Best for short-term severe weather and convection forecasting.',
		keywords: ['hrrr', 'high resolution', 'hourly', 'convection', 'severe', 'storms'],
		availableRegions: ['CONUS'],
		animatorType: 'image',
		dataSource: { type: 'api', baseUrl: '/api/forecast/hrrr' },
		useCases: ['View high-res forecast', 'Track convection', 'Short-term severe weather'],
		exampleQueries: ['Show me the HRRR', 'What does the high-res model show?', 'Show me simulated radar'],
	},
]

// ============================================================================
// REGION AND SITE DEFINITIONS
// ============================================================================

const REGIONS: RegionEntry[] = [
	{
		id: 'CONUS',
		name: 'Continental US',
		description: 'Continental United States',
		keywords: ['conus', 'us', 'united states', 'national', 'continental'],
	},
	{ id: 'NAMER', name: 'North America', description: 'Full North American view', keywords: ['north america', 'namer', 'continent'] },
	{
		id: 'MIDWEST',
		name: 'Midwest',
		description: 'Midwest region including IL, IN, OH, MI, WI, MN, IA, MO',
		keywords: ['midwest', 'great lakes', 'plains'],
	},
	{
		id: 'SOUTHEAST',
		name: 'Southeast',
		description: 'Southeast US including FL, GA, SC, NC, AL, MS, TN',
		keywords: ['southeast', 'south', 'gulf coast'],
	},
	{
		id: 'NORTHEAST',
		name: 'Northeast',
		description: 'Northeast US including NY, PA, NJ, MA, CT',
		keywords: ['northeast', 'new england', 'mid atlantic'],
	},
	{ id: 'SOUTHWEST', name: 'Southwest', description: 'Southwest US including AZ, NM, NV, UT', keywords: ['southwest', 'desert'] },
	{
		id: 'NORTHWEST',
		name: 'Northwest',
		description: 'Pacific Northwest including WA, OR, ID',
		keywords: ['northwest', 'pacific northwest', 'pnw'],
	},
	{
		id: 'GREATPLAINS',
		name: 'Great Plains',
		description: 'Great Plains including TX, OK, KS, NE, SD, ND',
		keywords: ['plains', 'tornado alley', 'central'],
	},
]

// Build sites from NEXRAD_SITES
const SITES: SiteEntry[] = Object.entries(NEXRAD_SITES).map(([id, site]) => ({
	id,
	name: site.name,
	coordinates: site.coordinates as [number, number],
	keywords: [id.toLowerCase(), site.name.toLowerCase()],
}))

// ============================================================================
// CATALOG BUILDER
// ============================================================================

export function buildProductCatalog(): ProductCatalog {
	const allProducts: ProductCatalogEntry[] = [
		...RADAR_PRODUCTS,
		...SATELLITE_PRODUCTS,
		...TROPICAL_PRODUCTS,
		...ALERTS_PRODUCTS,
		...SURFACE_PRODUCTS,
		...UPPERAIR_PRODUCTS,
		...FORECAST_MODEL_PRODUCTS,
	]

	return {
		products: allProducts,
		regions: REGIONS,
		sectors: [], // Will be populated from sector data
		sites: SITES,
		lastUpdated: new Date().toISOString(),
		version: '1.0.0',
	}
}

// Pre-built catalog instance
export const WEATHER_PRODUCT_CATALOG = buildProductCatalog()

// ============================================================================
// CATALOG SEARCH HELPERS
// ============================================================================

export function searchProducts(query: string): ProductCatalogEntry[] {
	const lowerQuery = query.toLowerCase()
	return WEATHER_PRODUCT_CATALOG.products.filter(
		(product) =>
			product.name.toLowerCase().includes(lowerQuery) ||
			product.description.toLowerCase().includes(lowerQuery) ||
			product.keywords.some((k) => k.includes(lowerQuery)) ||
			product.exampleQueries.some((q) => q.toLowerCase().includes(lowerQuery)),
	)
}

export function findProductByCategory(category: string): ProductCatalogEntry[] {
	return WEATHER_PRODUCT_CATALOG.products.filter((p) => p.category === category)
}

export function findSiteByName(name: string): SiteEntry | undefined {
	const lowerName = name.toLowerCase()
	return WEATHER_PRODUCT_CATALOG.sites.find(
		(site) =>
			site.name.toLowerCase().includes(lowerName) || site.id.toLowerCase() === lowerName || site.keywords.some((k) => k.includes(lowerName)),
	)
}

export function findRegionByName(name: string): RegionEntry | undefined {
	const lowerName = name.toLowerCase()
	return WEATHER_PRODUCT_CATALOG.regions.find(
		(region) =>
			region.name.toLowerCase().includes(lowerName) ||
			region.id.toLowerCase() === lowerName ||
			region.keywords.some((k) => k.includes(lowerName)),
	)
}

// Generate context for AI system prompt
export function generateCatalogContext(): string {
	const products = WEATHER_PRODUCT_CATALOG.products
	const categories = [...new Set(products.map((p) => p.category))]

	let context = '## Available Weather Data Products\n\n'

	for (const category of categories) {
		const categoryProducts = products.filter((p) => p.category === category)
		context += `### ${category.charAt(0).toUpperCase() + category.slice(1)}\n`
		for (const product of categoryProducts) {
			context += `- **${product.name}** (${product.id}): ${product.description}\n`
			context += `  Keywords: ${product.keywords.join(', ')}\n`
		}
		context += '\n'
	}

	context += '## Available Regions\n'
	for (const region of WEATHER_PRODUCT_CATALOG.regions) {
		context += `- **${region.name}** (${region.id}): ${region.description}\n`
	}

	context += '\n## Radar Sites\n'
	context += `There are ${WEATHER_PRODUCT_CATALOG.sites.length} NEXRAD radar sites available. Major cities include: `
	const majorSites = ['LOT', 'FWS', 'TLX', 'AMX', 'OKX', 'ATX', 'FTG', 'MPX']
	const siteNames = majorSites.map((id) => {
		const site = WEATHER_PRODUCT_CATALOG.sites.find((s) => s.id === id)
		return site ? `${site.name} (${id})` : id
	})
	context += siteNames.join(', ') + '.\n'

	return context
}
