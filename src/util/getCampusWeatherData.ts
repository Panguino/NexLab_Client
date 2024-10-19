import { celsiusToFahrenheit, getCompassDirection, kphToMph } from '@/util/unitConversion'

export const getAPIdataFromLocation = async (Latitude, Longitude) => {
	// Construct the URL for the weather API request
	const api_point_call = `https://api.weather.gov/points/${Latitude},${Longitude}`

	// Fetch the weather data
	const api_point_res = await fetch(api_point_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json',
		},
	})

	if (!api_point_res.ok) {
		throw new Error(`HTTP error! status: ${api_point_res.status}`)
	}

	const api_point_data = await api_point_res.json()
	return api_point_data
}

export const getCODweatherConditions = async () => {
	// Collect the COD WxBug Data
	const cod_wxbug_call = 'https://climate.cod.edu/data/cwx/current/KCDP-current-conditions.json'

	// Fetch the weather data
	const cod_wxbug_res = await fetch(cod_wxbug_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json',
		},
	})

	if (!cod_wxbug_res.ok) {
		throw new Error(`HTTP error! status: ${cod_wxbug_res.status}`)
	}

	const cod_wxbug_data = await cod_wxbug_res.json()

	// console.log(cod_wxbug_data)
	const dataSource = 'cod'
	const temperature = cod_wxbug_data.temp
	const dewpoint = cod_wxbug_data.dewp
	const apparentTemperature = cod_wxbug_data.atemp
	const relativeHumidity = cod_wxbug_data.rhum
	const windSpeed = cod_wxbug_data.wind.mag
	const windDirection = cod_wxbug_data.wind.dir.abbr
	const textDescription = cod_wxbug_data.wx.wxtitle
	const icon = cod_wxbug_data.wx.symbol
	const dayNight = cod_wxbug_data.dayNight
	const sky = cod_wxbug_data.sky < 8 ? 'bkn' : 'ovc'

	const current_conditions = {
		dataSource,
		dayNight,
		temperature,
		dewpoint,
		apparentTemperature,
		relativeHumidity,
		windSpeed,
		windDirection,
		sky,
		textDescription,
		icon,
	}
	return current_conditions
}

export const getAPIweatherConditions = async (api_point_data) => {
	// Calling all stations...
	const api_station_call = `${api_point_data.observationStations}`

	// Fetch the weather data
	const api_station_res = await fetch(api_station_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json',
		},
	})

	if (!api_station_res.ok) {
		throw new Error(`HTTP error! status: ${api_station_res.status}`)
	}

	const api_station_data = await api_station_res.json()

	// console.log(api_station_data.observationStations)

	// observation station selection prep
	// obseravtionStations is an array ordered by distance from the point
	// iterate through station list, grab first not on denylist
	let stationKey = 0
	const denyList = ['KLOT'] // list of stations to avoid, KLOT added because it regularly doesn't have 'icon'
	for (const stationURL of api_station_data.observationStations) {
		const station = stationURL.replace('https://api.weather.gov/stations/', '')
		if (!denyList.includes(station)) {
			stationKey = api_station_data.observationStations.indexOf(stationURL)
			break // exit loop, nearest station allowed acquired
		}
	}

	// Get Current Conditions from Nearest Observation Station, [0] = Nearest, limit=1 = Newest
	const api_obs_call = `${api_station_data.observationStations[stationKey]}/observations?limit=1`

	// Fetch Current Conditions
	const api_obs_res = await fetch(api_obs_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json',
		},
	})

	if (!api_obs_res.ok) {
		throw new Error(`HTTP error! status: ${api_obs_res.status}`)
	}

	const api_obs_data = await api_obs_res.json()

	// console.log(api_obs_data['@graph'][0])

	let { temperature } = api_obs_data['@graph'][0]
	const { windChill, heatIndex } = api_obs_data['@graph'][0]

	let apparentTemperature
	if (windChill.value !== null) {
		apparentTemperature = windChill.value
	} else if (heatIndex.value !== null) {
		apparentTemperature = heatIndex.value
	} else {
		apparentTemperature = temperature.value
	}

	const dataSource = 'api'
	temperature = celsiusToFahrenheit(api_obs_data['@graph'][0].temperature.value)
	const dewpoint = celsiusToFahrenheit(api_obs_data['@graph'][0].dewpoint.value)
	apparentTemperature = celsiusToFahrenheit(apparentTemperature)
	const relativeHumidity = api_obs_data['@graph'][0].relativeHumidity.value.toFixed(0)
	const windSpeed = kphToMph(api_obs_data['@graph'][0].windSpeed.value)
	const windDirection = getCompassDirection(api_obs_data['@graph'][0].windDirection.value)
	const textDescription = api_obs_data['@graph'][0].textDescription
	const icon = api_obs_data['@graph'][0].icon
	// const dayNight = icon.includes('day') ? 'day' : 'night'
	const dayNight = null // this isn't needed for api calls, just need var set to null
	let sky = api_obs_data['@graph'][0].cloudLayers.amount

	switch (sky) {
		case 'CLR':
		case 'FEW':
		case 'SCT':
		case 'BKN':
			sky = 'bkn' // all treated as 'non-overcast'
			break
		case 'OVC':
		case 'VV':
			sky = 'ovc' // all treated as overcast
			break
		default:
			sky = 'ovc' // totally fine to catch any anomalies this way
			break
	}
	const current_conditions = {
		dataSource,
		dayNight,
		temperature,
		dewpoint,
		apparentTemperature,
		relativeHumidity,
		windSpeed,
		windDirection,
		sky,
		textDescription,
		icon,
	}
	return current_conditions
}

export const getAPIforecast = async (api_point_data) => {
	// Get 7 day forecast data
	const api_fcst_call = `${api_point_data.forecast}`
	console.log(api_fcst_call)

	// fetch fcst
	const api_fcst_res = await fetch(api_fcst_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json',
		},
	})

	if (!api_fcst_res.ok) {
		throw new Error(`HTTP error! status: ${api_fcst_res.status}`)
	}

	const api_fcst_data = await api_fcst_res.json()

	return api_fcst_data
}
