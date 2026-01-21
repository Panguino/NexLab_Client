import {
	faAnchor,
	faBolt,
	faBuilding,
	faCalendarDays,
	faChartLine,
	faFileLines,
	faFire,
	faHurricane,
	faSatellite,
	faSnowflake,
	faTemperatureHalf,
	faTriangleExclamation,
	faWater,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

export interface TextSection {
	id: string
	name: string
	description: string
	icon: IconDefinition
	linkUrl: string
}

const basepath = '/weather-data/text-hazards-outlooks'

export const TEXT_SECTIONS: TextSection[] = [
	{
		id: 'hazards',
		name: 'Active Hazards',
		description: `
			Real-time watches, warnings, and advisories from the National Weather Service.
			Interactive map and table views showing current hazards by type and severity across all US regions.
		`,
		icon: faTriangleExclamation,
		linkUrl: `${basepath}/active-weather-hazards`,
	},
	{
		id: 'wfo',
		name: 'NWS Forecast Offices',
		description: `
			Access text products from all 122 NWS Weather Forecast Offices.
			Search by WFO identifier to view local forecasts, discussions, hazardous weather outlooks, and specialized products.
		`,
		icon: faBuilding,
		linkUrl: `${basepath}/nws-wfo-national-weather-service-forecast-offices`,
	},
	{
		id: 'convective',
		name: 'Convective Weather',
		description: `
			Storm Prediction Center outlooks, watches, and mesoscale discussions.
			Convective outlooks from Day 1 through Day 8, severe thunderstorm and tornado watches, and real-time mesoscale analysis.
		`,
		icon: faBolt,
		linkUrl: `${basepath}/spc-convective-weather`,
	},
	{
		id: 'tropical',
		name: 'Tropical Weather',
		description: `
			National Hurricane Center advisories, forecasts, and discussions.
			Track active tropical systems with public advisories, forecast discussions, wind probabilities, and storm surge watches.
		`,
		icon: faHurricane,
		linkUrl: `${basepath}/nhc-tropical-hurricane-weather/overview/latest`,
	},
	{
		id: 'winter',
		name: 'Winter Weather',
		description: `
			Weather Prediction Center winter storm outlooks and discussions.
			Quantitative precipitation forecasts, heavy snow and ice discussions, and medium-range winter weather guidance.
		`,
		icon: faSnowflake,
		linkUrl: `${basepath}/wpc-winter-weather`,
	},
	{
		id: 'forecast',
		name: 'Forecast Products',
		description: `
			Forecast discussions for the US, Alaska, Hawaii, and South America, including short, extended, and 6-14 day outlooks.
			Also features WPC surface front forecasts for multiple time intervals.
		`,
		icon: faCalendarDays,
		linkUrl: `${basepath}/forecast`,
	},
	{
		id: 'analysis',
		name: 'Analysis Products',
		description: `
			Current weather observations and summaries.
			Selected city weather summaries, temperature and weather tables for US and international regions,
			regional weather roundups by state and station, and MRMS radar-based precipitation estimates.
		`,
		icon: faTemperatureHalf,
		linkUrl: `${basepath}/analysis`,
	},
	{
		id: 'climate',
		name: 'Climatology',
		description: `
			Climate Prediction Center outlooks and discussions.
			Temperature and precipitation outlooks, drought monitoring, ENSO updates, and seasonal climate forecasts.
		`,
		icon: faChartLine,
		linkUrl: `${basepath}/cpc-climate`,
	},
	{
		id: 'hydrological',
		name: 'Hydrological Products',
		description: `
			River Forecast Center products and hydrological guidance.
			River forecasts, flood warnings, water supply outlooks, and hydrological analysis from regional centers.
		`,
		icon: faWater,
		linkUrl: `${basepath}/nws-rfc-hydrological`,
	},
	{
		id: 'fire',
		name: 'Fire & Drought',
		description: `
			Fire weather forecasts and drought monitoring products.
			Red flag warnings, fire weather outlooks, drought severity classifications, and wildfire risk assessments.
		`,
		icon: faFire,
		linkUrl: `${basepath}/fire-drought`,
	},
	{
		id: 'marine',
		name: 'Marine Weather',
		description: `
			Ocean Prediction Center and coastal marine forecasts.
			Offshore and high seas forecasts, marine warnings, tropical cyclone marine products, and coastal hazard guidance.
		`,
		icon: faAnchor,
		linkUrl: `${basepath}/marine-opc-nhc/hazards`,
	},
	{
		id: 'space',
		name: 'Space Weather',
		description: `
			Space Weather Prediction Center alerts and forecasts.
			Geomagnetic storm watches, solar flare activity, aurora forecasts, and space weather impacts on technology.
		`,
		icon: faSatellite,
		linkUrl: `${basepath}/swpc-space-weather/KWNP/NWXX04_ADVOUT/latest`,
	},
	{
		id: 'admin',
		name: 'Administrative',
		description: `
			NWS administrative and operational products.
			Service change notices, public information statements, and administrative messages from weather service headquarters.
		`,
		icon: faFileLines,
		linkUrl: `${basepath}/admin-products/KWBC/NOUS41_PNSWSH/latest`,
	},
]
