'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusById = async (id: string) => {
	const campusResponse = await getClient().query({
		query: gql`
			query {
                campus(id: ${id}) {
                    data {
                        id
                        attributes {							
                            Name
                            Latitude
                            Longitude
                            banner {
                                data {
                                    id
                                    attributes {
                                        url
                                    }
                                }
                            }
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
	const { Name, Latitude, Longitude, banner, Logo, uniqueWeatherConditions } = campusResponse.data.campus.data.attributes
	return {
		name: Name,
		latitude: Latitude,
		longitude: Longitude,
		banner: banner?.data?.attributes?.url,
		logo: Logo?.data?.attributes?.url,
		uniqueWeatherConditions: uniqueWeatherConditions,
	}
}
