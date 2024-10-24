import { getClient } from '@/apollo/apollo-client'
import { CampusWidget } from '@/components/blocks/CampusWidget/CampusWidget'
import WidgetWrapper from '@/components/blocks/WidgetWrapper/WidgetWrapper'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import SideInfo from '@/components/layout/SideInfo/SideInfo'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
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
							const weatherData = campusWeather.find((weather) => weather.id === campus.id)
							return <CampusWidget campusDetails={campus} weatherData={weatherData} />
						})}
					</WidgetWrapper>
				</ScrollArea>
			</SidebarWrapper>
		</>
	)
}

export default Page
