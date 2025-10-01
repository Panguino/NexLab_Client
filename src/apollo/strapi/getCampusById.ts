'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusById = async (id: string) => {
	console.log('getCampusById', id)
	const campusResponse = await getClient().query({
		query: gql`
			query {
                campus(documentId: "${id}") {
                    Name
                    Longitude
                    Latitude
                    Logo {
                        url
                    }
                    banner {
                        documentId
                        url
                    }
                    uniqueWeatherConditions
                }
            }
		`,
	})
	const { Name, Latitude, Longitude, banner, Logo, uniqueWeatherConditions } = campusResponse.data.campus
	return {
		name: Name,
		latitude: Latitude,
		longitude: Longitude,
		banner: banner?.url,
		logo: Logo?.url,
		uniqueWeatherConditions: uniqueWeatherConditions,
	}
}
