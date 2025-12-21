/**
 * OpenAI Function Definitions for Weather AI Agent
 *
 * These function definitions tell OpenAI what functions the AI can call
 * to load weather data and interact with the visualization system.
 */

import type { ChatCompletionTool } from 'openai/resources/chat/completions'

export const AI_AGENT_FUNCTIONS: ChatCompletionTool[] = [
	{
		type: 'function',
		function: {
			name: 'load_weather_product',
			description:
				'Load a weather data product into the animator/visualizer. ALWAYS use this function when the user wants to see data. For radar, common site mappings: Chicago=LOT, Dallas=FWS, Miami=AMX, NYC=OKX, LA=VTX, Houston=HGX, Denver=FTG, Atlanta=FFC, Seattle=ATX, Boston=BOX.',
			parameters: {
				type: 'object',
				properties: {
					productId: {
						type: 'string',
						description:
							'The product ID to load. Options: nexrad-reflectivity, nexrad-velocity, nexrad-composite, satellite-visible, satellite-infrared, satellite-water-vapor, tropical-overview, alerts-national, surface-analysis, surface-station-plots, upperair-500mb, upperair-850mb, forecast-nam, forecast-gfs, forecast-hrrr',
						enum: [
							'nexrad-reflectivity',
							'nexrad-velocity',
							'nexrad-composite',
							'satellite-visible',
							'satellite-infrared',
							'satellite-water-vapor',
							'tropical-overview',
							'alerts-national',
							'surface-analysis',
							'surface-station-plots',
							'upperair-500mb',
							'upperair-850mb',
							'forecast-nam',
							'forecast-gfs',
							'forecast-hrrr',
						],
					},
					region: {
						type: 'string',
						description:
							'The satellite/radar region to display. Use state names to pick the right region. California/Nevada/Arizona/Utah=southwest, Texas/Oklahoma/Arkansas/Louisiana=southcentral, Florida/Georgia/Alabama/Carolina=southeast, Washington/Oregon/Idaho/Montana=northwest, New York/Pennsylvania/New Jersey/New England=northeast, Illinois/Ohio/Michigan/Indiana/Wisconsin/Iowa=midwest, Kansas/Nebraska/Dakotas=northcentral, National/Full US=conus',
						enum: [
							'conus',
							'southwest',
							'southeast',
							'northwest',
							'northeast',
							'midwest',
							'central',
							'southcentral',
							'northcentral',
							'gulf',
							'eastcoast',
						],
					},
					site: {
						type: 'string',
						description:
							'For radar products, the 3-letter NEXRAD site ID (e.g., LOT for Chicago, FWS for Dallas, TLX for Oklahoma City, AMX for Miami, OKX for New York)',
					},
				},
				required: ['productId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'search_products',
			description: 'Search for available weather products by keyword or description. Use this when unsure which product to load.',
			parameters: {
				type: 'object',
				properties: {
					query: {
						type: 'string',
						description: 'Search query to find matching products (e.g., "tornado", "hurricane", "temperature")',
					},
				},
				required: ['query'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'get_product_info',
			description: 'Get detailed information about a specific weather product including what it shows and when to use it.',
			parameters: {
				type: 'object',
				properties: {
					productId: {
						type: 'string',
						description: 'The product ID to get information about',
					},
				},
				required: ['productId'],
			},
		},
	},
	{
		type: 'function',
		function: {
			name: 'find_radar_site',
			description: 'Find the nearest NEXRAD radar site for a given city or location.',
			parameters: {
				type: 'object',
				properties: {
					location: {
						type: 'string',
						description: 'City name or location to find radar for (e.g., "Chicago", "Dallas", "Miami")',
					},
				},
				required: ['location'],
			},
		},
	},
]

// City to radar site mapping for common locations
export const CITY_TO_RADAR_SITE: Record<string, string> = {
	chicago: 'LOT',
	dallas: 'FWS',
	'fort worth': 'FWS',
	'oklahoma city': 'TLX',
	norman: 'TLX',
	miami: 'AMX',
	'new york': 'OKX',
	nyc: 'OKX',
	'los angeles': 'VTX',
	la: 'VTX',
	houston: 'HGX',
	phoenix: 'IWA',
	denver: 'FTG',
	seattle: 'ATX',
	atlanta: 'FFC',
	boston: 'BOX',
	minneapolis: 'MPX',
	'st louis': 'LSX',
	'kansas city': 'EAX',
	detroit: 'DTX',
	tampa: 'TBW',
	orlando: 'MLB',
	'new orleans': 'LIX',
	'san francisco': 'MTR',
	portland: 'RTX',
	'salt lake city': 'MTX',
	'las vegas': 'ESX',
	albuquerque: 'ABX',
	omaha: 'OAX',
	tulsa: 'INX',
	wichita: 'ICT',
	'des moines': 'DMX',
	memphis: 'NQA',
	nashville: 'OHX',
	charlotte: 'GSO',
	raleigh: 'RAX',
	jacksonville: 'JAX',
	birmingham: 'BMX',
	indianapolis: 'IND',
	columbus: 'ILN',
	cleveland: 'CLE',
	pittsburgh: 'PBZ',
	philadelphia: 'DIX',
	'washington dc': 'LWX',
	baltimore: 'LWX',
}

export function findRadarSiteForLocation(location: string): string | null {
	const lowerLocation = location.toLowerCase().trim()
	return CITY_TO_RADAR_SITE[lowerLocation] || null
}
