import { getCampusById } from '@/apollo/strapi/getCampusById'
import { NextPageProps } from '@/app/types'
import { CampusOverview } from '@/components/blocks/CampusWeatherDetail/CampusOverview/CampusOverview'
import { CampusWeatherDetail } from '@/components/blocks/CampusWeatherDetail/CampusWeatherDetail'
import { ForecastTiles } from '@/components/blocks/CampusWeatherDetail/ForecastTiles/ForecastTiles'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { nexradData } from '@/util/dataCall'
import {
	getAPIdataFromLocation,
	getAPIforecast,
	getAPIweatherConditions,
	getCODweatherConditions,
	getForcastTileDataFromForecastData,
} from '@/util/getCampusWeatherData'

const Page = async ({ params }: NextPageProps) => {
	const campusData = await getCampusById(params.id)
	const { latitude, longitude } = campusData

	// Collect data from NWS API based on campus location
	const apiPointData = await getAPIdataFromLocation(latitude, longitude)

	// Determine where current conditions are coming from
	let currentConditions = null
	if (campusData.uniqueWeatherConditions) {
		currentConditions = await getCODweatherConditions()
	} else {
		// Our Office products
		// adding that leading K is only a problem if somehow we expand this service outside the CONUS
		// const cod_cwa = 'https://weather.cod.edu/textserv/office/K' + api_point_data.cwa

		currentConditions = await getAPIweatherConditions(apiPointData)
	}
	currentConditions = { ...currentConditions, logo: campusData.logo }

	// Collect 7 day forecast from NWS API
	const apiForcastData = await getAPIforecast(apiPointData)

	// console.log('LOGGING IN CAMPUS PAGE')
	// console.log('api_fcst_data', api_fcst_data)
	// console.log('current_conditions', current_conditions)
	// console.log('campusData', campusData)

	const tileData = await getForcastTileDataFromForecastData(apiForcastData.periods)

	const radarData = await nexradData('LOT', 'N0B', '24')
	console.log(tileData)

	return (
		<ScrollArea>
			<CampusWeatherDetail>
				<CampusOverview campusImage={campusData.banner} currentConditions={currentConditions} radarImageSequence={radarData} />
				<ForecastTiles tileData={tileData} />
				{/*
				<TextForecastPanel forecastData={api_fcst_data.periods} /> */}
			</CampusWeatherDetail>
			<Footer />
		</ScrollArea>
	)
}

export default Page

export const dynamic = 'force-dynamic'
