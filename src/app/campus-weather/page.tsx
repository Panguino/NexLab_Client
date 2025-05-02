import { getClient } from '@/apollo/apollo-client'
import { CampusWidget } from '@/components/blocks/CampusWidget/CampusWidget'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import WidgetWrapper from '@/components/blocks/WidgetWrapper/WidgetWrapper'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import SideInfo from '@/components/layout/SideInfo/SideInfo'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
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

	return (
		<>
			<SidebarWrapper>
				<SideInfo>
					<h2>Campus Weather</h2>
					<p>
						Campus Weather is a free service provided by the College of DuPage Meteorology Department to serve the local schools within
						Community College District 502. The service provides a personalized website containing weather information for each school.
						The current suite of features includes the following:
					</p>
					<ul>
						<li>Full set of current weather conditions </li>
						<li>7-day forecast </li>
						<li>
							Helpful links for information on school closings, weather safety and preparedness, and even your own school or districts
							written protocols for handling extreme weather.
						</li>
					</ul>
					<h2>Weather Widget</h2>
					<p>
						Demonstrated here and coming in a small variety of sizes and layouts, we also provide a widget which can be easily embedded in
						your school's website providing some current weather conditions and an abbreviated forecast.
					</p>
				</SideInfo>
				<ScrollArea>
					<WidgetWrapper>
						{campuses.map((campus) => {
							const weatherData = campusWeather.find((weather) => weather.id === campus.documentId)
							return <CampusWidget key={campus.documentId} campusDetails={campus} weatherData={weatherData} />
						})}
					</WidgetWrapper>
					<Footer />
				</ScrollArea>
			</SidebarWrapper>
		</>
	)
}

export default Page
