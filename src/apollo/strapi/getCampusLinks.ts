'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusLinks = async () => {
	const campusLinkResponse = await getClient().query({
		query: gql`
			query getCampusLinks {
				campusWeatherLinks {
					data {
						id
						attributes {
							Name
						}
					}
				}
			}
		`,
	})
	return campusLinkResponse.data.campusWeatherLinks.data
}
