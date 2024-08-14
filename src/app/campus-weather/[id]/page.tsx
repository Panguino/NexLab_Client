import { gql } from '@apollo/client'
import { getClient } from '@/apollo/apollo-client'

const Page = async ({ params }) => {
	const response = await getClient().query({
		query: gql`
            query {
                campus(id: ${params.id}) {
                    data {
                        id
                        attributes {							
                            Name
                            Latitude
                            Longitude
                            Logo {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `
	})

	// Return from the DB
	const { Name, Latitude, Longitude } = response.data.campus.data.attributes

	// Construct the URL for the weather API request
	const api_point_call = `https://api.weather.gov/points/${Latitude},${Longitude}`

	// Fetch the weather data
	const api_point_res = await fetch(api_point_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json'
		}
	})

	if (!api_point_res.ok) {
		throw new Error(`HTTP error! status: ${api_point_res.status}`)
	}

	const api_point_data = await api_point_res.json()

	// console.log({ api_point_data })

	// Our Office products
	// adding that leading K is only a problem if somehow we expand this service outside the CONUS
	const cod_cwa = 'https://weather.cod.edu/textserv/office/K' + api_point_data.cwa

	// Calling all stations...
	const api_station_call = `${api_point_data.observationStations}`

	// Fetch the weather data
	const api_station_res = await fetch(api_station_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json'
		}
	})

	if (!api_station_res.ok) {
		throw new Error(`HTTP error! status: ${api_station_res.status}`)
	}

	const api_station_data = await api_station_res.json()

	// console.log({ api_station_data })

	// Get Current Conditions from Nearest Observation Station, [0] = Nearest, limit=1 = Newest
	const api_obs_call = `${api_station_data.observationStations[0]}/observations?limit=1`

	// Fetch Current Conditions
	const api_obs_res = await fetch(api_obs_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json'
		}
	})

	if (!api_obs_res.ok) {
		throw new Error(`HTTP error! status: ${api_obs_res.status}`)
	}

	const api_obs_data = await api_obs_res.json()

	console.log('OBSERVATION', api_obs_data['@graph'][0], 'clouds', api_obs_data['@graph'][0].cloudLayers)

	// Get 7 day forecast data
	const api_fcst_call = `${api_point_data.forecast}`

	// fetch fcst
	const api_fcst_res = await fetch(api_fcst_call, {
		headers: {
			'User-Agent': 'College of DuPage - Meteorology: Campus Weather (wxstaff@weather.cod.edu)',
			Accept: 'application/ld+json'
		}
	})

	if (!api_fcst_res.ok) {
		throw new Error(`HTTP error! status: ${api_fcst_res.status}`)
	}

	const api_fcst_data = await api_fcst_res.json()

	// console.log('FORECAST', api_fcst_data.periods)

	return (
		<>
			<p>Campus {params.id}</p>
			<p>Name: {Name}</p>
			<p>Latitude: {Latitude}</p>
			<p>Longitude: {Longitude}</p>
			<p>Obs Data From: {api_obs_data['@graph'][0].rawMessage}</p>
			<p>Temperature: {api_obs_data['@graph'][0].temperature.value}&deg;C</p>
			<p>Dewpoint: {api_obs_data['@graph'][0].dewpoint.value}&deg;C</p>
			<p>CWA Products: {cod_cwa}</p>
			<p>Worded Forecast: {api_point_data.forecast}</p>
			<p>Potential Meteogram Forecast (gridded): {api_point_data.forecastGridData}</p>
			<h2>Forecast</h2>
			{api_fcst_data.periods.map((period, index) => (
				<div key={index}>
					<h3>{period.name}</h3>
					<p>{period.detailedForecast}</p>
				</div>
			))}
		</>
	)
}

export default Page
