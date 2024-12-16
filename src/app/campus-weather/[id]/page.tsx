import { getCampusById } from '@/apollo/strapi/getCampusById'
import { NextPageProps } from '@/app/types'
import { CampusOverview } from '@/components/blocks/CampusWeatherDetail/CampusOverview/CampusOverview'
import { CampusWeatherDetail } from '@/components/blocks/CampusWeatherDetail/CampusWeatherDetail'
import { ForecastTiles } from '@/components/blocks/CampusWeatherDetail/ForecastTiles/ForecastTiles'
import { TextForecastPanel } from '@/components/blocks/CampusWeatherDetail/TextForecastPanel/TextForecastPanel'
import { Footer } from '@/components/blocks/PageBlocks/Footer/Footer'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getNexradData } from '@/util/dataCall'
import {
	getAPIdataFromLocation,
	getAPIforecast,
	getAPIweatherConditions,
	getCODweatherConditions,
	getForcastTileDataFromForecastData,
	getTextForecastPanelFromForecastData,
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

	const tileData = await getForcastTileDataFromForecastData(apiForcastData.periods)
	const textForecastPanelData = await getTextForecastPanelFromForecastData(apiForcastData.periods)
	const radarData = await getNexradData('LOT', 'N0B', '24')

	return (
		<ScrollArea removeDisplayTable>
			<div style={{ padding: 30 }}>
				<CampusWeatherDetail>
					<CampusOverview campusImage={campusData.banner} currentConditions={currentConditions} radarImageSequence={radarData} />
					<ForecastTiles tileData={tileData} />
					<TextForecastPanel forecastData={textForecastPanelData} />
				</CampusWeatherDetail>
			</div>
			<Footer />
		</ScrollArea>
	)
}

export default Page

export const dynamic = 'force-dynamic'
