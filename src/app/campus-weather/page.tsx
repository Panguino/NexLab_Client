import { getClient } from '@/apollo/apollo-client'
import { Button } from '@/components/elements/Button/Button'
import { getAPIdataFromLocation, getAPIforecast, getAPIweatherConditions, getCODweatherConditions } from '@/util/getCampusWeatherData'
import { gql } from '@apollo/client'

const Page = async () => {
	const response = await getClient().query({
		query: gql`
			query {
				campuses {
					data {
						id
						attributes {
							Name
							Latitude
							Longitude
							Logo {
								data {
									id
									attributes {
										url
									}
								}
							}
							uniqueWeatherConditions
						}
					}
				}
			}
		`,
	})
	// console.log(response.data.campuses.data)
	const campuses = response.data.campuses.data
	let campusWeather = []

	const fetchSources = async () => {
		const source_promises = campuses.map(async (campus) => {
			const campusAPIdata = await getAPIdataFromLocation(campus.attributes.Latitude, campus.attributes.Longitude)
			let current_conditions = null
			if (campus.attributes.uniqueWeatherConditions === true) {
				// cod
				current_conditions = await getCODweatherConditions()
			} else {
				// other
				current_conditions = await getAPIweatherConditions(campusAPIdata)
			}
			const forecastData = await getAPIforecast(campusAPIdata)
			return { id: campus.id, conditions: current_conditions, forecast: forecastData }
		})

		campusWeather = await Promise.all(source_promises)
		return campusWeather
	}

	campusWeather = await fetchSources()
	console.log(campusWeather)

	return (
		<div>
			{campuses.map((campus) => (
				<div key={campus.id}>
					<h2>
						<img src={campus.attributes.Logo.data.attributes.url} alt={campus.attributes.Name} />
						{campus.attributes.Name}
					</h2>
					<p>Lat: {campus.attributes.Latitude}</p>
					<p>Lon: {campus.attributes.Longitude}</p>
					<Button label="View Weather" link={`/campus-weather/${campus.id}`} target="_self" />
				</div>
			))}
		</div>
	)
}

export default Page
