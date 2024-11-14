import { getCampusById } from '@/apollo/strapi/getCampusById'
import { NextPageProps } from '@/app/types'
import { CampusWeatherDetail } from '@/components/blocks/CampusWeatherDetail/CampusWeatherDetail'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import {
	getAPIdataFromLocation,
	getAPIforecast,
	getAPIweatherConditions,
	getCODweatherConditions,
	getForcastTileDataFromForecastData,
} from '@/util/getCampusWeatherData'

const Page = async ({ params }: NextPageProps) => {
	const campusData = await getCampusById(params.id)

	// Return from the DB
	const { Latitude, Longitude } = campusData

	// Collect data from NWS API based on campus location
	const api_point_data = await getAPIdataFromLocation(Latitude, Longitude)

	// Determine where current conditions are coming from
	let current_conditions = null
	if (campusData.uniqueWeatherConditions) {
		current_conditions = await getCODweatherConditions()
	} else {
		// Our Office products
		// adding that leading K is only a problem if somehow we expand this service outside the CONUS
		// const cod_cwa = 'https://weather.cod.edu/textserv/office/K' + api_point_data.cwa

		current_conditions = await getAPIweatherConditions(api_point_data)
	}

	// Collect 7 day forecast from NWS API
	const api_fcst_data = await getAPIforecast(api_point_data)

	// console.log('LOGGING IN CAMPUS PAGE')
	// console.log('api_fcst_data', api_fcst_data)
	// console.log('current_conditions', current_conditions)
	// console.log('campusData', campusData)

	const tileData = await getForcastTileDataFromForecastData(api_fcst_data.periods)

	return (
		<ScrollArea>
			<CampusWeatherDetail
				campusDetails={{ ...campusData }}
				tileData={tileData}
				currentWeatherData={current_conditions}
				forecastData={api_fcst_data.periods}
			/>
		</ScrollArea>
	)
}

export default Page

export const dynamic = 'force-dynamic'
