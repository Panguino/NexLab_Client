import { getClient } from '@/apollo/apollo-client'
import { CampusWeatherPage } from '@/components/blocks/CampusWeatherPage/CampusWeatherPage'
import { COLLEGE_OF_DUPAGE_ID } from '@/data/campusweather/schools'
import {
	getAPIdataFromLocation,
	getAPIforecast,
	getAPIweatherConditions,
	getCODweatherConditions,
	getForcastTileDataFromForecastData,
} from '@/util/getCampusWeatherData'
import { gql } from '@apollo/client'

const Page = async () => {
	const response = await getClient().query({
		query: gql`
			query {
				campuses {
					documentId
					Name
					Longitude
					Latitude
					Logo {
						url
					}
					banner {
						url
					}
					uniqueWeatherConditions
				}
			}
		`,
	})
	const campuses = response.data.campuses
	let campusWeather = []

	const fetchSources = async () => {
		const source_promises = campuses.map(async ({ Latitude, Longitude, uniqueWeatherConditions, documentId: id }) => {
			const campusAPIdata = await getAPIdataFromLocation(Latitude, Longitude)
			let current_conditions = null
			if (uniqueWeatherConditions === true) {
				// cod
				current_conditions = await getCODweatherConditions()
			} else {
				// other
				current_conditions = await getAPIweatherConditions(campusAPIdata)
			}
			const forecastData = await getAPIforecast(campusAPIdata)
			const forecastTileData = getForcastTileDataFromForecastData(forecastData.periods, 'small')
			const widgetConditions = {
				temp: current_conditions.temperature,
				feels: current_conditions.feelsLikeTemperature,
				humidity: current_conditions.relativeHumidity,
				icon: current_conditions.icon,
			}
			return { id: id, conditions: widgetConditions, forecast: forecastTileData.slice(0, 2) }
		})

		campusWeather = await Promise.all(source_promises)
		return campusWeather
	}

	campusWeather = await fetchSources()

	// Get COD campus and weather data for the showcase
	const codCampus = campuses.find((campus) => campus.documentId === COLLEGE_OF_DUPAGE_ID)
	const codWeatherData = campusWeather.find((weather) => weather.id === COLLEGE_OF_DUPAGE_ID)

	return (
		<CampusWeatherPage
			codCampusBannerUrl={codCampus.banner.url}
			codCampusDetails={codCampus}
			codWeatherData={codWeatherData}
			allCampuses={campuses}
			allWeatherData={campusWeather}
		/>
	)
}

export default Page
