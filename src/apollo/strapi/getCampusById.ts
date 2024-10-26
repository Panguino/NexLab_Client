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
	return campusResponse.data.campus.data.attributes
}
