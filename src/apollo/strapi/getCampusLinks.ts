'use server'
import { getClient } from '@/apollo/apollo-client'
import { gql } from '@apollo/client'

export const getCampusLinks = async () => {
	const campusLinksResponse = await getClient().query({
		query: gql`
			query {
				campusweatherLink {
					data {
						attributes {
							LinkGroup {
								id
								Heading
								Links {
									id
									text
									url
									target
								}
							}
						}
					}
				}
			}
		`,
	})
	return campusLinksResponse.data.campusweatherLink.data.attributes.LinkGroup
}
