import { getClient } from '@/apollo/apollo-client'
import { NextPageProps } from '@/app/types'
import { CampusWeatherDetail } from '@/components/blocks/CampusWeatherDetail/CampusWeatherDetail'
import ScrollArea from '@/components/layout/ScrollArea/ScrollArea'
import { getAPIdataFromLocation, getAPIforecast, getAPIweatherConditions, getCODweatherConditions } from '@/util/getCampusWeatherData'
import { gql } from '@apollo/client'

const Page = async ({ params }: NextPageProps) => {
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
							uniqueWeatherConditions
                        }
                    }
                }
            }
        `,
	})

	// Return from the DB
	const { Latitude, Longitude } = response.data.campus.data.attributes

	// Collect data from NWS API based on campus location
	const api_point_data = await getAPIdataFromLocation(Latitude, Longitude)
	// console.log(api_point_data)

	// Determine where current conditions are coming from
	let current_conditions = null
	if (response.data.campus.data.attributes.uniqueWeatherConditions) {
		current_conditions = await getCODweatherConditions()
	} else {
		// Our Office products
		// adding that leading K is only a problem if somehow we expand this service outside the CONUS
		// const cod_cwa = 'https://weather.cod.edu/textserv/office/K' + api_point_data.cwa

		current_conditions = await getAPIweatherConditions(api_point_data)
	}

	// Collect 7 day forecast from NWS API
	const api_fcst_data = await getAPIforecast(api_point_data)

	return (
		<ScrollArea>
			<CampusWeatherDetail
				campusDetails={{ ...response.data.campus.data.attributes }}
				currentWeatherData={current_conditions}
				forecastData={api_fcst_data.periods}
			/>
		</ScrollArea>
	)
}

export default Page

export const dynamic = 'force-dynamic'
